export type Paginate<T> = {
  readonly data: T
  readonly links: PaginateLink
  readonly meta: PaginateMeta
}

type PaginateLink = {
  readonly first: string
  readonly last: string
  readonly next: string
  readonly prev: string
}

type PaginateMeta = {
  readonly current_page: number
  readonly from: number
  readonly last_page: number
  readonly path: string
  readonly per_page: string
  readonly to: number
  readonly total: number
}
