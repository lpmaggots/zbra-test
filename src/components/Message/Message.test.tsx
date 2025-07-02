import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Message } from './index'

describe('<Message />', () => {
  it('deve exibir uma mensagem de sucesso em <p>', () => {
    render(<Message type="success" message="Operação concluída com sucesso" />)

    expect(screen.getByText('Operação concluída com sucesso')).toBeInTheDocument()
    expect(screen.queryByText('Senha inválida')).not.toBeInTheDocument()
  })

  it('deve exibir uma mensagem de erro e o texto "Senha inválida"', () => {
    render(<Message type="error" message="Erro ao salvar" />)

    expect(screen.getByText('Erro ao salvar')).toBeInTheDocument()
    expect(screen.getByText('Senha inválida')).toBeInTheDocument()
  })

  it('deve renderizar uma lista de mensagens se for um array', () => {
    const mensagens = ['Campo obrigatório', 'Formato inválido']

    render(<Message type="error" message={mensagens} />)

    mensagens.forEach(msg => {
      expect(screen.getByText(msg)).toBeInTheDocument()
    })

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(mensagens.length)
  })

  it('deve aplicar as classes CSS corretamente', () => {
    render(<Message type="success" message="Tudo certo" />)
    const container = screen.getByText('Tudo certo').parentElement
    expect(container?.className).toContain('message')
    expect(container?.className).toContain('message--success')
  })
})
