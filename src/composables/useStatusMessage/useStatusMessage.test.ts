import { describe, it, expect } from 'vitest'
import { useStatusMessage } from './index'

describe('useStatusMessage', () => {
  it('deve retornar mensagem success para status "valid"', () => {
    const result = useStatusMessage('valid', [])
    expect(result).toEqual({
      type: 'success',
      message: 'Senha válida!'
    })
  })

  it('deve retornar mensagem error com erros para status "invalid"', () => {
    const errors = ['Erro 1', 'Erro 2']
    const result = useStatusMessage('invalid', errors)
    expect(result).toEqual({
      type: 'error',
      message: errors
    })
  })

  it('deve retornar mensagem success para status "sent"', () => {
    const result = useStatusMessage('sent', [])
    expect(result).toEqual({
      type: 'success',
      message: 'Resultado enviado com sucesso!'
    })
  })

  it('deve retornar mensagem error para status "error"', () => {
    const result = useStatusMessage('error', [])
    expect(result).toEqual({
      type: 'error',
      message: 'Falha ao enviar resultado. Tente novamente.'
    })
  })

  it('deve retornar null para status "idle"', () => {
    const result = useStatusMessage('idle', [])
    expect(result).toBeNull()
  })

  it('deve retornar null para status "sending"', () => {
    const result = useStatusMessage('sending', [])
    expect(result).toBeNull()
  })
})
