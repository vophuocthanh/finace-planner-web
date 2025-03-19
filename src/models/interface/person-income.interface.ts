import { UserResponse } from '@/models/interface/user.interface'

export interface PersonIncomeResponse {
  id?: string
  userId?: string
  categoryId?: string
  amount?: number
  description?: string
  createAt?: string
  updateAt?: string
  monthlyId?: string
  category?: CategoryPersonIncomeResponse
  monthly?: MonthlyPersonIncomeResponse
  user?: UserResponse
}

export interface CategoryPersonIncomeResponse {
  id?: string
  name?: string
  type?: string
}

export interface MonthlyPersonIncomeResponse {
  id?: string
  nameMonth?: string
  yearly?: YearlyPersonIncomeResponse
}

export interface YearlyPersonIncomeResponse {
  id?: string
  userId?: string
  year?: number
  createAt?: string
  updateAt?: string
}

export interface PersonIncomeRequest {
  description: string
  amount: number
  monthlyId: string
  categoryId: string
}
