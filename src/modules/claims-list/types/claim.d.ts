import { Establishment } from '../../establishments/types/establishment'
import { Category } from '../../categories/types/category'
import { DocumentTypes } from '@/core/types/global/document-types'
import { CurrencyType } from '@/core/types/global/currency-types'
import { User } from '@/core/types/global/user'

interface ClaimBase {
  name: string
  under_age: boolean
  parent_name: string
  document_type_id: number
  document_number: string
  email: string
  phone: string
  type_asset: string
  description_asset: string
  currency_type_id: number
  claim_mount: number
  claim_type: string
  claim_text: string
  request_text: string

  establishment_id: number
  numeration: number
  claim_code: string
  state: string

  answer_date: string
  answer: string
  email_contact_date: string
  phone_contact_date: string
  internal_notes: string
  created_at: string
  user: User
  establishment: Establishment
  document_type: DocumentTypes
  currency_type: CurrencyType
}

export type Claim = ClaimBase

export interface ClaimGet extends ClaimBase {
  id: number
  categories: Category[]
  updated_at: string
}

export interface ClaimPut {
  answer: string | null
  email_contact_date: string | null
  phone_contact_date: string | null
  internal_notes: string | null
  categories: number[]
  user_id: number
}

export interface ClaimPost {
  name: string
  under_age: boolean
  parent_name: string
  document_type_id: number
  document_number: string
  email: string
  phone: string
  type_asset: string
  description_asset: string
  currency_type_id: number
  claim_mount: number
  claim_type: string
  claim_text: string
  request_text: string

  establishment_id: number
  user_id: number
}
