import { path } from '@/core/constants/path'
import { handleError } from '@/core/helpers/error-handler'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import toastifyCommon from '@/core/helpers/toastify-common'
import { authApi } from '@/core/services/auth.service'
import { VerifyEmailSchema } from '@/core/zod/verify-email.zod'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const RESEND_COUNTDOWN = 60

export const useVerifyAccountEmail = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationKey: mutationKeys.verifyEmail,
    mutationFn: (data: z.infer<typeof VerifyEmailSchema>) => authApi.verifyEmail(data),
    onSuccess: () => {
      toastifyCommon.success('Email verified successfully! 🎉')
      navigate(path.login)
    },
    onError: (error) => handleError(error, 'Failed to verify email')
  })
}

export const useResendVerificationCode = ({
  setCountdown,
  setCanResend
}: {
  setCountdown: (countdown: number) => void
  setCanResend: (canResend: boolean) => void
}) => {
  return useMutation({
    mutationKey: mutationKeys.resendCode,
    mutationFn: (email: string) => authApi.resendVerificationCode(email),
    onSuccess: () => {
      toastifyCommon.success('Verification code resent! 📧')
      setCountdown(RESEND_COUNTDOWN)
      setCanResend(false)
    },
    onError: (error) => handleError(error, 'Failed to resend verification code')
  })
}
