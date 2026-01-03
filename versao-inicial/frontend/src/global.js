import { useToast } from 'vue-toastification'
const toast = useToast()

export const baseApiUrl = 'http://localhost:3000'

export function showError(e) {
  if (e && e.response && e.response.data) {
    toast.error(e.response.data);
  } else if (typeof e === 'string') {
    toast.error(e);
  } else {
    toast.error('Ocorreu um erro inesperado.')
  }
}
