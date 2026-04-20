<script lang="ts">
	import type { Project } from '$lib/utils/projects';

	let { project, index } = $props<{ project: Project; index: number }>();
</script>

<a
	href={project.link || `/portfolio/${project.slug}`}
	class="group relative flex h-[60vh] w-[90vw] flex-shrink-0 flex-col justify-between border-2 border-neutral-900 bg-white p-4 transition-all hover:bg-neutral-900 hover:text-white sm:h-[55vh] sm:w-[80vw] sm:p-6 md:h-[60vh] md:w-[60vw] md:p-8 lg:w-[45vw] xl:w-[40vw] dark:border-white dark:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-900"
	target={project.external ? '_blank' : undefined}
	rel={project.external ? 'noopener noreferrer' : undefined}
>
	<div class="flex justify-between border-b-2 border-current pb-3 sm:pb-4">
		<span class="font-mono text-base sm:text-lg md:text-xl">
			{String(index + 1).padStart(2, '0')}
		</span>
		<div class="flex items-center gap-3">
			{#if project.status}
				<span class="font-mono text-xs uppercase tracking-wider opacity-70">{project.status}</span>
			{/if}
			<span class="font-mono text-base sm:text-lg md:text-xl">{project.year}</span>
		</div>
	</div>

	<div class="space-y-3 sm:space-y-4">
		<h2
			class="font-display text-3xl font-bold uppercase leading-none tracking-tighter sm:text-4xl md:text-5xl"
		>
			{project.title}
		</h2>
		<p class="max-w-md font-mono text-xs leading-relaxed opacity-70 sm:text-sm md:text-base">
			{project.description}
		</p>
		{#if project.tech && project.tech.length > 0}
			<div class="flex flex-wrap gap-1 pt-2">
				{#each project.tech as tech}
					<span
						class="rounded-sm bg-current/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider sm:text-[10px]"
					>
						{tech}
					</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="flex flex-wrap gap-1.5 sm:gap-2">
		{#each project.tags as tag}
			<span
				class="border border-current px-2 py-1 font-mono text-[9px] uppercase tracking-widest sm:text-[10px] md:px-3 md:text-xs"
			>
				{tag}
			</span>
		{/each}
	</div>

	{#if project.external}
		<div class="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
			<svg
				class="h-5 w-5 sm:h-6 sm:w-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
				/>
			</svg>
		</div>
	{/if}
</a>