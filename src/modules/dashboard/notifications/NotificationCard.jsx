import { memo } from 'react'

const NotificationCard = ({ title, description, timestamp }) => {
  return (
    <section className='rounded-xl hover:bg-indigo-500 bg-[#313131] pr-4 pl-5 py-8'>
      <h2 className='text-4xl text-white mb-3'>{title}</h2>
      <p className='text-base text-[#C1C1C1]'>{description}</p>
      <span className='mt-6 block text-right text-white'>{timestamp}</span>
    </section>
  )
}

export default memo(NotificationCard)
