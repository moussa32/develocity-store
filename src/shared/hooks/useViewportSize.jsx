import { useState, useEffect } from 'react'

const useViewportSize = (number) => {
  const [isViewportLessThanOrEqualToNumber, setIsViewportLessThanOrEqualToNumber] = useState(window.innerWidth <= number)

  useEffect(() => {
    const handleResize = () => {
      setIsViewportLessThanOrEqualToNumber(window.innerWidth <= number)
    }

    // Add event listener to window resize
    window.addEventListener('resize', handleResize)

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [number])

  return isViewportLessThanOrEqualToNumber
}

export default useViewportSize
