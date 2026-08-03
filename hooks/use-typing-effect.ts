import { useState, useEffect } from 'react'

export function useTypingEffect(text: string, speed = 50, startDelay = 0) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (startDelay > 0) {
      const delayTimer = setTimeout(() => {
        // Start typing after delay
        let index = 0
        const interval = setInterval(() => {
          if (index <= text.length) {
            setDisplayedText(text.substring(0, index))
            index++
          } else {
            clearInterval(interval)
            setIsComplete(true)
          }
        }, speed)

        return () => clearInterval(interval)
      }, startDelay)

      return () => clearTimeout(delayTimer)
    } else {
      // Start typing immediately
      let index = 0
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.substring(0, index))
          index++
        } else {
          clearInterval(interval)
          setIsComplete(true)
        }
      }, speed)

      return () => clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return { displayedText, isComplete }
}
