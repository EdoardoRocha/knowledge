import { useToast } from 'vue-toastification'
const toast = useToast()

export const userKey = '__knowledge_user'
export const baseApiUrl = 'http://18.231.168.74:3000'

export function showError(e) {
  if (e && e.response && e.response.data) {
    const msg =
      typeof e.response.data === 'String'
        ? e.response.data
        : e.response.data.msg || e.response.data.message

    toast.error(msg || 'Erro de validação no servidor...')
  } else if (typeof e === 'string') {
    toast.error(e)
  } else {
    toast.error('Ocorreu um erro inesperado.')
  }
}
