import { useTranslation } from 'react-i18next'
import PrimaryButton from '@components/PrimaryButton'
import { useMutation } from '@tanstack/react-query'
import { userRegister } from '@api/users'
import { Formik, Form, Field } from 'formik'
import CustomField from '@components/CustomField'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { MdOutlineKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import FormikSelect from '../../shared/components/FormikSelect'

const genderOptions = [
  { value: 'male', label: 'male' },
  { value: 'female', label: 'female' }
]

const Signup = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    queryKey: ['createUser'],
    mutationFn: (userRegisterCredentials) => userRegister(userRegisterCredentials),
    onSuccess: (data) => {
      navigate('/auth/login')
      toast(t('authPage.registerSuccessMessage'), {
        type: 'success'
      })
    },
    onError: (error) => {
      console.log(error.response.data)
      if (error.response && error.response.data) {
        toast(error.response.data.error || error.response.data.message, {
          type: 'error'
        })
      }
    }
  })

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string().required(t('inputs.required')),
    last_name: Yup.string().required(t('inputs.required')),
    gender: Yup.string().required(t('inputs.required')),
    username: Yup.string().required(t('inputs.required')),
    email: Yup.string().email(t('inputs.invalidEmail')).required(t('inputs.required')),
    user_pass: Yup.string().required(t('inputs.required')),
    repeatPassword: Yup.string()
      .required(t('inputs.required'))
      .oneOf([Yup.ref('user_pass'), null], t('inputs.passwordMustMatch'))
  })

  const handleSubmit = (values) => {
    mutate(values)
  }

  return (
    <section className='mb-[125px]'>
      <h2 className='text-2xl capitalize mb-6'>{t('inputs.yourName')}</h2>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          username: '',
          user_pass: '',
          email: '',
          gender: '',
          repeatPassword: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleBlur, handleChange }) => (
          <Form className='flex flex-col gap-6'>
            <Field
              name='first_name'
              label={t('inputs.firstName')}
              type='text'
              component={CustomField}
              value={values.first_name}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <Field
              name='last_name'
              label={t('inputs.lastName')}
              type='text'
              component={CustomField}
              value={values.last_name}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <FormikSelect
              placeholder={t('authPage.selectGender')}
              selectOptions={genderOptions}
              label={t('inputs.gender')}
              name='gender'
              required
            />
            <h2 className='text-2xl capitalize mt-12'>{t('authPage.loginDetails')}</h2>
            <Field
              name='email'
              label={t('inputs.email')}
              type='email'
              component={CustomField}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <Field
              name='username'
              label={t('inputs.username')}
              type='text'
              component={CustomField}
              value={values.username}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <Field
              name='user_pass'
              label={t('inputs.password')}
              type='password'
              component={CustomField}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <Field
              name='repeatPassword'
              label={t('inputs.repeatPassword')}
              type='password'
              component={CustomField}
              value={values.repeatPassword}
              onBlur={handleBlur}
              onChange={handleChange}
              required
            />
            <PrimaryButton
              type='submit'
              loading={isLoading}
              disabled={isLoading}
              className='text-white capitalize md:max-w-[280px] w-full mt-6 text-xl'
              text={t('authPage.register')}
            />
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default Signup
