const WORDS_PER_MINUTE = 200;

export function calculateReadingTime(content: string): number {
    if (!content || typeof content !== 'string') {
        return 1;
    }
    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
    return Math.max(1, minutes);
}

export function formatReadingTime(minutes: number): string {
    if (minutes < 1) return 'Less than a minute';
    if (minutes === 1) return '1 minute';
    return `${minutes} minutes`;
}

export function getReadingTimeText(content: string): string {
    const minutes = calculateReadingTime(content);
    return formatReadingTime(minutes);
}

export function getReadingSpeed(content: string): { wpm: number; words: number; minutes: number } {
    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const minutes = calculateReadingTime(content);
    return { wpm: WORDS_PER_MINUTE, words, minutes };
}