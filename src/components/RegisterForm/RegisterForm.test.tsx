import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import RegisterForm from './index'

vi.mock('<@>/composables/usePasswordValidation', () => ({
  usePasswordValidation: () => ({
    validate: (password: string) => {
      if (/^\d{6}$/.test(password)) return []
      return ['Password must have 6 digits']
    }
  }),
}))

vi.mock('<@>/composables/useStatusMessage', () => ({
  useStatusMessage: (status: string, errors: string[]) => {
    if (status === 'invalid') return { type: 'error', message: errors.join(', ') }
    if (status === 'sending') return { type: 'info', message: 'Enviando...' }
    if (status === 'sent') return { type: 'success', message: 'Enviado com sucesso' }
    if (status === 'error') return { type: 'error', message: 'Erro no envio' }
    if (status === 'valid') return null
    return null
  }
}))

const API_URL = 'https://fakeapi.test/register'
process.env.NEXT_PUBLIC_API_URL = API_URL

describe('RegisterForm - E2E', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('deve desabilitar o botão se o formulário estiver inválido', () => {
    render(<RegisterForm />)
    const button = screen.getByRole('button', { name: /enviar/i })
    expect(button).toBeDisabled()
  })

  it('deve habilitar o botão quando o formulário estiver válido', async () => {
    render(<RegisterForm />)

    const inputName = screen.getByPlaceholderText('Seu nome')
    const inputEmail = screen.getByPlaceholderText('E-mail')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, 'Felipe')
    await userEvent.type(inputEmail, 'felipe@test.com')
    await userEvent.type(inputPassword, '123456')

    expect(button).toBeEnabled()
  })

  it('deve mostrar erro quando a senha for inválida', async () => {
    render(<RegisterForm />)

    const inputName = screen.getByPlaceholderText('Seu nome')
    const inputEmail = screen.getByPlaceholderText('E-mail')
    const inputPassword = screen.getByPlaceholderText('Senha')

    await userEvent.type(inputName, 'Felipe')
    await userEvent.type(inputEmail, 'felipe@test.com')

    await userEvent.type(inputPassword, 'abc')

    const errorMessage = await screen.findByText(/Password must have 6 digits/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('deve enviar o formulário com sucesso e limpar os campos', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      status: 201,
      json: async () => ({})
    } as Response)

    render(<RegisterForm />)

    const inputName = screen.getByPlaceholderText('Seu nome')
    const inputEmail = screen.getByPlaceholderText('E-mail')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, 'Felipe')
    await userEvent.type(inputEmail, 'felipe@test.com')
    await userEvent.type(inputPassword, '123456')

    expect(button).toBeEnabled()

    await userEvent.click(button)

    const successMessage = await screen.findByText(/Enviado com sucesso/i)
    expect(successMessage).toBeInTheDocument()

    expect(inputName).toHaveValue('')
    expect(inputEmail).toHaveValue('')
    expect(inputPassword).toHaveValue('')
  })

  it('deve mostrar erro ao falhar o envio', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      status: 500,
      json: async () => ({})
    } as Response)

    render(<RegisterForm />)

    const inputName = screen.getByPlaceholderText('Seu nome')
    const inputEmail = screen.getByPlaceholderText('E-mail')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, 'Felipe')
    await userEvent.type(inputEmail, 'felipe@test.com')
    await userEvent.type(inputPassword, '123456')

    await userEvent.click(button)

    const errorMessage = await screen.findByText(/Erro no envio/i)
    expect(errorMessage).toBeInTheDocument()
  })

  it('deve mostrar erro quando a requisição falhar com exceção', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Erro inesperado'))

    render(<RegisterForm />)

    const inputName = screen.getByPlaceholderText('Seu nome')
    const inputEmail = screen.getByPlaceholderText('E-mail')
    const inputPassword = screen.getByPlaceholderText('Senha')
    const button = screen.getByRole('button', { name: /enviar/i })

    await userEvent.type(inputName, 'Felipe')
    await userEvent.type(inputEmail, 'felipe@test.com')
    await userEvent.type(inputPassword, '123456')

    await userEvent.click(button)

    const errorMessage = await screen.findByText(/Erro no envio/i)
    expect(errorMessage).toBeInTheDocument()
  })
})
