import { mutationKeys } from '@/core/helpers/key-tanstack'
import { userApi } from '@/core/services/user.service'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = () => {
  return useQuery({
    queryKey: mutationKeys.getMe,
    queryFn: () => userApi.getUserMe()
  })
}

export const useGetUser = () => {
  return useQuery({
    queryKey: mutationKeys.getUsers,
    queryFn: () => userApi.getUsers()
  })
}

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: mutationKeys.getUserById,
    queryFn: () => userApi.getUserById(id)
  })
}
