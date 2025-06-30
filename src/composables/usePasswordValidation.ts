type PasswordRule = {
  validate: (password: string) => boolean
  message: string
}

const passwordRules: PasswordRule[] = [
  {
    validate: password => /^\d{6}$/.test(password),
    message: 'A senha deve conter 6 digitos'
  },
  {
    validate: password => {
      const num = Number(password)
      return num >= 184759 && num <= 856920
    },
    message: 'A senha deve estar entre 184759 and 856920'
  },
  {
    validate: password => /(\d)\1/.test(password),
    message: 'Dois dígitos adjacentes devem ser iguais'
  },
  {
    validate: password => password.split('').every((d, i, arr) => i === 0 || arr[i - 1] <= d),
    message: 'Os dígitos devem apenas crescer em valor ou se manter'
  }
]

export const usePasswordValidation = () => {
  const validate = (password: string): string[] => {
    return passwordRules
      .filter(rule => !rule.validate(password))
      .map(rule => rule.message)
  }

  return { validate }
}
