import { axiosInstance } from '@/core/config/axios'
import { CurrencyType } from '@/core/types/global/currency-types'

interface ApiResponse<T> {
  success: boolean
  data: T
}

export const _getAllCurrencyTypes = async () => {
  const { data: results } = await axiosInstance.get('/currency-types')
  const { data: currencyTypes } = results as ApiResponse<CurrencyType[]>
  return currencyTypes
}

export const _getCurrencyTypeById = async ({ id }: { id: number }) => {
  if (!id) return {} as CurrencyType

  const { data: result } = await axiosInstance.get(`/currency-types/${id}`)
  const { data: currencyType } = result as ApiResponse<CurrencyType>
  return currencyType
}
