'use client'

import React from 'react'
import styles from '<@>/styles/components/_message.module.scss'

export type MessageType = 'success' | 'error'

type MessageProps = {
  type: MessageType
  message: string | string[]
}

export const Message = ({ type, message }: MessageProps) => {
  return (
    <div className={`${styles.message} ${styles[`message--${type}`]}`}>
      {type === 'error' && (
        <span className={`${styles[`message--${type}`]} mb-xs`}>Senha inválida</span>
      )}
      {Array.isArray(message) ? (
        <ul>
          {message.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
      ) : (
        <p>{message}</p>
      )}
    </div>
  )
}