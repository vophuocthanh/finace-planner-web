import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { FilterParams } from '@/models/interface/filter-params.interface'
import { SavingRequest, SavingResponse } from '@/models/interface/savings.interface'

const API_SAVING_URL = '/savings'

export const savingApi = {
  getSavings(params: FilterParams): Promise<ListResponse<SavingResponse>> {
    return axiosClient.get(API_SAVING_URL, { params })
  },
  getSavingById(id: string): Promise<SavingResponse> {
    return axiosClient.get(`${API_SAVING_URL}/${id}`)
  },
  createSaving(params: SavingRequest) {
    return axiosClient.post(API_SAVING_URL, params)
  },
  updateSaving(id: string, params: Partial<SavingRequest>) {
    return axiosClient.put(`${API_SAVING_URL}/${id}`, params)
  },
  deleteSaving(id: string) {
    return axiosClient.delete(`${API_SAVING_URL}/${id}`)
  }
}
