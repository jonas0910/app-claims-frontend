/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Login {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  token: string
  token_expires_at: string
  user: UserAuth 
}

export interface UserAuth {
  id: number
  name: string
  email: string
  email_verified_at: string
  company_id: string
  super_admin: number // estaba como string
  created_at: string
  updated_at: string
  modules: UserAuthModule[]
}

export interface UserAuthModule {
  id: number
  name: string
  description: string
  status: number
  created_at: any
  updated_at: any
  pivot: Pivot
}

export interface Pivot {
  user_id: string
  module_id: string
}

export interface CompanyAuth {
  id: number
  pass_fact?: string
  user_fact?: string
  trade_name: string
  fiscal_address: string
  company_email: string
  is_active: number
  facebook_url: string
  payment_method: string
  img_url: string
  instagram_url: string
  corporate_name: string
  ruc: string
  phone: string
  tiktok_url: string
  twitter_url: string
  ubigeo: string
  urbanization: string
  youtube_url: string
  mode_send: number
  created_at: string
  updated_at: string
  modules: CompanyAuthModule[]
}

export interface CompanyAuthModule {
  id: number
  name: string
  description: string
  status: number
  created_at: any
  updated_at: any
  pivot: Pivot2
}

export interface Pivot2 {
  company_id: string
  module_id: string
}
