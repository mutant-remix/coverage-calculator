import Log75, { LogLevel } from 'log75'
export const logger = new Log75(LogLevel.Debug)

logger.info('Parsing data')
import data from './data'

logger.info('Generating table')
import table from './table'
table(data.groups)

logger.info('Generating image')
import image from './image'
image(data)

logger.info('Generating json')
import json from './json'
json(data)

logger.done('Done')

logger.info(`
Unique in mutant ${data.coverage.mutantUnique}
Total in unicode ${data.coverage.unicodeTotal}

Satisfied        ${data.coverage.mutantSatisfied}
Missing          ${data.coverage.mutantMissing}
Coverage         ${data.coverage.satisfiedPercentage}%
`)
