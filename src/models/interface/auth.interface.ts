// define the Login interface
export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
}

// define the Account interface
export interface Account {
  email: string
  password: string
  name?: string
  phone?: string
  confirmPassword?: string
}

// define the RegisterReponse interface
export interface RegisterReponse {
  message: string
}

export interface VerifyEmailReq {
  email: string
  verificationCode: string
}

export interface VerifyEmailRes {
  message: string
}

export interface User {
  id: string
  email: string
  name: string
  phone: string
  role: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}
