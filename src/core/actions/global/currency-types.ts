'use server'

import { axiosInstance } from '@/core/config/axios'
import { DataResponse } from '@/core/types/data-response'
import { CurrencyType } from '@/core/types/global/currency-types'

const CURRENCY_TYPE_URL = '/currency-types'

export const getAllCurrencyTypes = async (): Promise<
  DataResponse<CurrencyType[]>
> => {
  //   aun no tiene esta estructura
    const res = await axiosInstance.get(CURRENCY_TYPE_URL)
    return res.data
  
}
// export const getAllCurrencyTypes = async () => {
//   const { data: results } = await axiosInstance.get('/currency-types')
//   const { data: currencyTypes } = results as {
//     data: CurrencyType[]
//     success: boolean
//   }
//   return currencyTypes
// }

export const getCurrencyTypeById = async ({ id }: { id: number }) => {
  if (!id) {
    return {} as CurrencyType
  }

  const { data: result } = await axiosInstance.get(`/currency-types/${id}`)
  const { data: currencyType } = result as {
    data: CurrencyType
    success: boolean
  }

  return currencyType
}
