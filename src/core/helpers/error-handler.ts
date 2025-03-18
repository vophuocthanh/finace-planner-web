import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

type ErrorHandlerOptions = {
  error: Error
  defaultMessage?: string
}

export function handleError({ error, defaultMessage = 'Something went wrong!' }: ErrorHandlerOptions) {
  const axiosError = error as AxiosError<{ message: string }>
  const errorMessage = axiosError?.response?.data?.message || defaultMessage
  toast.error(errorMessage)
}
