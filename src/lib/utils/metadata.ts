import type { SEOConfig } from '$lib/types/site';

export function generateMetaTags(seo: SEOConfig): string {
    const tags: string[] = [];
    
    tags.push(`<title>${seo.title}</title>`);
    tags.push(`<meta name="description" content="${seo.description}" />`);
    tags.push(`<meta name="author" content="${seo.author || 'Ruperth Nyagesoa'}" />`);
    tags.push(`<meta name="robots" content="${seo.robots || 'index, follow'}" />`);
    
    if (seo.canonical) {
        tags.push(`<link rel="canonical" href="${seo.canonical}" />`);
    }
    
    if (seo.openGraph) {
        const og = seo.openGraph;
        tags.push(`<meta property="og:type" content="${og.type}" />`);
        tags.push(`<meta property="og:title" content="${og.title}" />`);
        tags.push(`<meta property="og:description" content="${og.description}" />`);
        if (og.image) tags.push(`<meta property="og:image" content="${og.image}" />`);
        if (og.url) tags.push(`<meta property="og:url" content="${og.url}" />`);
        if (og.siteName) tags.push(`<meta property="og:site_name" content="${og.siteName}" />`);
    }
    
    if (seo.twitter) {
        const tw = seo.twitter;
        tags.push(`<meta name="twitter:card" content="${tw.card}" />`);
        tags.push(`<meta name="twitter:title" content="${tw.title}" />`);
        tags.push(`<meta name="twitter:description" content="${tw.description}" />`);
        if (tw.site) tags.push(`<meta name="twitter:site" content="${tw.site}" />`);
        if (tw.creator) tags.push(`<meta name="twitter:creator" content="${tw.creator}" />`);
        if (tw.image) tags.push(`<meta name="twitter:image" content="${tw.image}" />`);
    }
    
    return tags.join('\n    ');
}

export function generateOpenGraph(
    title: string,
    description: string,
    url: string,
    image?: string,
    type: 'website' | 'article' = 'website'
) {
    return {
        type,
        title,
        description,
        url,
        image,
        siteName: 'RUPERTHJR'
    };
}

export function generateTwitterCard(
    title: string,
    description: string,
    image?: string
) {
    return {
        card: 'summary_large_image' as const,
        site: '@ruperthjr',
        creator: '@ruperthjr',
        title,
        description,
        image
    };
}