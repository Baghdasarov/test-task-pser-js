import { getUtcYearAndWeekNumber, roundToTop } from './utils.mjs'

export function cashInFeeCalculator(amount, cashInConfig) {
  const roundedFee = roundToTop((amount * cashInConfig.percents) / 100)
  return Math.min(roundedFee, cashInConfig.max.amount)
}

export function cashOutJuridicalFeeCalculator(amount, cashOutJuridicalConfig) {
  const roundedFee = roundToTop((amount * cashOutJuridicalConfig.percents) / 100)
  return Math.max(roundedFee, cashOutJuridicalConfig.min.amount)
}

export function cashOutNaturalFeeCalculator(
  { date, user_id, operation: { amount } },
  cashOutNaturalTrackInfo,
  cashOutNaturalConfig
) {
  let fee = 0

  const { year, weekNumber } = getUtcYearAndWeekNumber(date)

  let leftFeeFreeAmount =
    cashOutNaturalTrackInfo[`${user_id}_${year}_${weekNumber}`]

  if (leftFeeFreeAmount === undefined) {
    leftFeeFreeAmount = cashOutNaturalConfig.week_limit.amount
  }

  if (amount > leftFeeFreeAmount) {
    fee = roundToTop(
      ((amount - leftFeeFreeAmount) * cashOutNaturalConfig.percents) / 100
    )
    leftFeeFreeAmount = 0
  } else if (amount === leftFeeFreeAmount) {
    fee = 0
    leftFeeFreeAmount = 0
  } else if (amount < leftFeeFreeAmount) {
    fee = 0
    leftFeeFreeAmount -= amount
  }

  return {
    fee,
    cashOutNaturalTrackInfo: {
      ...cashOutNaturalTrackInfo,
      [`${user_id}_${year}_${weekNumber}`]: leftFeeFreeAmount,
    },
  }
}
