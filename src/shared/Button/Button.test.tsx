import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './index'

describe('<Button />', () => {
  it('deve renderizar o botão com o texto correto', () => {
    render(<Button label="Clique aqui" />)
    expect(screen.getByRole('button', { name: /clique aqui/i })).toBeInTheDocument()
  })

  it('deve disparar onClick quando clicado', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button label="Enviar" onClick={handleClick} />)

    const button = screen.getByRole('button', { name: /enviar/i })
    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('deve estar desabilitado quando "disabled" for true', () => {
    render(<Button label="Desabilitado" disabled />)
    const button = screen.getByRole('button', { name: /desabilitado/i })
    expect(button).toBeDisabled()
  })

  it('deve usar o type passado via prop', () => {
    render(<Button label="Submit" type="submit" />)
    const button = screen.getByRole('button', { name: /submit/i })
    expect(button).toHaveAttribute('type', 'submit')
  })
})
