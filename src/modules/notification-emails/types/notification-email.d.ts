import { Company } from '@/core/types/admin/company'
import { Establishment } from '../../establishments/types/establishment'

interface NotificationEmailBase {
  email: string
  user_id: number
  establishment_id: number | null
  verified: boolean
  //provider_id: string
}

export interface NotificationEmail extends NotificationEmailBase {
  id: number
  created_at: string
  updated_at: string
}

export interface NotificationEmailGet extends NotificationEmailBase {
    id: number
    verification_code: string
    establishment: Establishment
}

export interface NotificationEmailPostPut extends NotificationEmailBase {}
