export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFD')                   // Decompose diacritics
        .replace(/[\u0300-\u036f]/g, '')    // Remove diacritics
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')               // Replace spaces with -
        .replace(/[^\w\-]+/g, '')           // Remove all non-word chars
        .replace(/\-\-+/g, '-')             // Replace multiple - with single -
        .replace(/^-+/, '')                 // Trim - from start
        .replace(/-+$/, '');                // Trim - from end
}

export function deslugify(slug: string): string {
    return slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function createUniqueSlug(title: string, existingSlugs: string[]): string {
    let slug = slugify(title);
    let counter = 1;
    
    while (existingSlugs.includes(slug)) {
        slug = `${slugify(title)}-${counter}`;
        counter++;
    }
    
    return slug;
}