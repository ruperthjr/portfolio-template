<script lang="ts">
    import { onMount } from 'svelte';
    import ProjectCard from '$lib/ProjectCard.svelte';
    import { projects } from '$lib/utils/projects';

    let scrollContainer: HTMLElement;
    let isTouchDevice = false;

    onMount(() => {
        isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (!isTouchDevice) {
            const handleWheel = (e: WheelEvent) => {
                if (scrollContainer) {
                    e.preventDefault();
                    scrollContainer.scrollLeft += e.deltaY;
                }
            };
            window.addEventListener('wheel', handleWheel, { passive: false });
            return () => window.removeEventListener('wheel', handleWheel);
        }
    });
</script>

<svelte:head>
    <title>Portfolio | Your Name</title>
    <meta name="description" content="Selected works spanning AI/ML, full-stack development, and mobile applications." />
</svelte:head>

<div class="fixed inset-0 flex items-center overflow-hidden bg-neutral-50 dark:bg-neutral-950">
    <div
        bind:this={scrollContainer}
        class="flex h-full w-full items-center gap-4 overflow-x-auto px-4 pb-8 pt-20 scrollbar-hide sm:gap-6 sm:px-6 sm:pb-10 sm:pt-24 md:gap-8 md:px-8 md:pb-12 md:pt-28 lg:gap-16 lg:px-[10vw] lg:pt-32 xl:px-[20vw]"
        role="region"
        aria-label="Project carousel"
    >
        <div class="flex-shrink-0">
            <h1 class="text-4xl font-black writing-vertical-rl rotate-180 text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl dark:text-white">
                WORK
            </h1>
        </div>

        {#each projects as project, i}
            <ProjectCard {project} index={i} />
        {/each}

        <div class="flex-shrink-0 w-4 sm:w-8 md:w-12 lg:w-[10vw] xl:w-[20vw]"></div>
    </div>
</div>

{#if isTouchDevice}
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none" aria-hidden="true">
        <div class="bg-neutral-900/80 text-white px-4 py-2 rounded-full text-xs font-mono backdrop-blur-sm dark:bg-white/80 dark:text-neutral-900">
            ← SWIPE TO NAVIGATE →
        </div>
    </div>
{:else}
    <div class="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none" aria-hidden="true">
        <div class="bg-neutral-900/80 text-white px-4 py-2 rounded-full text-xs font-mono backdrop-blur-sm dark:bg-white/80 dark:text-neutral-900">
            ← SCROLL TO NAVIGATE →
        </div>
    </div>
{/if}

<style>
    .writing-vertical-rl {
        writing-mode: vertical-rl;
    }
</style>