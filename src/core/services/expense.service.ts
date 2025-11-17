import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { ExpenseRequest, ExpenseResponse } from '@/models/interface/expense.interface'
import { FilterParams } from '@/models/interface/filter-params.interface'

const API_EXPENSE_URL = '/expenses'

export const expenseApi = {
  getExpenses(params?: FilterParams): Promise<ListResponse<ExpenseResponse>> {
    return axiosClient.get(API_EXPENSE_URL, { params })
  },
  getExpenseById(id: string): Promise<ExpenseResponse> {
    return axiosClient.get(`${API_EXPENSE_URL}/${id}`)
  },
  createExpense(params: ExpenseRequest) {
    return axiosClient.post(API_EXPENSE_URL, params)
  },
  updateExpense(id: string, params: Partial<ExpenseRequest>) {
    return axiosClient.put(`${API_EXPENSE_URL}/${id}`, params)
  },
  deleteExpense(id: string) {
    return axiosClient.delete(`${API_EXPENSE_URL}/${id}`)
  },
  getTotalExpensesByMonth(monthlyId: string) {
    return axiosClient.get(`${API_EXPENSE_URL}/total-expenses-by-month?monthlyId=${monthlyId}`)
  }
}
