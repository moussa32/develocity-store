import { Button } from 'antd'

const PrimaryButton = ({ type, className, text, icon, onClick, ...props }) => {
  return (
    <Button
      htmlType={type}
      onClick={onClick}
      className={`${className} h-[58px] border-0 flex items-center disable:text-white active:text-black disabled:bg-indigo-500 justify-center bg-indigo-500 rounded-sm`}
      icon={icon}
      {...props}
    >
      {text}
    </Button>
  )
}

export default PrimaryButton
