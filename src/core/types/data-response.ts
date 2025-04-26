export type DataResponse<T = undefined> = {
  data?: T
  message?: string
  success: boolean
}
