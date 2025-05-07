import { handleError } from '@/core/helpers/error-handler'
import { mutationKeys } from '@/core/helpers/key-tanstack'
import ToastifyCommon from '@/core/helpers/toastify-common'
import { expenseApi } from '@/core/services/expense.service'
import { getAccessTokenFromLS } from '@/core/shared/storage'
import { ExpenseRequest } from '@/models/interface/expense.interface'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const token = getAccessTokenFromLS()

export const useExpenseQuery = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: mutationKeys.getExpenses,
    queryFn: () => expenseApi.getExpenses(),
    select: (data) => data.data,
    enabled: !!token
  })

  return { data, isLoading, error }
}

export const useExpenseByIdQuery = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [mutationKeys.getExpenseById, id],
    queryFn: () => expenseApi.getExpenseById(id),
    select: (data) => data,
    enabled: !!token
  })

  return { data, isLoading, error }
}

export const useCreateExpenseMutation = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: (expense: ExpenseRequest) => expenseApi.createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mutationKeys.getExpenses })
    },
    onError: (error) => {
      handleError({ error })
    }
  })

  return { mutate, isPending, error }
}

export const useUpdateExpenseMutation = (id: string) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: (expense: ExpenseRequest) => expenseApi.updateExpense(id, expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mutationKeys.getExpenses })
    },
    onError: (error) => {
      handleError({ error })
    }
  })

  return { mutate, isPending, error }
}

export const useDeleteExpenseMutation = (id: string) => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => expenseApi.deleteExpense(id),
    onSuccess: () => {
      ToastifyCommon.success('Xóa chi tiêu thành công')
      queryClient.invalidateQueries({ queryKey: mutationKeys.getExpenses })
    },
    onError: (error) => {
      handleError({ error })
    }
  })

  return { mutate, isPending, error }
}
