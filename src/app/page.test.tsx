import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Home from './page'

vi.mock('@/components/RegisterForm', () => ({
  __esModule: true,
  default: () => <div data-testid="form-mock">Mocked Form</div>
}))

describe('<Home />', () => {
  it('deve renderizar a página inicial com o componente RegisterForm', () => {
    render(<Home />)

    const form = screen.getByTestId('form-mock')
    expect(form).toBeInTheDocument()
    expect(form).toHaveTextContent('Mocked Form')
  })
})
