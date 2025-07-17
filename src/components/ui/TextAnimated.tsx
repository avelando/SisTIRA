'use client'

import React, { useState, useEffect } from 'react'
import styles from '@/styles/TextAnimated.module.css'

interface TextAnimatedProps {
  texts: string[]
  className?: string
}

export const TextAnimated: React.FC<TextAnimatedProps> = ({
  texts,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = texts[currentIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentIndex, texts])

  return (
    <span className={`${styles.textAnimated} ${className}`}>
      {displayText}
      <span className={styles.cursor}>|</span>
    </span>
  )
}
