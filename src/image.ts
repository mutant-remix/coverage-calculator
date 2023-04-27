import { logger } from '.'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { CoverageData } from './types'

export default async (data: CoverageData) => {
    const baseSvg = readFileSync('./src/base_coverage.svg', 'utf8')

    const svg = baseSvg
        .replace('${missing}', data.coverage.mutantMissing.toString())
        .replace('${satisfied}', data.coverage.mutantSatisfied.toString())
        .replace('${progress}', (data.coverage.satisfiedPercentage * 1.95).toString())

    mkdirSync('./out', { recursive: true })
    writeFileSync('./out/coverage.svg', svg)

    logger.done('Wrote svg to ./out/coverage.svg')
}
