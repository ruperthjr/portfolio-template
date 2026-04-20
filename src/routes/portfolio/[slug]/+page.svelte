<script lang="ts">
    import { Footer } from '$lib';
    import { page } from '$app/stores';
    import type { Project } from '$lib/utils/projects';

    let { data } = $props<{ data: { project: Project } }>();
    let copied = $state(false);

    const shareUrl = $derived($page.url.toString());

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };
</script>

<svelte:head>
    <title>{data.project.title} | Ruperth Nyagesoa</title>
    <meta name="description" content={data.project.description} />
    <meta property="og:title" content={data.project.title} />
    <meta property="og:description" content={data.project.description} />
    <meta property="og:url" content={shareUrl} />
    <meta property="og:type" content="article" />
</svelte:head>

<div class="min-h-screen bg-neutral-50 px-4 pt-24 md:pt-32 pb-12 dark:bg-neutral-950 sm:px-8">
    <div class="mx-auto max-w-5xl">
        <header class="mb-16 border-b-4 border-neutral-900 pb-8 dark:border-white">
            <div class="mb-8 flex flex-wrap items-center gap-4">
                <a href="/portfolio" class="group inline-flex items-center gap-2 border border-neutral-900 px-3 py-1 font-mono text-sm uppercase tracking-widest transition-colors hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900" aria-label="Back to portfolio">
                    <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Portfolio
                </a>
                <div class="flex flex-wrap items-center gap-2 font-mono text-xs opacity-50">
                    <span>{data.project.year}</span>
                    {#if data.project.status}
                        <span>•</span>
                        <span>{data.project.status}</span>
                    {/if}
                </div>
            </div>

            <div class="mb-6 flex flex-wrap gap-2">
                {#each data.project.tags as tag}
                    <span class="border border-neutral-900 px-3 py-1 font-mono text-xs uppercase tracking-wider dark:border-white">
                        {tag}
                    </span>
                {/each}
            </div>

            <h1 class="mb-8 font-display text-4xl font-black uppercase leading-none tracking-tighter text-neutral-900 dark:text-white sm:text-5xl md:text-7xl">
                {data.project.title}
            </h1>

            <p class="max-w-2xl font-mono text-base leading-relaxed opacity-70 md:text-lg">
                {data.project.description}
            </p>
        </header>

        <div class="space-y-12 md:space-y-16">
            <section>
                <h2 class="mb-6 font-display text-3xl font-black uppercase tracking-tighter md:text-4xl">Tech Stack</h2>
                <div class="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    {#each data.project.tech || [] as tech}
                        <div class="border-2 border-neutral-900 bg-white p-4 text-center font-mono text-sm uppercase tracking-wide dark:border-white dark:bg-neutral-950">
                            {tech}
                        </div>
                    {/each}
                </div>
            </section>

            <section class="border-t-4 border-neutral-900 pt-12 dark:border-white">
                <h2 class="mb-6 font-display text-3xl font-black uppercase tracking-tighter md:text-4xl">Project Details</h2>
                <div class="prose prose-neutral prose-lg max-w-none dark:prose-invert">
                    <div class="space-y-6 font-sans leading-relaxed">
                        {#if data.project.details?.overview}
                            <h3 class="font-display text-2xl font-bold uppercase tracking-tight">Overview</h3>
                            <p>{data.project.details.overview}</p>
                        {/if}

                        {#if data.project.details?.features}
                            <h3 class="font-display text-2xl font-bold uppercase tracking-tight">Key Features</h3>
                            <ul class="space-y-2">
                                {#each data.project.details.features as feature}
                                    <li>{feature}</li>
                                {/each}
                            </ul>
                        {/if}

                        {#if data.project.details?.challenges}
                            <h3 class="font-display text-2xl font-bold uppercase tracking-tight">Technical Challenges</h3>
                            <ul class="space-y-2">
                                {#each data.project.details.challenges as challenge}
                                    <li>{challenge}</li>
                                {/each}
                            </ul>
                        {/if}

                        {#if data.project.details?.learnings}
                            <h3 class="font-display text-2xl font-bold uppercase tracking-tight">What I Learned</h3>
                            <ul class="space-y-2">
                                {#each data.project.details.learnings as learning}
                                    <li>{learning}</li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                </div>
            </section>

            <section class="border-t-4 border-neutral-900 pt-12 dark:border-white">
                <h2 class="mb-6 font-display text-3xl font-black uppercase tracking-tighter md:text-4xl">Links</h2>
                <div class="flex flex-col gap-3 sm:flex-row">
                    {#if data.project.github}
                        <a href={data.project.github} target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center gap-3 border-2 border-neutral-900 bg-neutral-900 px-6 py-4 font-mono text-sm uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-neutral-900 dark:border-white dark:bg-white dark:text-neutral-900 dark:hover:bg-transparent dark:hover:text-white" aria-label="View source code on GitHub">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                    {/if}
                    {#if data.project.link}
                        <a href={data.project.link} target="_blank" rel="noopener noreferrer" class="group flex items-center justify-center gap-3 border-2 border-neutral-900 px-6 py-4 font-mono text-sm uppercase tracking-widest transition-all hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900" aria-label="Visit live project">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Live Project
                        </a>
                    {/if}
                    <button onclick={copyToClipboard} class="flex items-center justify-center gap-3 border-2 border-neutral-900 px-6 py-4 font-mono text-sm uppercase tracking-widest transition-all hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900" aria-label="Copy share link">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </section>
        </div>
    </div>
</div>
<Footer />