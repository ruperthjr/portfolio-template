<script lang="ts">
    import { StartNav, Footer } from '$lib';
    import { onMount } from 'svelte';

    let scrollY = $state(0);
    let innerHeight = $state(0);
    let innerWidth = $state(0);
    let showScrollIndicator = $state(true);
    let rafPending = false;

    onMount(() => {
        const handleScroll = () => {
            if (!rafPending) {
                requestAnimationFrame(() => {
                    scrollY = window.scrollY;
                    showScrollIndicator = scrollY < 100;
                    rafPending = false;
                });
                rafPending = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    });
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div class="relative min-h-[200vh]">
    <div class="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden px-4">
        <h1
            class="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] font-black leading-none tracking-tighter text-neutral-900 dark:text-white will-change-transform"
            style="--x: {-scrollY * 0.5}px; transform: translateX(var(--x))"
        >
            FIRST NAME
        </h1>
        <h1
            class="text-[12vw] sm:text-[10vw] md:text-[9vw] lg:text-[8vw] xl:text-[7vw] font-black leading-none tracking-tighter text-neutral-900 dark:text-white will-change-transform"
            style="--x: {scrollY * 0.5}px; transform: translateX(var(--x))"
        >
            LAST NAME
        </h1>
    </div>

    <div class="fixed top-1/2 left-0 w-full -translate-y-1/2 mix-blend-difference z-10 pointer-events-none opacity-50">
        <div class="whitespace-nowrap font-mono text-[10px] sm:text-xs md:text-sm tracking-widest text-white animate-marquee" aria-hidden="true">
            MACHINE LEARNING • SOFTWARE ENGINEERING • BUILDING • CHASING VALUE • MACHINE LEARNING • SOFTWARE ENGINEERING • BUILDING • CHASING VALUE • MACHINE LEARNING • SOFTWARE ENGINEERING • BUILDING • CHASING VALUE • MACHINE LEARNING • SOFTWARE ENGINEERING • BUILDING • CHASING VALUE
        </div>
    </div>

    {#if showScrollIndicator}
        <div 
            class="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style="opacity: {1 - (scrollY / 100)}"
            aria-hidden="true"
        >
            <div class="flex flex-col items-center gap-3 animate-bounce-slow">
                <div>
                    <div class="font-mono text-xs tracking-widest text-neutral-900 dark:text-white sm:text-sm">
                        SCROLL
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="h-8 w-[2px] bg-neutral-900 dark:bg-white animate-scroll-line"></div>
                    <svg class="w-4 h-4 text-neutral-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    </svg>
                </div>
            </div>
        </div>
    {/if}

    <div
        class="relative z-20 mt-[100vh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style="opacity: {Math.min(Math.max((scrollY - innerHeight * 0.25) / (innerHeight * 0.3), 0), 1)}"
    >
        <div class="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            <StartNav
                title="PORTFOLIO"
                description="Selected works and experiments."
                redirect="portfolio"
                next="VIEW WORK"
                icon="portfolio"
            />
            <StartNav
                title="BLOG"
                description="Thoughts on building things that matter. Or don't."
                redirect="blogs"
                next="READ POSTS"
                icon="blog"
            />
            <StartNav
                title="RESUME"
                description="Professional history and skills."
                redirect="resume"
                next="VIEW PROFILE"
                icon="resume"
            />
        </div>
    </div>
</div>

<style>
    .animate-marquee {
        animation: marquee 20s linear infinite;
    }
    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .animate-bounce-slow {
        animation: bounce-slow 2s ease-in-out infinite;
    }
    @keyframes bounce-slow {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    .animate-scroll-line {
        animation: scroll-line 2s ease-in-out infinite;
    }
    @keyframes scroll-line {
        0% { transform: scaleY(0); transform-origin: top; }
        50% { transform: scaleY(1); transform-origin: top; }
        51% { transform: scaleY(1); transform-origin: bottom; }
        100% { transform: scaleY(0); transform-origin: bottom; }
    }
</style>

<Footer />