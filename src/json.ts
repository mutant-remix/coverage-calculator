import { logger } from '.'
import { writeFileSync, mkdirSync } from 'fs'
import { CoverageData } from './types'

export default (data: CoverageData) => {
    const json = JSON.stringify(data.coverage, undefined, 4)

    mkdirSync('./out', { recursive: true })
    writeFileSync('./out/coverage.json', json)

    logger.done('Wrote json to ./out/coverage.json')
}
