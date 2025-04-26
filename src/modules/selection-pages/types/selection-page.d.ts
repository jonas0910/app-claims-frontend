interface SelectionPageBase {
  custom_link: string
  brand_name: string | undefined
  logo_url: string
  user_id: number
}

export interface SelectionPage extends SelectionPageBase {
  id: number
  created_at: string
  updated_at: string
  establishments: Establishment[] // Relación con establecimientos
}

export interface SelectionPageGet extends SelectionPageBase {
  id: number
  establishments: Establishment[]
}

export interface SelectionPagePostPut extends SelectionPageBase {
  establishments?: number[] | undefined
}

export interface SelectionPageWithCompany {
  page: SelectionPageGet
  user: User
}
