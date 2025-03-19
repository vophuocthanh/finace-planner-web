export interface SavingResponse {
  id?: string
  goal?: string
  amount?: number
  createAt?: string
  monthlyId?: string
}

export interface SavingRequest {
  goal: string
  amount: number
  monthlyId: string
}
