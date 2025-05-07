import axiosClient from '@/core/services/axios-client'
import { ListResponse } from '@/models/interface/app.interface'
import { FilterParams } from '@/models/interface/filter-params.interface'
import { RoleResponse, UpdateRoleRequest, UserRequest, UserResponse } from '@/models/interface/user.interface'

const API_USER_URL = '/user'
const API_USER_ME_URL = `${API_USER_URL}/me`
const API_ROLE_URL = '/role'

export const userApi = {
  getUsers(params?: FilterParams): Promise<ListResponse<UserResponse>> {
    return axiosClient.get(API_USER_URL, { params })
  },
  getUserMe(): Promise<UserResponse> {
    return axiosClient.get(API_USER_ME_URL)
  },
  getUserById(id: string): Promise<UserResponse> {
    return axiosClient.get(`${API_USER_URL}/${id}`)
  },
  updateUserMe(params: Partial<UserRequest>): Promise<UserResponse> {
    return axiosClient.put(API_USER_ME_URL, params)
  },
  updateRole(userId: string, data: UpdateRoleRequest, currentUserId: string) {
    const url = `${API_USER_URL}/${userId}/role`
    return axiosClient.put(url, data, { headers: { 'current-user-id': currentUserId } })
  },
  getRoles(): Promise<ListResponse<RoleResponse>> {
    return axiosClient.get(API_ROLE_URL)
  }
}
