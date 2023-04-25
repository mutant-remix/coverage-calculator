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
            codepoint: emoji.base[0],
            shortcodes: emoji.shortcodes,
            emoticons: emoji.emoticons,
            alternates: emoji.alternates,
            mutantNames: null
        }

        group.push(item)
    })

    groups.set(unicodeGroup.group, group)
})

// Parse mutantRemix data
let mutantRemix = new Map()

interface MutantEmoji {
    code: number[],
    src: string
}

JSON.parse(files.mutantRemix).forEach((emoji: MutantEmoji) => {
    [ ...emoji.code ].forEach(code => {
        const name = emoji.src.split('/').pop()?.replace('.svg', '')

        if (mutantRemix.has(code)) {
            const item = mutantRemix.get(code)
            if (!item.includes(name)) item.push(name)
            mutantRemix.set(code, item)
        } else {
            mutantRemix.set(code, [ name ])
        }
    })
})

// Merge data
for (const [ group, emojis ] of groups) {
    for (const emoji of emojis) {
        if (mutantRemix.has(emoji.codepoint)) {
            emoji.mutantNames = mutantRemix.get(emoji.codepoint)
        }
    }
}

// Calculate coverage
const unicodeTotal = Array.from(groups)
    .reduce((total, group) => total + group[1].length, 0)
const mutantUnicodeOverlap = Array.from(groups)
    .reduce((total, group) => total + group[1].filter(emoji => emoji.mutantNames).length, 0)

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
