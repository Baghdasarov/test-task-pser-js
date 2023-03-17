import fs from 'fs'

export function parseJsonFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    throw new Error(`Unable to parse JSON file at path: ${filePath}`)
  }
}
