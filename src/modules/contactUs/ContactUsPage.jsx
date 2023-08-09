import { useTranslation } from 'react-i18next'
import { Field, Form, Formik } from 'formik'
import CustomField from '@components/CustomField'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import PrimaryButton from '@components/PrimaryButton'
import { submitContactUs } from '@api/contactUs'
import PageContent from '@components/layout/PageContent'

const ContactUsPage = () => {
  const { t } = useTranslation()

  const mutation = useMutation({
    queryKey: ['postComment'],
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

  const contactUsSchema = Yup.object().shape({
    first_name: Yup.string().required(t('inputs.required')),
    last_name: Yup.string().required(t('inputs.required')),
    email: Yup.string().email(t('inputs.invalidEmail')).required(t('inputs.required')),
    topic: Yup.string().required(t('inputs.required')),
    comment: Yup.string().required(t('inputs.required'))
  })

  return (
    <PageContent className='mb-24'>
      <h1 className='text-center capitalize text-4xl md:text-6xl mb-12'>{t('contactUs')}</h1>
      <Formik
        initialValues={{ first_name: '', last_name: '', email: '', topic: '', comment: '' }}
        onSubmit={mutation.mutate}
        validationSchema={contactUsSchema}
      >
        {({ values, handleBlur, handleChange }) => (
          <Form className='flex flex-wrap mx-auto gap-y-11 gap-x-[45px] min-h-full max-w-[800px]'>
            <Field
              name='first_name'
              label={t('inputs.firstName')}
              type='text'
              component={CustomField}
              value={values.first_name}
              onBlur={handleBlur}
              onChange={handleChange}
              labelClassNames='text-white'
              containerClassNames='lg:w-1/2 lg:max-w-[371px]'
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
              labelClassNames='text-white'
              containerClassNames='lg:w-1/2 lg:max-w-[371px]'
              required
            />
            <Field
              name='email'
              label={t('inputs.email')}
              type='email'
              component={CustomField}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              labelClassNames='text-white'
              required
            />
            <Field
              name='topic'
              label={t('inputs.yourTopic')}
              type='text'
              component={CustomField}
              value={values.topic}
              onBlur={handleBlur}
              onChange={handleChange}
              labelClassNames='text-white'
              required
            />
            <Field
              name='comment'
              label={t('inputs.yourComment')}
              InputType='textarea'
              type='text'
              component={CustomField}
              value={values.comment}
              onBlur={handleBlur}
              onChange={handleChange}
              labelClassNames='text-white'
              height={156}
              required
            />
            <PrimaryButton
              className='w-full text-white capitalize text-xl md:max-w-[184px] mt-8 mb-[14px]'
              text={t('inputs.submit')}
              isLoading={mutation.isLoading}
              disable={mutation.isLoading}
              type='submit'
            />
            <p className='items-start flex gap-2 w-full'>
              {t('contactUsPage.forInquiries')}
              <a className='text-secondaryLink underline underline-offset-2 block' href={`mailto:contact@develocity.store`}>
                contact@develocity.store.
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </PageContent>
  )
}

export default ContactUsPage
