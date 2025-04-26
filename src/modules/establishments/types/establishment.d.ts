import { Claim } from "../../claims-list/types/claim"

interface EstablishmentBase {
  name: string
  custom_link: string
  type_address: string
  code: string
  address: string
  department: string
  province: string
  district: string
  zip_code: string
  web_page: string
  user_id: number
  //provider_id: string
}

export interface Establishment extends EstablishmentBase {
  id: number
  created_at: string
  updated_at: string
}

export interface EstablishmentGet extends EstablishmentBase {
  id: number
  claims: Claim[]
}

export interface EstablishmentPostPut extends EstablishmentBase {}


export interface EstablishmentWithCompany {
  establishment: EstablishmentGet
  user: User
}