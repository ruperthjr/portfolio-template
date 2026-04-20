export function truncate(text: string, maxLength: number, suffix: string = '...'): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - suffix.length).trim() + suffix;
}

export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text: string): string {
    return text
        .split(' ')
        .map(word => capitalize(word))
        .join(' ');
}

export function excerpt(text: string, maxLength: number = 160): string {
    if (text.length <= maxLength) return text;
    
    // Use DOMParser to properly strip HTML tags
    if (typeof document !== 'undefined') {
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const plainText = doc.body.textContent || '';
        if (plainText.length <= maxLength) return plainText;
        
        // Try to break at a sentence
        const sentences = plainText.match(/[^.!?]+[.!?]+/g);
        if (sentences) {
            let result = '';
            for (const sentence of sentences) {
                if ((result + sentence).length <= maxLength) {
                    result += sentence;
                } else {
                    break;
                }
            }
            if (result.length > 0) return result.trim();
        }
        
        const lastSpace = plainText.slice(0, maxLength).lastIndexOf(' ');
        return lastSpace > 0 
            ? plainText.slice(0, lastSpace) + '...' 
            : plainText.slice(0, maxLength) + '...';
    }
    
    // Fallback for server-side
    const stripped = text.replace(/<[^>]*>/g, '');
    if (stripped.length <= maxLength) return stripped;
    const lastSpace = stripped.slice(0, maxLength).lastIndexOf(' ');
    return lastSpace > 0 
        ? stripped.slice(0, lastSpace) + '...' 
        : stripped.slice(0, maxLength) + '...';
}

export function stripHtml(html: string): string {
    if (typeof document !== 'undefined') {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    }
    return html.replace(/<[^>]*>/g, '');
}

export function wordCount(text: string): number {
    return text.trim().split(/\s+/).length;
}