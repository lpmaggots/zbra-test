'use client'

import React from 'react'
import styles from '<@>/styles/components/_input.module.scss'

type InputProps = {
  type?: string
  name: string
  value: string
  label?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const Input = ({ type = 'text', name, value, label, placeholder, onChange, disabled }: InputProps) => {
  return (
    <div className={styles['input-wrapper']}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles['input-field']}
        disabled={disabled}
      />
    </div>
  )
}

export default Input