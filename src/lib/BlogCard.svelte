<script lang="ts">
	import type { BlogPost } from '$lib/utils/blog';
	import { formatDate } from '$lib/utils/date';
	import { calculateReadingTime } from '$lib/utils/reading-time';

	let { post, featured = false } = $props<{ post: BlogPost; featured?: boolean }>();
</script>

<a
	href="/blogs/{post.slug}"
	class="group relative flex flex-col justify-between bg-neutral-50 transition-all dark:bg-neutral-950 {featured
		? 'col-span-full min-h-[400px] border-4 border-neutral-900 p-6 hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 sm:min-h-[450px] sm:p-8 md:min-h-[500px] md:p-10 lg:p-12'
		: 'min-h-[320px] border-2 border-neutral-900 p-5 hover:bg-neutral-900 hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-neutral-900 sm:min-h-[360px] sm:p-6 md:min-h-[400px] md:p-8'}"
>
	{#if featured}
		<div class="absolute -top-3 left-4 bg-neutral-900 px-3 py-1 font-mono text-xs uppercase tracking-widest text-white dark:bg-white dark:text-neutral-900 sm:-top-4 sm:left-6 sm:px-4 md:left-8">
			Featured Post
		</div>
	{/if}

	<div class="flex flex-col gap-2 border-b border-current pb-3 opacity-50 sm:flex-row sm:justify-between sm:pb-4">
		<time class="font-mono text-xs sm:text-sm">{formatDate(post.date)}</time>
		<div class="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
			<span class="font-mono text-xs">{calculateReadingTime(post.description)} min read</span>
			<div class="flex flex-wrap gap-2">
				{#each post.tags.slice(0, featured ? 3 : 2) as tag}
					<span class="font-mono text-xs uppercase">#{tag}</span>
				{/each}
			</div>
		</div>
	</div>

	<div class="my-auto py-4 sm:py-6">
		<h2
			class="font-display font-bold uppercase leading-tight tracking-tighter {featured
				? 'mb-4 text-3xl sm:text-4xl sm:mb-5 md:text-5xl md:mb-6 lg:text-6xl xl:text-7xl'
				: 'mb-3 text-2xl sm:text-3xl sm:mb-4 md:text-4xl'}"
		>
			{post.title}
		</h2>
		<p
			class="font-mono leading-relaxed opacity-70 {featured
				? 'text-sm sm:text-base md:text-lg'
				: 'line-clamp-3 text-xs sm:text-sm'}"
		>
			{post.description}
		</p>
	</div>

	<div class="flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between sm:pt-4">
		<div class="flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-50">
			<span>Published</span>
			<span class="hidden h-[1px] w-8 bg-current sm:block md:w-12"></span>
			<time>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</time>
		</div>
		<span class="font-mono text-xs uppercase tracking-widest group-hover:underline">
			Read Entry →
		</span>
	</div>
</a>