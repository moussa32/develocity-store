import { memo, useCallback, useEffect, useState } from 'react'
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md'
import { Tooltip, message } from 'antd'

const NumberInput = ({ defaultValue = 1, onIncrement, onDecrement, onUpdate, max, min = 1 }) => {
  const [initialValue, setInitialValue] = useState(Number(defaultValue))
  const [isMinExceeded, setIsMinExceeded] = useState(false)
  const [isMaxExceeded, setIsMaxExceeded] = useState(false)

  useEffect(() => {
    initialValue >= Number(max) ? setIsMaxExceeded(true) : setIsMaxExceeded(false)
    initialValue <= Number(min) ? setIsMinExceeded(true) : setIsMinExceeded(false)
  }, [initialValue, max, min])

  const increment = useCallback(() => {
    if (!isMaxExceeded) {
      setInitialValue((prevState) => prevState + 1)
      onIncrement && onIncrement(initialValue + 1)
    }
  }, [onIncrement, initialValue, isMaxExceeded])

  const decrement = useCallback(() => {
    if (!isMinExceeded) {
      setInitialValue((prevState) => prevState - 1)
      onDecrement && onDecrement(initialValue - 1)
    }
  }, [onDecrement, initialValue, isMinExceeded])

  const updateManually = useCallback(
    (event) => {
      const newValue = Number(event.target.value) ? Number(event.target.value) : min

      if (!(newValue > Number(max)) && !(newValue < Number(min))) {
        setInitialValue(Number(newValue))
        onUpdate && onUpdate()
      } else {
        message.error(`You can't buy more than ${max}`)
      }
    },
    [onUpdate, isMaxExceeded, isMinExceeded]
  )

  return (
    <div className='w-[84px] text-lg border-1 rounded-sm border-white/40 h-[62px] flex items-center justify-center py-[18px] px-[14px]'>
      <input onChange={updateManually} value={initialValue} className='appearance-none bg-black shrink-0 w-3/4 text-center' />
      <div className='shrink-0 w-1/4 cursor-pointer flex flex-col mr-2'>
        <button disabled={isMaxExceeded} className='group'>
          {isMaxExceeded ? (
            <Tooltip overlayInnerStyle={{ width: 'fit-content' }} placement='top' title={'This is the maximum amount you can buy'}>
              <MdKeyboardArrowUp onClick={increment} className='text-white/40 hover:text-white/80 group-disabled:text-white/20' size={25} />
            </Tooltip>
          ) : (
            <MdKeyboardArrowUp onClick={increment} className='text-white/40 hover:text-white/80 group-disabled:text-white/20' size={25} />
          )}
        </button>
        <button disabled={isMinExceeded} className='group'>
          {isMinExceeded ? (
            <Tooltip placement='bottom' title={'You can"t order less'}>
              <MdKeyboardArrowDown
                onClick={decrement}
                className='text-white/40 hover:text-white/80 group-disabled:text-white/20'
                size={25}
              />
            </Tooltip>
          ) : (
            <MdKeyboardArrowDown onClick={decrement} className='text-white/40 hover:text-white/80 group-disabled:text-white/20' size={25} />
          )}
        </button>
      </div>
    </div>
  )
}

export default memo(NumberInput)
