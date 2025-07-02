'use client'

import React from 'react'
import styles from '<@>/styles/components/_button.module.scss'

type ButtonProps = {
  label: string
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({ label, onClick, disabled = false, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {label}
    </button>
  )
}

export default Button