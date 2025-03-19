export interface PersonIncomeResponse {
  id?: string
  description?: string
  amount?: number
  createAt?: string
  monthlyId?: string
  categoryId?: string
}

export interface PersonIncomeRequest {
  description: string
  amount: number
  monthlyId: string
  categoryId: string
}
