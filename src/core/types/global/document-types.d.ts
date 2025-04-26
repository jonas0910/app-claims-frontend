interface DocumentTypesBase {
  name: string
  character_count: number
  abreviation: string
}

export interface DocumentTypes extends DocumentTypesBase {
  id: number
  created_at: string
  updated_at: string
}

export interface DocumentTypesGet extends DocumentTypesBase {
  id: number
  abreviation: string
}
