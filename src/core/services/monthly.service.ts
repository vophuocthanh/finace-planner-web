import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { FilterParams } from '@/models/interface/filter-params.interface'
import { MonthlyPersonIncomeResponse } from '@/models/interface/person-income.interface'

const API_MONTHLY = '/monthlies'

export const monthlyService = {
  getMonthly(params: FilterParams): Promise<ListResponse<MonthlyPersonIncomeResponse>> {
    return axiosClient.get(API_MONTHLY, { params })
  }
}
