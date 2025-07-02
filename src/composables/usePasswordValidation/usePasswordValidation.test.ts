import { describe, it, expect } from 'vitest'
import { usePasswordValidation } from './index'

describe('usePasswordValidation', () => {
  const { validate } = usePasswordValidation()

  it('deve passar a senha válida corretamente', () => {
    const senhaValida = '445679'
    const result = validate(senhaValida)
    expect(result).toEqual([])
  })

  it('deve falhar na regra de 6 dígitos', () => {
    const result = validate('12345')
    expect(result).toContain('A senha deve conter 6 digitos')
  })

  it('deve falhar na regra do intervalo numérico', () => {
    const result = validate('123456')
    expect(result).toContain('A senha deve estar entre 184759 and 856920')
  })

  it('deve falhar na regra de dígitos adjacentes iguais', () => {
    const result = validate('123456')
    expect(result).toContain('Dois dígitos adjacentes devem ser iguais')
  })

  it('deve falhar na regra de ordem crescente', () => {
    const result = validate('223451')
    expect(result).toContain('Os dígitos devem apenas crescer em valor ou se manter')
  })

  it('deve retornar múltiplas mensagens para múltiplas falhas', () => {
    const result = validate('12345')
    expect(result.length).toBeGreaterThan(1)
  })
})
