import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { FilterParams } from '@/models/interface/filter-params.interface'
import { CategoryPersonIncomeResponse } from '@/models/interface/person-income.interface'

const API_CATEGORIES = '/categories'

export const categoriesService = {
  getCategories(params: FilterParams): Promise<ListResponse<CategoryPersonIncomeResponse>> {
    return axiosClient.get(API_CATEGORIES, { params })
  }
}
