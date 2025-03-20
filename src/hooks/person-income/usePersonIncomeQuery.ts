import { mutationKeys } from '@/core/helpers/key-tanstack'
import ToastifyCommon from '@/core/helpers/toastify-common'
import { personIncomeApi } from '@/core/services/person-income.service'
import { PersonIncomeRequest } from '@/models/interface/person-income.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const usePersonIncome = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: mutationKeys.getPersonIncome,
    queryFn: () => personIncomeApi.getPersonIncomes()
  })

  return { data, isLoading, error }
}

export const usePersonIncomeById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: mutationKeys.getPersonIncomeById,
    queryFn: () => personIncomeApi.getPersonIncomeById(id)
  })

  return { data, isLoading, error }
}

export const useCreatePersonIncome = () => {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn: (mutate: PersonIncomeRequest) => personIncomeApi.createPersonIncome(mutate),
    onSuccess: () => {
      ToastifyCommon.success('Thêm thu nhập thành công')
      queryClient.invalidateQueries({ queryKey: mutationKeys.getPersonIncome })
    },
    onError: () => {
      ToastifyCommon.error('Thêm thu nhập thất bại')
    }
  })

  return { mutate, error }
}

export const useUpdatePersonIncome = (id: string) => {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn: (mutate: PersonIncomeRequest) => personIncomeApi.updatePersonIncome(id, mutate),
    onSuccess: () => {
      ToastifyCommon.success('Cập nhật thu nhập thành công')
      queryClient.invalidateQueries({ queryKey: mutationKeys.getPersonIncome })
    },
    onError: () => {
      ToastifyCommon.error('Cập nhật thu nhập thất bại')
    }
  })

  return { mutate, error }
}

export const useDeletePersonIncome = (id: string) => {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn: () => personIncomeApi.deletePersonIncome(id),
    onSuccess: () => {
      ToastifyCommon.success('Xóa thu nhập thành công')
      queryClient.invalidateQueries({ queryKey: mutationKeys.getPersonIncome })
    },
    onError: () => {
      ToastifyCommon.error('Xóa thu nhập thất bại')
    }
  })

  return { mutate, error }
}
