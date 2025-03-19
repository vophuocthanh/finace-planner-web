import { mutationKeys } from '@/core/helpers/key-tanstack'
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
      queryClient.invalidateQueries({ queryKey: mutationKeys.getPersonIncome })
    }
  })

  return { mutate, error }
}

export const useUpdatePersonIncome = (id: string) => {
  const queryClient = useQueryClient()
  const { mutate, error } = useMutation({
    mutationFn: (mutate: PersonIncomeRequest) => personIncomeApi.updatePersonIncome(id, mutate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mutationKeys.getPersonIncome })
    }
  })

  return { mutate, error }
}
