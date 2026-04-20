<script>
	let { title, icon, description, redirect, next } = $props();
</script>

<a
	href="/{redirect}"
	class="group block h-full min-h-[280px] border-2 border-neutral-900 bg-neutral-50 p-6 transition-all duration-300 hover:bg-neutral-900 hover:text-white sm:min-h-[300px] sm:p-8 md:min-h-[320px] dark:border-white dark:bg-neutral-950 dark:hover:bg-white dark:hover:text-neutral-900"
>
	<div class="flex h-full flex-col justify-between gap-8 sm:gap-10 md:gap-12">
		<div class="flex justify-between items-start">
			<h2 class="text-2xl font-bold tracking-tighter font-display uppercase sm:text-3xl md:text-4xl">{title}</h2>
			<div class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 sm:h-7 sm:w-7 md:h-8 md:w-8">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter">
					<line x1="7" y1="17" x2="17" y2="7"></line>
					<polyline points="7 7 17 7 17 17"></polyline>
				</svg>
			</div>
		</div>
		
		<div>
			<p class="font-mono text-xs leading-relaxed opacity-70 mb-4 sm:text-sm sm:mb-5 md:mb-6">{description}</p>
			<div class="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest sm:text-xs">
				<span>[{next}]</span>
				<span class="block h-[1px] w-6 bg-current sm:w-8"></span>
			</div>
		</div>
	</div>
</a>