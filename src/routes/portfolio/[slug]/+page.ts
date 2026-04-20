import { error } from '@sveltejs/kit';
import { getProjectBySlug } from '$lib/utils/projects';

export const load = async ({ params }: { params: { slug: string } }) => {
    const project = getProjectBySlug(params.slug);
    if (!project) throw error(404, `Project not found: ${params.slug}`);
    return { project };
};