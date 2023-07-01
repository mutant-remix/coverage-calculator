import { logger } from '..'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { CoverageData } from '../types'
import { Resvg } from '@resvg/resvg-js'

export default async (data: CoverageData) => {
    const baseSvg = readFileSync('./src/image/base_coverage.svg', 'utf8')

    mkdirSync('./out', { recursive: true })

    const svg = baseSvg
        .replace('${missing}', data.coverage.mutantMissing.toString())
        .replace('${satisfied}', data.coverage.mutantSatisfied.toString())
        .replace('${progress}', (data.coverage.satisfiedPercentage * 2.5).toString())

    writeFileSync('./out/coverage.svg', svg)
    logger.done('Wrote svg to ./out/coverage.svg')

    const resvg = new Resvg(svg, {
        fitTo: {
            mode: 'width',
            value: 2048,
        },
        font: {
            fontFiles: [
                './src/image/Barlow-Bold.ttf',
                './src/image/Barlow-ExtraBold.ttf',
            ],
            loadSystemFonts: false,
        },
    })
    const png = resvg.render().asPng()

    writeFileSync('./out/coverage.png', png)
    logger.done('Wrote png to ./out/coverage.png')
}
