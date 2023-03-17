import {
  cashInFeeCalculator,
  cashOutJuridicalFeeCalculator,
  cashOutNaturalFeeCalculator,
} from '../../helpers/feeCalculators.mjs'

describe('cashInFeeCalculator', () => {
  it('calculates the correct fee when amount is below the maximum', () => {
    const cashInConfig = {
      percents: 0.5,
      max: { amount: 5 },
    }
    const amount = 10
    const expectedFee = (0.5 / 100) * amount
    const result = cashInFeeCalculator(amount, cashInConfig)
    expect(result).toEqual(expectedFee)
  })

  it('calculates the correct fee for big amount', () => {
    const cashInConfig = {
      percents: 0.5,
      max: { amount: 5 },
    }
    const amount = 10000000
    const expectedFee = cashInConfig.max.amount
    const result = cashInFeeCalculator(amount, cashInConfig)
    expect(result).toEqual(expectedFee)
  })

  it('calculates the correct fee when percents is zero', () => {
    const cashInConfig = {
      percents: 0,
      max: { amount: 10 },
    }
    const amount = 100
    const expectedFee = 0
    const result = cashInFeeCalculator(amount, cashInConfig)
    expect(result).toEqual(expectedFee)
  })

  it('calculates the correct fee when percents is 100', () => {
    const cashInConfig = {
      percents: 100,
      max: { amount: 10 },
    }
    const amount = 100
    const expectedFee = cashInConfig.max.amount
    const result = cashInFeeCalculator(amount, cashInConfig)
    expect(result).toEqual(expectedFee)
  })
})

describe('cashOutJuridicalFeeCalculator', () => {
  const config = {
    percents: 0.5,
    min: {
      amount: 50,
    },
  }

  it('should return the minimum fee when the calculated fee is lower than the minimum', () => {
    const amount = 100
    const result = cashOutJuridicalFeeCalculator(amount, config)
    expect(result).toEqual(50)
  })

  it('should calculate the fee correctly when the calculated fee is higher than the minimum', () => {
    const amount = 200000000

    const expectedFee = (config.percents / 100) * amount
    const result = cashOutJuridicalFeeCalculator(amount, config)
    expect(result).toEqual(expectedFee)
  })
})

describe('cashOutNaturalFeeCalculator', () => {
  const date = new Date('2022-03-15')
  const user_id = 123
  const amount = 1000

  const cashOutNaturalTrackInfo = {}
  const cashOutNaturalConfig = {
    week_limit: { amount: 1000 },
    percents: 0.3,
  }

  it('calculates fee and updates cashOutNaturalTrackInfo correctly when leftFeeFreeAmount is undefined', () => {
    const operation = { amount }
    const result = cashOutNaturalFeeCalculator(
      { date, user_id, operation },
      cashOutNaturalTrackInfo,
      cashOutNaturalConfig
    )

    expect(result.fee).toEqual(0)
    expect(result.cashOutNaturalTrackInfo[`${user_id}_2022_11`]).toEqual(
      cashOutNaturalConfig.week_limit.amount - amount
    )
  })

  it('calculates fee and updates cashOutNaturalTrackInfo correctly when amount > leftFeeFreeAmount', () => {
    const operation = { amount: 1500 }
    cashOutNaturalTrackInfo[`${user_id}_2022_11`] = 500

    const result = cashOutNaturalFeeCalculator(
      { date, user_id, operation },
      cashOutNaturalTrackInfo,
      cashOutNaturalConfig
    )

    expect(result.fee).toEqual(
      (cashOutNaturalConfig.percents / 100)*(
        operation.amount - cashOutNaturalTrackInfo[`${user_id}_2022_11`]
      )
    )
    expect(result.cashOutNaturalTrackInfo[`${user_id}_2022_11`]).toEqual(0)
  })

  it('calculates fee and updates cashOutNaturalTrackInfo correctly when amount = leftFeeFreeAmount', () => {
    const operation = { amount: 1000 }
    cashOutNaturalTrackInfo[`${user_id}_2022_11`] = 1000

    const result = cashOutNaturalFeeCalculator(
      { date, user_id, operation },
      cashOutNaturalTrackInfo,
      cashOutNaturalConfig
    )

    expect(result.fee).toEqual(0)
    expect(result.cashOutNaturalTrackInfo[`${user_id}_2022_11`]).toEqual(0)
  })

  it('calculates fee and updates cashOutNaturalTrackInfo correctly when amount < leftFeeFreeAmount', () => {
    const operation = { amount: 500 }
    cashOutNaturalTrackInfo[`${user_id}_2022_11`] = 1000

    const result = cashOutNaturalFeeCalculator(
      { date, user_id, operation },
      cashOutNaturalTrackInfo,
      cashOutNaturalConfig
    )

    expect(result.fee).toEqual(0)
    expect(result.cashOutNaturalTrackInfo[`${user_id}_2022_11`]).toEqual(500)
  })
})
