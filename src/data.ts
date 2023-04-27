import { readFileSync } from 'fs'
import { logger } from '.'
import { Emoji, UnicodeEmoji, UnicodeGroup, CoverageData } from './types'

const files = {
    unicode: readFileSync('data/emoji_15_0_ordering.json', 'utf8'),
    mutantRemix: readFileSync('data/mtnt_test.json', 'utf8')
}

const groups: Map<string, Emoji[]> = new Map()

// Parse unicode data
JSON.parse(files.unicode).forEach((unicodeGroup: UnicodeGroup) => {
    const group: Emoji[] = []

    unicodeGroup.emoji.forEach((emoji: UnicodeEmoji) => {
        const item: Emoji = {
            codepoint: emoji.base.map(chunk => chunk.toString(16).padStart(4, '0')).join('-'),
            shortcodes: emoji.shortcodes,
            emoticons: emoji.emoticons,
            alternates: emoji.alternates.map(alternate => alternate.map(chunk => chunk.toString(16).padStart(4, '0')).join('-')),
            mutant: null
        }

        group.push(item)
    })

    groups.set(unicodeGroup.group, group)
})

// Parse mutantRemix data
interface MutantEmojiJson {
    code: number[] | string,
    src: string,
    short: string,
}

interface MutantEmoji {
    shortcode: string,
    src: string,
}

let mutantRemix: Map<string, MutantEmoji> = new Map()

for (const emojiJson of JSON.parse(files.mutantRemix)) {
    const emoji = emojiJson as MutantEmojiJson
    if (typeof emoji.code == 'string') continue;

    const code = emoji.code.map(chunk => chunk.toString(16).padStart(4, '0')).join('-')

    mutantRemix.set(code, {
        shortcode: emoji.short,
        src: emoji.src
    })
}

// Merge data
for (const [ group, emojis ] of groups) {
    for (const emoji of emojis) {
        const mutant = mutantRemix.get(emoji.codepoint)

        if (mutant) {
            emoji.mutant = {
                src: mutant.src,
                shortcode: mutant.shortcode,
            }
        }
    }
}

// Calculate coverage
const unicodeTotal = Array.from(groups)
    .reduce((total, group) => total + group[1].length, 0)
const mutantUnicodeOverlap = Array.from(groups)
    .reduce((total, group) => total + group[1].filter(emoji => emoji.mutant).length, 0)

export default {
    groups: groups,
    coverage: {
        mutantSatisfied: mutantUnicodeOverlap,
        mutantMissing: unicodeTotal - mutantUnicodeOverlap,
        mutantUnique: mutantRemix.size,
        unicodeTotal: unicodeTotal,
        satisfiedPercentage: Math.round(mutantUnicodeOverlap / unicodeTotal * 10000) / 100,
    }
} as CoverageData

logger.done('Parsing complete')
