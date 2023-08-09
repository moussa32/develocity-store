import CustomField from '@components/CustomField'
import PrimaryButton from '@components/PrimaryButton'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { submitContactUs } from '@api/contactUs'
import { getUserFromCookie } from '@util/auth'

const EditProfile = () => {
  const { t } = useTranslation()
  const user = getUserFromCookie

  console.log(user)

  const { mutate, isLoading } = useMutation({
    queryKey: ['editProfile'],
    mutationFn: (message) => submitContactUs(message),
    onSuccess: (data) =>
      toast(t('contactUsPage.successMessage'), {
        type: 'success'
      }),
    onError: (error) => {
      if (error.response && error.response.data) {
        toast(error.response.data.message, {
          type: 'error'
        })
      }
    }
  })

  const EditProfileSchema = Yup.object().shape({
    first_name: Yup.string().required(t('inputs.required')),
    last_name: Yup.string().required(t('inputs.required')),
    gender: Yup.string().required(t('inputs.required')),
    email: Yup.string().email(t('inputs.invalidEmail')).required(t('inputs.required')),
    user_pass: Yup.string().required(t('inputs.required')),
    repeatPassword: Yup.string()
      .required(t('inputs.required'))
      .oneOf([Yup.ref('user_pass'), null], t('inputs.passwordMustMatch'))
  })

  return (
    <div>
      <h1 className='text-[62px] text-center mb-14'>Edit Profile</h1>
      <Formik
        initialValues={{
          first_name: user?.first_name,
          last_name: user?.lastName,
          email: user?.user_email,
          gender: user?.gender,
          user_pass: ''
        }}
        onSubmit={mutate}
        validationSchema={EditProfileSchema}
      >
        {({ values, handleBlur, handleChange }) => (
          <Form className='grid grid-cols-2 mx-auto gap-y-11 gap-x-[45px] min-h-full max-w-[934px]'>
            <div className='flex flex-col gap-5'>
              <h2 className='text-xl'>Your Name</h2>
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
              <Field
                name='gender'
                label={t('inputs.gender')}
                type='text'
                component={CustomField}
                value={values.gender}
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />
            </div>
            <div className='flex flex-col gap-5'>
              <h2 className='text-xl'>Login Details</h2>
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
            </div>

            <PrimaryButton
              className='w-full capitalize text-white text-xl md:max-w-[184px] mt-8 mb-[14px]'
              text={t('inputs.save')}
              isLoading={isLoading}
              disable={isLoading}
              type='submit'
            />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default EditProfile
