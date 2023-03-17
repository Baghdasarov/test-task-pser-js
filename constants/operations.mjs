export const CASH_IN_CONFIG = {
  percents: 0.03,
  max: { amount: 5, currency: 'EUR' },
}

export const CASH_OUT_NATURAL_CONFIG = {
  percents: 0.3,
  week_limit: { amount: 1000, currency: 'EUR' },
}

export const CASH_OUT_JURIDICAL_CONFIG = {
  percents: 0.3,
  min: { amount: 0.5, currency: 'EUR' },
}

export const OPERATION_TYPES = {
  cash_in: 'cash_in',
  cash_out: 'cash_out',
}

export const USER_TYPES = {
  natural: 'natural',
  juridical: 'juridical',
}
