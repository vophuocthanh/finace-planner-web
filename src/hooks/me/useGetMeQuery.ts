import { mutationKeys } from '@/core/helpers/key-tanstack'
import { userApi } from '@/core/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = () => {
  return useQuery({
    queryKey: mutationKeys.getMe,
    queryFn: () => userApi.getUserMe()
  })
}
