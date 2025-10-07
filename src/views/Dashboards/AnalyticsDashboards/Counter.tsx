'use client'

import React, { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  start: number
  end: number
  duration: number
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  start,
  end,
  duration,
}) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number | null = null

    const animate = (time: number) => {
      if (startTime === null) startTime = time
      const elapsed = time - startTime
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(start + (end - start) * progress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [start, end, duration])

  return <span>{count}</span>
}

export default AnimatedCounter
