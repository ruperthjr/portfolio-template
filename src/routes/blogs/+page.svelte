<script lang="ts">
    import type { PageData } from './$types';
    import { Footer } from '$lib';
    import BlogCard from '$lib/BlogCard.svelte';
    import { getFeaturedPost } from '$lib/utils/blog';

    let { data } = $props<{ data: PageData }>();

    let searchQuery = $state('');
    let selectedTag = $state<string | null>(null);

    let allTags = $derived(Array.from(new Set(data.posts.flatMap((post) => post.tags))).sort());

    let filteredPosts = $derived(
        data.posts.filter((post) => {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
                post.title.toLowerCase().includes(query) ||
                post.description.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query));
            const matchesTag = !selectedTag || post.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        })
    );

    let featuredPost = $derived(getFeaturedPost(data.posts));
</script>

<svelte:head>
    <title>Blog | Your Name</title>
    <meta name="description" content="Exploring the complexities of being, becoming, and belonging through technology, philosophy, and experience." />
</svelte:head>

<div class="min-h-screen bg-neutral-50 px-4 pt-20 pb-12 dark:bg-neutral-950 sm:px-6 sm:pt-24 md:px-8 md:pt-28 lg:pt-32">
    <div class="mx-auto max-w-7xl">
        <header class="mb-12 border-b-4 border-neutral-900 pb-6 dark:border-white sm:mb-16 sm:pb-8 md:mb-20">
            <h1 class="text-4xl font-black uppercase tracking-tighter text-neutral-900 dark:text-white mb-4 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                BLOG TITLE
            </h1>
            <div class="mt-6 flex flex-col gap-4 sm:mt-8 sm:gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div class="max-w-2xl">
                    <p class="font-mono text-sm leading-relaxed opacity-70 mb-3 sm:text-base sm:mb-4 md:text-lg">
                      Blog description </p>
                    <div class="flex items-center gap-2 font-mono text-xs opacity-50">
                        <span>{data.posts.length} {data.posts.length === 1 ? 'entry' : 'entries'}</span>
                        <span>•</span>
                        <span>{allTags.length} {allTags.length === 1 ? 'topic' : 'topics'}</span>
                    </div>
                </div>
                <div class="w-full lg:w-auto lg:min-w-[320px] xl:min-w-[400px] space-y-3">
                    <label for="blog-search" class="sr-only">Search blog posts</label>
                    <input id="blog-search" type="text" bind:value={searchQuery} placeholder="SEARCH_INDEX..." class="w-full border-2 border-neutral-900 bg-transparent px-3 py-2.5 font-mono text-xs uppercase placeholder-neutral-500 focus:bg-neutral-900 focus:text-white focus:outline-none dark:border-white dark:placeholder-neutral-500 dark:focus:bg-white dark:focus:text-neutral-900 transition-colors sm:px-4 sm:py-3 sm:text-sm" />
                    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
                        <button onclick={() => (selectedTag = null)} class="border border-neutral-900 px-2.5 py-1 font-mono text-xs uppercase transition-colors dark:border-white sm:px-3 {selectedTag === null ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900'}" aria-pressed={selectedTag === null}>
                            All
                        </button>
                        {#each allTags.slice(0, 6) as tag}
                            <button onclick={() => (selectedTag = selectedTag === tag ? null : (tag as string))} class="border border-neutral-900 px-2.5 py-1 font-mono text-xs uppercase transition-colors dark:border-white sm:px-3 {selectedTag === tag ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' : 'hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900'}" aria-pressed={selectedTag === tag}>
                                #{tag}
                            </button>
                        {/each}
                    </div>
                </div>
            </div>
        </header>

        {#if featuredPost && !searchQuery && !selectedTag}
            <section class="mb-8 sm:mb-12">
                <div class="mb-4 flex items-center gap-3 sm:mb-6">
                    <h2 class="font-display text-xl font-bold uppercase tracking-tighter sm:text-2xl">Featured</h2>
                    <div class="h-[2px] flex-1 bg-neutral-900 dark:bg-white"></div>
                </div>
                <BlogCard post={featuredPost} featured={true} />
            </section>
        {/if}

        <section>
            {#if filteredPosts.length > 0}
                <div class="mb-4 flex items-center gap-3 sm:mb-6">
                    <h2 class="font-display text-xl font-bold uppercase tracking-tighter sm:text-2xl">
                        {searchQuery || selectedTag ? 'Results' : 'All Entries'}
                    </h2>
                    <div class="h-[2px] flex-1 bg-neutral-900 dark:bg-white"></div>
                    <span class="font-mono text-xs opacity-50 sm:text-sm">{filteredPosts.length}</span>
                </div>

                <div class="grid grid-cols-1 gap-px bg-neutral-900 border-2 border-neutral-900 dark:bg-white dark:border-white sm:grid-cols-2 lg:grid-cols-3">
                    {#each filteredPosts as post}
                        <BlogCard {post} />
                    {/each}
                </div>
            {:else}
                <div class="flex flex-col items-center justify-center py-16 text-center border-2 border-neutral-900 dark:border-white sm:py-24">
                    <div class="font-mono text-5xl opacity-20 mb-4 sm:text-6xl" aria-hidden="true">∅</div>
                    <p class="font-mono text-xs uppercase tracking-widest opacity-50 sm:text-sm">No entries found</p>
                    <button onclick={() => { searchQuery = ''; selectedTag = null; }} class="mt-4 border-2 border-neutral-900 px-4 py-2 font-mono text-xs uppercase hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 transition-colors sm:mt-6 sm:px-6">
                        Clear Filters
                    </button>
                </div>
            {/if}
        </section>
    </div>
</div>
<Footer />