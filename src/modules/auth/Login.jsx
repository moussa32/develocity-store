import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PrimaryButton from '@components/PrimaryButton'
import { useMutation } from '@tanstack/react-query'
import { userLogin } from '@api/users'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import CustomField from '@components/CustomField'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

const Login = () => {
  const { t } = useTranslation()

  const mutation = useMutation({
    queryKey: ['login'],
    mutationFn: (userLoginCredentials) => userLogin(userLoginCredentials),
    onError: (error) => {
      if (error.response && error.response.data) {
        toast(error.response.data.message, {
          type: 'error'
        })
      }
    },
    onSuccess: ({ data }) => {
      Cookies.set('user', JSON.stringify(data.data))
      window.location.assign('/dashboard')
    }
  })

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(t('inputs.invalidEmail')).required(t('inputs.required')),
    password: Yup.string().required(t('inputs.required'))
  })

  const handleSubmit = (values) => {
    mutation.mutate(values)
  }

  return (
    <section className='mb-[224px]'>
      <h2 className='text-2xl capitalize mb-6'>{t('authPage.loginDetails')}</h2>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleBlur, handleChange }) => (
          <Form>
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
              name='password'
              label={t('inputs.password')}
              type='password'
              component={CustomField}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              containerClassNames='mt-4'
              required
            />
            <Link className='text-secondaryLink block text-right mt-2 underline underline-offset-2' to='/forgot-password'>
              {t('authPage.forgotYourPassword')}
            </Link>
            <PrimaryButton
              className='w-full capitalize text-white hover:text-white text-xl md:max-w-[280px] mt-8 mb-[14px]'
              text={t('authPage.submitLogin')}
              loading={mutation.isLoading}
              disable={mutation.isLoading}
              type='submit'
            />
            <p className='flex text-secondary items-center gap-2'>
              {t('authPage.donTHaveAccount')}
              <Link className='text-secondaryLink underline underline-offset-2 block' to='/auth/signup'>
                {t('authPage.createAccount')}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default Login
