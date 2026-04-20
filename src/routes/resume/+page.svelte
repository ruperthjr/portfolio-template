<script lang="ts">
    import { Footer } from '$lib';
    import { fade, fly } from 'svelte/transition';
    import { skillCategories, education, certifications } from '$lib/data/resume';

    let activeTab = $state('Education');
    const tabs = ['Education', 'Skills'];
</script>

<svelte:head>
    <title>Resume | Your Name</title>
    <meta name="description" content="Professional experience and skills." />
</svelte:head>

<div class="flex min-h-screen flex-col">
    <div class="container mx-auto flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <header class="mb-8 sm:mb-10 lg:mb-12">
            <div class="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-12">
                <div class="text-left lg:w-1/3">
                    <h1 class="mb-3 text-3xl font-bold tracking-tighter text-neutral-900 font-display sm:mb-4 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl dark:text-white">
                        First Name Second Name
                    </h1>
                    <p class="text-sm text-neutral-600 sm:text-base lg:text-lg dark:text-neutral-400">
                        Download formal resume
                        <a href="" class="text-slate-600 hover:underline underline-offset-2 dark:text-slate-400" target="_blank" rel="noopener noreferrer">here</a>.
                    </p>
                </div>
                <div class="flex items-center justify-center lg:w-2/3">
                    <h3 class="text-center font-serif text-lg leading-relaxed text-neutral-800 italic sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl dark:text-neutral-200">
                        "QUOTE"
                        <span class="mt-2 block text-sm font-normal text-neutral-500 not-italic sm:text-base dark:text-neutral-400">- Name</span>
                    </h3>
                </div>
            </div>
        </header>

        <div class="mb-8 flex justify-center sm:mb-10 lg:mb-12">
            <div class="relative inline-flex w-full max-w-md rounded-full bg-neutral-200 p-1 dark:bg-neutral-800" role="tablist">
                {#each tabs as tab}
                    <button
                        onclick={() => (activeTab = tab)}
                        class="relative z-10 flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-200 focus:outline-none sm:px-4 sm:py-2 sm:text-sm md:px-6 {activeTab === tab ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200'}"
                        role="tab"
                        aria-selected={activeTab === tab}
                        aria-controls="{tab.toLowerCase()}-panel"
                    >
                        {tab}
                        {#if activeTab === tab}
                            <div class="absolute inset-0 -z-10 rounded-full bg-white shadow-sm transition-all duration-300 dark:bg-neutral-700" in:fade={{ duration: 200 }}></div>
                        {/if}
                    </button>
                {/each}
            </div>
        </div>

        <div class="mx-auto max-w-4xl transition-all duration-300">
            {#if activeTab === 'Education'}
                <div id="education-panel" role="tabpanel" in:fly={{ y: 20, duration: 300, delay: 100 }} out:fade={{ duration: 100 }} class="space-y-8 sm:space-y-10 lg:space-y-12">
                    <section>
                        <h2 class="mb-6 text-2xl font-bold text-neutral-900 font-display sm:mb-8 sm:text-3xl dark:text-white">Education</h2>
                        <div class="space-y-4 sm:space-y-6 lg:space-y-8">
                            {#each education as edu}
                                <div class="rounded-2xl border border-white/20 bg-white/40 p-4 backdrop-blur-md sm:p-6 lg:p-8 dark:border-white/10 dark:bg-white/5">
                                    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                        <div>
                                            <h3 class="text-base font-bold text-neutral-900 font-display sm:text-lg lg:text-xl dark:text-white">{edu.school}</h3>
                                            <p class="text-sm text-slate-600 sm:text-base dark:text-slate-400">{edu.degree}</p>
                                        </div>
                                        <div class="text-left text-xs text-neutral-500 sm:text-right sm:text-sm dark:text-neutral-400">
                                            {#if edu.date}<p>{edu.date}</p>{/if}
                                            <p>{edu.location}</p>
                                        </div>
                                    </div>
                                    {#if edu.details.length > 0}
                                        <ul class="mt-3 list-disc pl-4 text-xs text-neutral-600 sm:mt-4 sm:text-sm dark:text-neutral-400">
                                            {#each edu.details as detail}
                                                <li>{detail}</li>
                                            {/each}
                                        </ul>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                    </section>
                    <section>
                        <h2 class="mb-6 text-2xl font-bold text-neutral-900 font-display sm:mb-8 sm:text-3xl dark:text-white">Certifications</h2>
                        <div class="rounded-2xl border border-white/20 bg-white/40 p-4 backdrop-blur-md sm:p-6 lg:p-8 dark:border-white/10 dark:bg-white/5">
                            <div class="space-y-3">
                                {#each certifications as cert}
                                    <div class="flex items-start justify-between gap-4 border-b border-neutral-200 pb-2 last:border-0 dark:border-neutral-800">
                                        <div>
                                            <p class="text-sm font-medium text-neutral-900 sm:text-base dark:text-white">{cert.name}</p>
                                            <p class="font-mono text-xs text-neutral-500 dark:text-neutral-400">{cert.platform}</p>
                                        </div>
                                        <span class="font-mono text-xs text-neutral-500 dark:text-neutral-400">{cert.year}</span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </section>
                </div>
            {:else if activeTab === 'Skills'}
                <div id="skills-panel" role="tabpanel" in:fly={{ y: 20, duration: 300, delay: 100 }} out:fade={{ duration: 100 }}>
                    <div class="space-y-4 sm:space-y-6">
                        {#each skillCategories as category}
                            <div class="rounded-2xl border border-white/20 bg-white/40 p-4 shadow-sm backdrop-blur-md sm:p-6 lg:p-8 dark:border-white/10 dark:bg-white/5">
                                <h2 class="mb-4 text-xl font-bold text-neutral-900 font-display sm:mb-6 sm:text-2xl dark:text-white">{category.name}</h2>
                                <div class="flex flex-wrap gap-2 sm:gap-3">
                                    {#each category.skills as skill}
                                        <span class="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-slate-100 hover:text-slate-700 sm:px-4 sm:py-2 sm:text-sm md:text-base dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-slate-900/30 dark:hover:text-slate-400">
                                            {skill}
                                        </span>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
    <Footer />
</div>