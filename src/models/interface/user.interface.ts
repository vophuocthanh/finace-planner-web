export interface UserResponseType {
  id: string
  name: string
  email: string
  role: string
}

export interface UserResponse {
  id: string
  email: string
  phone?: string
  address?: string
  avatar?: string
  name: string
  date_of_birth?: string
  country?: string
  createAt: string
  updateAt: string
  verificationCode?: string
  verificationCodeExpiresAt?: string
  isVerified: boolean
  role: RoleResponse
}

export interface UserRequest {
  phone?: string
  address?: string
  name: string
  date_of_birth?: string
  country?: string
}

export interface RoleResponse {
  id: string
  name: string
}
export interface UpdateRoleRequest {
  roleId: string
}
