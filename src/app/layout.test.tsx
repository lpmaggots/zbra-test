import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RootLayout from './layout'

describe('<RootLayout />', () => {
  it('deve renderizar o conteúdo passado via children', () => {
    render(
      <RootLayout>
        <div>Conteúdo de teste</div>
      </RootLayout>
    )

    expect(screen.getByText('Conteúdo de teste')).toBeInTheDocument()
  })

  it('deve envolver o conteúdo com html e body', () => {
    render(
      <RootLayout>
        <div>Outro conteúdo</div>
      </RootLayout>
    )

    const html = document.querySelector('html')
    const body = document.querySelector('body')

    expect(html).not.toBeNull()
    expect(body).not.toBeNull()
    expect(body?.textContent).toContain('Outro conteúdo')
  })
})
