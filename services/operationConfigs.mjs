import fetch from 'node-fetch'
import { OPERATIONS_API } from '../api/operations.api.mjs'

export function getCashInConfigs() {
  return fetch(OPERATIONS_API.cacheInConfig)
    .then((res) => res.json())
    .catch(() => null)
}

export function getCashOutNaturalConfigs() {
  return fetch(OPERATIONS_API.cacheOutNaturalConfig)
    .then((res) => res.json())
    .catch(() => null)
}

export function getCashOutJuridicalConfigs() {
  return fetch(OPERATIONS_API.cacheOutJuridicalConfig)
    .then((res) => res.json())
    .catch(() => null)
}
