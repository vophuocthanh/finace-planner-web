import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { MonthlyPersonIncomeResponse } from '@/models/interface/person-income.interface'

const API_MONTHLY = '/monthlies'

export const monthlyService = {
  getMonthly(): Promise<ListResponse<MonthlyPersonIncomeResponse>> {
    return axiosClient.get(API_MONTHLY)
  }
}
