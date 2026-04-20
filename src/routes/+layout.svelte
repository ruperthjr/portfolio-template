<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';
    import { ThemeToggle } from '$lib';
    import { onMount } from 'svelte';

    let innerWidth = 0;
    let innerHeight = 0;
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<svelte:head>
    <!-- Favicons consolidated here; removed from app.html to avoid duplication -->
    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
    <link rel="shortcut icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="manifest" href="/favicon/site.webmanifest" />
</svelte:head>

<a href="#main-content" class="skip-link">
    Skip to main content
</a>

<div class="pointer-events-none fixed inset-0 z-50 border-4 sm:border-6 md:border-8 lg:border-[12px] border-neutral-200 transition-colors duration-300 dark:border-neutral-900"></div>

<div class="fixed top-2 left-2 z-40 mix-blend-difference sm:top-3 sm:left-3 md:top-4 md:left-4 lg:top-8 lg:left-8">
    <a href="/" class="font-mono text-sm font-bold tracking-tighter text-white transition-opacity hover:opacity-50 sm:text-base md:text-lg lg:text-xl" aria-label="Homepage, Name">
        PORTFOLIO
    </a>
</div>

<div class="fixed top-2 right-2 z-40 flex gap-2 font-mono text-[10px] text-white mix-blend-difference sm:top-3 sm:right-3 sm:gap-3 sm:text-xs md:top-4 md:right-4 md:gap-4 lg:top-8 lg:right-8 lg:gap-6 lg:text-sm">
    <a href="/portfolio" class="decoration-2 underline-offset-2 sm:underline-offset-4 hover:underline" aria-label="View portfolio">WORK</a>
    <a href="/blogs" class="decoration-2 underline-offset-2 sm:underline-offset-4 hover:underline" aria-label="Read blog">THOUGHTS</a>
    <a href="/resume" class="decoration-2 underline-offset-2 sm:underline-offset-4 hover:underline" aria-label="View resume">PROFILE</a>
</div>

<div class="fixed bottom-2 left-2 z-40 font-mono text-[9px] text-white mix-blend-difference sm:bottom-3 sm:left-3 sm:text-[10px] md:bottom-4 md:left-4 lg:bottom-8 lg:left-8 lg:text-xs">
    <span class="opacity-50" aria-hidden="true">LOC:</span>
    <span aria-label="Current page location">{$page.url.pathname === '/' ? 'INDEX' : $page.url.pathname.toUpperCase().slice(1)}</span>
</div>

<div class="pointer-events-auto fixed right-2 bottom-2 z-40 flex items-center gap-2 sm:right-3 sm:bottom-3 sm:gap-3 md:right-4 md:bottom-4 md:gap-4 lg:right-6 lg:bottom-6">
    <ThemeToggle />
</div>

<main id="main-content" class="relative min-h-screen w-full overflow-x-hidden px-4 pt-20 pb-12 sm:px-6 sm:pt-24 sm:pb-14 md:px-8 md:pt-28 md:pb-16 lg:pt-32 selection:bg-white selection:text-black">
    <slot />
</main>

<style>
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px 16px;
        z-index: 100;
        transition: top 0.2s;
        text-decoration: none;
    }
    .skip-link:focus {
        top: 0;
    }
</style>