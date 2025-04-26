import { getAllCurrencyTypes } from '@/core/actions/global/currency-types'
import { _getAllCurrencyTypes } from '@/core/services/global/currency-types'
import { useQuery } from '@tanstack/react-query'

export const useCurrencyTypes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['global', 'currency-types', 'all'],
    // queryFn: () => getAllCurrencyTypes(),
    queryFn: _getAllCurrencyTypes,
    staleTime: 1000 * 60 * 60 // 1 hora
  })

  // const currencyTypesToSelect = data?.data?.map((currencyType) => ({
  //   value: currencyType.id,
  //   label: currencyType.name
  // }))

  const currencyTypesToSelect = data?.map((currencyType) => ({
    value: currencyType.id,
    label: currencyType.name
  }))

  const getCurrencyName = (currencyTypeId: number) => {
    return currencyTypesToSelect?.find(
      (currency) => currency.value === currencyTypeId
    )?.label
  }

  return {
    currencyTypes: data,
    currencyTypesToSelect,
    isLoading,
    getCurrencyName
  }
}
