export interface ExpenseResponse {
  id?: string
  description?: string
  amount?: number
  createAt?: string
  monthlyId?: string
  categoryId?: string
}

export interface ExpenseRequest {
  description: string
  amount: number
  monthlyId: string
  categoryId: string
}
