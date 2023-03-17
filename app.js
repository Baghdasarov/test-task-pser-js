import { parseJsonFile } from './src/helpers/jsonParser.mjs'
import { getOperationConfigs } from './src/helpers/syncConfigs.mjs'
import { operationsFeesCalculator } from './src/helpers/operationsFeesCalculator.mjs'

const inputFilePath = process.argv[2]

try {
  const operations = parseJsonFile(inputFilePath)
  const operationsConfig = await getOperationConfigs()

  const fees = operationsFeesCalculator(operations, operationsConfig)
  fees.forEach((fee) => console.log(fee))
} catch (err) {
  console.error(err.message)
}
