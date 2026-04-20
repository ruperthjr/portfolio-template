<script lang="ts">
    import { Footer } from '$lib';
    import ReadingProgress from '$lib/ReadingProgress.svelte';
    import { getRelatedPosts } from '$lib/utils/blog';
    import { calculateReadingTime } from '$lib/utils/reading-time';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    let { data } = $props<{ data: any }>();

    let relatedPosts = $derived(getRelatedPosts(data.meta, data.allPosts || []));
    let readingTime = $derived(calculateReadingTime(data.meta.description));
    let copied = $state(false);

    let shareUrl = $derived($page.url.toString());

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareOnTwitter = () => {
        const text = `${data.meta.title} by @ruperthjr`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
    };

    const shareOnLinkedIn = () => {
        const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=600');
    };

    onMount(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                copyToClipboard();
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    });
</script>

<svelte:head>
    <title>{data.meta.title} | Ruperth Nyagesoa</title>
    <meta name="description" content={data.meta.description} />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
    <meta property="og:url" content={shareUrl} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={data.meta.title} />
    <meta name="twitter:description" content={data.meta.description} />
</svelte:head>

<ReadingProgress />

<div class="min-h-screen bg-neutral-50 px-4 pt-24 pb-12 dark:bg-neutral-950 sm:px-6 sm:pt-28 md:px-8 md:pt-32">
    <div class="mx-auto max-w-4xl">
        <header class="mb-12 border-b-4 border-neutral-900 pb-6 dark:border-white sm:mb-16 sm:pb-8">
            <div class="mb-6 flex flex-wrap items-center gap-3 sm:mb-8 sm:gap-4">
                <a href="/blogs" class="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 px-2.5 py-1 transition-colors border border-neutral-900 dark:border-white sm:px-3 sm:text-sm" aria-label="Back to blog index">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Index
                </a>
                <div class="flex flex-wrap items-center gap-2 font-mono text-xs opacity-50">
                    <time>{data.meta.date}</time>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                </div>
            </div>

            <div class="mb-4 flex flex-wrap gap-2 sm:mb-6">
                {#each data.meta.tags as tag}
                    <a href="/blogs?tag={tag}" class="border border-neutral-900 px-2.5 py-1 font-mono text-xs uppercase tracking-wider hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors sm:px-3">
                        #{tag}
                    </a>
                {/each}
            </div>

            <h1 class="text-3xl font-black uppercase leading-none tracking-tighter text-neutral-900 font-display dark:text-white mb-6 sm:text-4xl sm:mb-8 md:text-5xl lg:text-6xl xl:text-7xl">
                {data.meta.title}
            </h1>

            <p class="font-mono text-sm leading-relaxed opacity-70 max-w-2xl sm:text-base md:text-lg">
                {data.meta.description}
            </p>
        </header>

        <article class="prose prose-neutral prose-sm max-w-none dark:prose-invert sm:prose-base lg:prose-lg prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black prose-p:font-sans prose-p:leading-relaxed prose-a:text-neutral-900 prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:bg-neutral-900 hover:prose-a:text-white dark:prose-a:text-white dark:hover:prose-a:bg-white dark:hover:prose-a:text-neutral-900 prose-code:font-mono prose-code:bg-neutral-100 dark:prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:bg-neutral-900 dark:prose-pre:bg-neutral-950 prose-pre:border-2 prose-pre:border-neutral-900 dark:prose-pre:border-white prose-pre:overflow-x-auto prose-blockquote:border-l-4 prose-blockquote:border-neutral-900 dark:prose-blockquote:border-white prose-blockquote:font-serif prose-blockquote:italic prose-img:border-2 prose-img:border-neutral-900 dark:prose-img:border-white prose-img:w-full prose-hr:border-neutral-900 dark:prose-hr:border-white prose-hr:border-2 prose-ul:list-none prose-ul:pl-0 prose-li:pl-6 prose-li:relative prose-li:before:content-['//'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:font-mono prose-li:before:opacity-50">
            {#if data.content}
                {@const Content = data.content}
                <Content />
            {/if}
        </article>

        <div class="mt-12 border-t-2 border-neutral-900 pt-6 dark:border-white sm:mt-16 sm:pt-8">
            <div class="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <p class="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Share this</p>
                    <div class="flex flex-wrap gap-2">
                        <button onclick={shareOnTwitter} class="border border-neutral-900 px-3 py-1.5 font-mono text-xs uppercase hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors sm:px-4 sm:py-2" aria-label="Share on Twitter">
                            Twitter
                        </button>
                        <button onclick={shareOnLinkedIn} class="border border-neutral-900 px-3 py-1.5 font-mono text-xs uppercase hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors sm:px-4 sm:py-2" aria-label="Share on LinkedIn">
                            LinkedIn
                        </button>
                        <button onclick={copyToClipboard} class="border border-neutral-900 px-3 py-1.5 font-mono text-xs uppercase hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors sm:px-4 sm:py-2" aria-label="Copy link">
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                    </div>
                </div>
                <div class="text-left md:text-right">
                    <p class="font-mono text-xs uppercase tracking-widest opacity-50 mb-2">Keyboard</p>
                    <kbd class="border border-neutral-900 px-2 py-1 font-mono text-xs dark:border-white">⌘K</kbd>
                    <span class="font-mono text-xs ml-2 opacity-50">to copy link</span>
                </div>
            </div>
        </div>

        {#if relatedPosts.length > 0}
            <div class="mt-12 border-t-4 border-neutral-900 pt-8 dark:border-white sm:mt-16 sm:pt-12">
                <h2 class="font-display text-2xl font-black uppercase tracking-tighter mb-6 sm:text-3xl sm:mb-8">
                    Related Entries
                </h2>
                <div class="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {#each relatedPosts as post}
                        <a href="/blogs/{post.slug}" class="group border-2 border-neutral-900 bg-neutral-50 p-5 transition-all hover:bg-neutral-900 hover:text-white dark:border-white dark:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-900 sm:p-6">
                            <div class="mb-3 flex items-center gap-2 font-mono text-xs opacity-50">
                                <time>{post.date}</time>
                                <span>•</span>
                                <span>{post.tags[0]}</span>
                            </div>
                            <h3 class="font-display text-lg font-bold uppercase leading-tight tracking-tighter mb-2 sm:text-xl sm:mb-3">
                                {post.title}
                            </h3>
                            <p class="font-mono text-xs leading-relaxed opacity-70 line-clamp-2">
                                {post.description}
                            </p>
                            <div class="mt-3 font-mono text-xs uppercase tracking-widest group-hover:underline sm:mt-4">
                                Read →
                            </div>
                        </a>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>
<Footer />