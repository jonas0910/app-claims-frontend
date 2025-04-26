
interface CategoryClaimBase {
  name: string
  establishment_id: number | null
  user_id: number
  //provider_id: string
}

export interface CategoryClaim extends CategoryClaimBase {
  id: number
  created_at: string
  updated_at: string
}

export interface CategoryClaimGet extends CategoryClaimBase {
  id: number
  claims: Claim[]
  establishment: Establishment
}

export type CategoryClaimPostPut = CategoryClaimBase
