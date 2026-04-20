export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    content?: any;
    readingTime?: number;
}

export const fetchPosts = async (): Promise<BlogPost[]> => {
    const allPostFiles = import.meta.glob('$lib/posts/*.md');
    const iterablePostFiles = Object.entries(allPostFiles);

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const { metadata } = (await resolver()) as any;
            const slug = path.split('/').pop()?.slice(0, -3) ?? '';
            return { slug, ...metadata };
        })
    );

    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getFeaturedPost = (posts: BlogPost[]): BlogPost | null => {
    if (posts.length === 0) return null;
    return posts[0];
};

export const getRelatedPosts = (currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] => {
    const currentTags = new Set(currentPost.tags);
    
    const postsWithScores = allPosts
        .filter(post => post.slug !== currentPost.slug)
        .map(post => {
            const matchingTags = post.tags.filter(tag => currentTags.has(tag)).length;
            return { post, score: matchingTags };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
        });

    const related = postsWithScores.slice(0, limit).map(({ post }) => post);
    
    if (related.length < limit) {
        const remaining = allPosts
            .filter(post => post.slug !== currentPost.slug && !related.includes(post))
            .slice(0, limit - related.length);
        related.push(...remaining);
    }
    
    return related;
};

export const getPostsByTag = async (tag: string): Promise<BlogPost[]> => {
    const posts = await fetchPosts();
    return posts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
};

export const getAllTags = async (): Promise<string[]> => {
    const posts = await fetchPosts();
    const tagsSet = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tagsSet.add(tag)));
    return Array.from(tagsSet).sort();
};