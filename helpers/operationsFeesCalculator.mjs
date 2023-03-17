import {
  CASH_IN_CONFIG,
  CASH_OUT_NATURAL_CONFIG,
  CASH_OUT_JURIDICAL_CONFIG,
  OPERATION_TYPES,
  USER_TYPES,
} from '../constants/operations.mjs'
import {
  cashInFeeCalculator,
  cashOutJuridicalFeeCalculator,
  cashOutNaturalFeeCalculator,
} from './feeCalculators.mjs'

export function operationsFeesCalculator(transactions, config) {
  const cashInConfig = config.cash_in ?? CASH_IN_CONFIG

  const cashOutNaturalConfig =
    config.cash_out_natural ?? CASH_OUT_NATURAL_CONFIG

  const cashOutJuridicalConfig =
    config.cash_out_juridical ?? CASH_OUT_JURIDICAL_CONFIG

  let cashOutNaturalTrackInfo = {}

  const fees = []

  transactions.forEach((transaction) => {
    const {
      user_type,
      type,
      operation: { amount },
    } = transaction
    let fee = 0

    //Cash In operations
    if (type === OPERATION_TYPES.cash_in) {
      fee = cashInFeeCalculator(amount, cashInConfig)
    }

    //Cash Out operations
    if (type === OPERATION_TYPES.cash_out) {
      //For juridical users
      if (user_type === USER_TYPES.juridical) {
        fee = cashOutJuridicalFeeCalculator(amount, cashOutJuridicalConfig)
      }

      //For natural users
      if (user_type === USER_TYPES.natural) {
        const result = cashOutNaturalFeeCalculator(
          transaction,
          cashOutNaturalTrackInfo,
          cashOutNaturalConfig
        )

        fee = result.fee
        cashOutNaturalTrackInfo = result.cashOutNaturalTrackInfo
      }
    }

    fees.push(fee.toFixed(2))
  })

  return fees
}
