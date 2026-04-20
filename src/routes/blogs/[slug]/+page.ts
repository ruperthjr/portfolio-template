import { error } from '@sveltejs/kit';
import { fetchPosts } from '$lib/utils/blog';

export const load = async ({ params }: { params: { slug: string } }) => {
    try {
        const post = await import(`../../../lib/posts/${params.slug}.md`);
        const allPosts = await fetchPosts();
        return {
            content: post.default,
            meta: post.metadata,
            allPosts
        };
    } catch (e) {
        console.error('Error loading post:', e);
        throw error(404, `Post not found: ${params.slug}`);
    }
};