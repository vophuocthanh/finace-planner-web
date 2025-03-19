import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { FilterParams } from '@/models/interface/filter-params.interface'
import { PersonIncomeRequest, PersonIncomeResponse } from '@/models/interface/person-income.interface'

const API_PERSON_INCOME_URL = '/personal-incomes'

export const personIncomeApi = {
  getPersonIncomes(params: FilterParams): Promise<ListResponse<PersonIncomeResponse>> {
    return axiosClient.get(API_PERSON_INCOME_URL, { params })
  },
  getPersonIncomeById(id: string): Promise<PersonIncomeResponse> {
    return axiosClient.get(`${API_PERSON_INCOME_URL}/${id}`)
  },
  createPersonIncome(params: PersonIncomeRequest) {
    return axiosClient.post(API_PERSON_INCOME_URL, params)
  },
  updatePersonIncome(id: string, params: Partial<PersonIncomeRequest>) {
    return axiosClient.put(`${API_PERSON_INCOME_URL}/${id}`, params)
  },
  deletePersonIncome(id: string) {
    return axiosClient.delete(`${API_PERSON_INCOME_URL}/${id}`)
  }
}
