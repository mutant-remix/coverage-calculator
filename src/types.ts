export interface Emoji {
    codepoint: number,
    alternates: number[][],
    shortcodes: string[],
    emoticons: string[],
    mutantNames: string[] | null,
}

export interface UnicodeEmoji {
    base: number[],
    alternates: number[][],
    emoticons: string[],
    shortcodes: string[],
    animated: boolean,
}

export interface UnicodeGroup {
    group: string,
    emoji: UnicodeEmoji[],
}

export interface CoverageData {
    groups: Map<string, Emoji[]>,
    coverage: {
        unicodeTotal: number,
        mutantUnique: number,
        mutantSatisfied: number,
        mutantMissing: number,
        satisfiedPercentage: number,
    },
}
