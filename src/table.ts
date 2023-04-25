import { logger } from '.'
import { writeFileSync, mkdirSync } from 'fs'
import { Emoji } from './types'

export default (data: Map<string, Emoji[]>) => {
    const groups = [
        '# Emoji Coverage'
    ]

    for (const group of data) {
        const groupMd = [
            `## ${group[0]}\n`,
            [ 'Codepoint', 'Shortcode', 'Emoji', 'Emoticons', 'Alternates', 'Mutant' ].join(' | '),
            [ '---', '---', '---', '---', '---', '---' ].join(' | '),
        ]

        for (const emoji of group[1]) {
            const alternates = emoji.alternates.map(alternate => {
                return `\`${alternate.map(component => component.toString(16).padStart(4, '0').toUpperCase()).join('-')}\``
            }).join(', ')

            groupMd.push([
                `\`${emoji.codepoint.toString(16).padStart(4, '0').toUpperCase()}\``,
                emoji.shortcodes.join(', '),
                String.fromCodePoint(emoji.codepoint),
                emoji.emoticons.join(', '),
                alternates || '-',
                emoji.mutantNames ? emoji.mutantNames.join(', ') : '-',
            ].join(' | '))
        }

        groups.push(groupMd.join('\n'))
    }

    mkdirSync('./out', { recursive: true })
    writeFileSync('./out/coverage.md', groups.join('\n\n'))

    logger.done('Wrote table to ./out/coverage.md')
}
