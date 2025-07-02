import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './index'

describe('<Input />', () => {
  it('deve renderizar com o valor correto', () => {
    render(
      <Input
        name="email"
        value="teste@email.com"
        onChange={() => {}}
      />
    )

    const input = screen.getByDisplayValue('teste@email.com')
    expect(input).toBeInTheDocument()
  })

  it('deve exibir o label se informado', () => {
    render(
      <Input
        label="Email"
        name="email"
        value=""
        onChange={() => {}}
      />
    )

    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('deve disparar onChange ao digitar', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Input
        name="nome"
        value=""
        onChange={handleChange}
        placeholder="Digite seu nome"
      />
    )

    const input = screen.getByPlaceholderText('Digite seu nome')
    await user.type(input, 'Felipe')
    expect(handleChange).toHaveBeenCalledTimes(6)
  })

  it('deve estar desabilitado quando "disabled" for true', () => {
    render(
      <Input
        name="nome"
        value="Teste"
        onChange={() => {}}
        disabled
      />
    )

    expect(screen.getByDisplayValue('Teste')).toBeDisabled()
  })
})
