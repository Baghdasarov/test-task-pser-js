import { operationsFeesCalculator } from './helpers/operationsFeesCalculator.mjs'
import { parseJsonFile } from './helpers/jsonParser.mjs'
import { getOperationConfigs } from './helpers/syncConfigs.mjs'

const inputFilePath = process.argv[2]

try {
  const operations = parseJsonFile(inputFilePath)
  const operationsConfig = await getOperationConfigs()

  const fees = operationsFeesCalculator(operations, operationsConfig)
  fees.forEach((fee) => console.log(fee))
} catch (err) {
  console.error(err.message)
}
