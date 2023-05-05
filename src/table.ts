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
            [ 'Codepoint', 'Shortcode', 'Emoji', 'Mutant Remix' ].join(' | '),
            [ '---', '---', '---', '---' ].join(' | '),
        ]

        for (const emoji of group[1]) {
            const src = emoji.mutant?.src.replace(']', '%5D').replace('[', '%5B').replace(/\s/g, '%20')

            groupMd.push([
                `[\`${emoji.codepoint}\`](https://emojipedia.org/search/?q=${emoji.codepoint})` +
                (emoji.alternates.length > 0 ? ` + ${emoji.alternates.length}` : ''),
                emoji.shortcodes.map(shortcode => `\`${shortcode}\``).join(', '),
                emoji.codepoint.split('-').map(chunk => String.fromCodePoint(parseInt(chunk, 16))).join(''),
                emoji.mutant ? `[${emoji.mutant.shortcode}](https://github.com/mutant-remix/assets/tree/master/svg/${src})` : '❌',
            ].join(' | '))
        }

        groups.push(groupMd.join('\n'))
    }

    mkdirSync('./out', { recursive: true })
    writeFileSync('./out/coverage.md', groups.join('\n\n'))

    logger.done('Wrote table to ./out/coverage.md')
}
