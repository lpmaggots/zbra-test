'use client'
import React, { useState } from 'react'
// components
import { Input } from '../Input/'
import { Button } from '../Button/'
import { Message } from '../Message/'
// types
import { FormData } from '<@>/types/form.types'
import { Status } from '<@>/types/status.types'
// composables
import { usePasswordValidation } from '<@>/composables/usePasswordValidation'
import { useStatusMessage } from '<@>/composables/useStatusMessage'
// styles
import styles from '<@>/styles/components/_form.module.scss'

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export const Form = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const { validate } = usePasswordValidation()

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<string[]>([])
  const statusMessage = useStatusMessage(status, errors)

  const isFormValid = form.name.trim() !== '' && emailRegex.test(form.email) && validate(form.password).length === 0
  const isDisabled = status === 'sending'
  
  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setForm({ ...form, [field]: value })

    if(field === 'password') {
      const validationErrors = validate(value)
      if(validationErrors.length > 0) {
        setErrors(validationErrors)
        setStatus('invalid')
      }else {
        setErrors([])
        setStatus('valid')
      }
    }
  }


  const handleSubmit = async () => {
  if (status === 'sending') return

  const validationErrors = validate(form.password)
    if(!form.name.trim() || !emailRegex.test(form.email) || validationErrors.length > 0) {
      const errorsToSet = validationErrors
      if (!form.name.trim()) errorsToSet.push('Name is required')
      if (!emailRegex.test(form.email)) errorsToSet.push('Email is invalid')
      setErrors(errorsToSet)
      setStatus('invalid')
      return
    }

    try {
      setStatus('sending')
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      if(res.status === 201) {
        setStatus('sent')
        clear()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }


  const clear = () => {
    setForm({
      name: '',
      email: '',
      password: ''
    })
    setErrors([])
  }

  return (
    <div className={styles['form-container']}>
      <h2 className={styles['form-title']}>Valide sua senha</h2>
      <div className={styles['form-fields']}>
        <Input
          name='name'
          value={form.name}
          placeholder='Seu nome'
          onChange={handleChange('name')}
          disabled={isDisabled}
        />
        <Input
          name='email'
          value={form.email}
          placeholder='E-mail'
          onChange={handleChange('email')}
          disabled={isDisabled}
        />
        <Input
          type='password'
          name='password'
          value={form.password}
          placeholder='Senha'
          onChange={handleChange('password')}
          disabled={isDisabled}
        />
        {statusMessage && (
          <Message type={statusMessage.type} message={statusMessage.message} />
        )}
        <Button
          type='submit'
          onClick={handleSubmit}
          label='Enviar'
          disabled={!isFormValid || isDisabled}
        />
      </div>
    </div>
  )
}

export default Form
