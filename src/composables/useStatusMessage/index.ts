// components
import { MessageType } from '<@>/components/Message'
// types
import { Status } from '<@>/types/status.types'

type StatusMessageMap = {
  [key in Status]: { type: MessageType, message: string | string[] } | null
}

export const useStatusMessage = (status: Status, errors: string[]) => {
  const map: StatusMessageMap = {
    valid: { type: 'success', message: 'Senha válida!' },
    invalid: { type: 'error', message: errors },
    sent: { type: 'success', message: 'Resultado enviado com sucesso!' },
    error: { type: 'error', message: 'Falha ao enviar resultado. Tente novamente.' },
    idle: null,
    sending: null
  }

  return map[status]
}
