import {
  getCashInConfigs,
  getCashOutJuridicalConfigs,
  getCashOutNaturalConfigs,
} from '../services/operationConfigs.mjs'

export function getOperationConfigs() {
  return Promise.allSettled([
    getCashInConfigs(),
    getCashOutNaturalConfigs(),
    getCashOutJuridicalConfigs(),
  ]).then((results) => ({
    cash_in: results[0].value,
    cash_out_natural: results[1].value,
    cash_out_juridical: results[2].value,
  }))
}
