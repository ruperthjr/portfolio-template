import { fetchPosts, getFeaturedPost } from '$lib/utils/blog';

export const load = async () => {
    const posts = await fetchPosts();
    const featured = getFeaturedPost(posts);
    return { posts, featured };
};