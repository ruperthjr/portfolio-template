export interface ProjectDetails {
    overview?: string;
    features?: string[];
    challenges?: string[];
    learnings?: string[];
}

export interface Project {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    tech?: string[];
    year: string;
    status?: 'Live' | 'In Progress' | 'Completed' | 'Archive';
    link?: string;
    external?: boolean;
    github?: string;
    featured?: boolean;
    details?: ProjectDetails;
}

export const projects: Project[] = [
    {
        slug: 'project-1',
        title: 'Project One',
        description: 'A brief description of Project One.',
        tags: ['Tag1', 'Tag2'],
        tech: ['Tech1', 'Tech2'],
        year: '2023',
        status: 'Live',
        link: 'https://example.com/project-one',
        external: true,
        github: 'https://github.com/example/project-one'
    },
];

export const getFeaturedProjects = (): Project[] => {
    return projects.filter((p) => p.featured);
};

export const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find((p) => p.slug === slug);
};