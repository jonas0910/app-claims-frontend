interface CurrencyTypesBase {
  abbreviation: string
  status: boolean
  name: string
  symbol: string
  exchange_rate: string
}

export interface CurrencyType extends CurrencyTypesBase {
  id: number
  created_at: string
  updated_at: string
}
