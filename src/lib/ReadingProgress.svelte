<script lang="ts">
	import { onMount } from 'svelte';

	let progress = $state(0);

	onMount(() => {
		const updateProgress = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollProgress = (scrollTop / docHeight) * 100;
			progress = Math.min(Math.max(scrollProgress, 0), 100);
		};

		window.addEventListener('scroll', updateProgress, { passive: true });
		updateProgress();

		return () => window.removeEventListener('scroll', updateProgress);
	});
</script>

<div
	class="fixed top-0 left-0 right-0 z-50 h-1 bg-neutral-200 dark:bg-neutral-800"
	role="progressbar"
	aria-valuenow={progress}
	aria-valuemin={0}
	aria-valuemax={100}
>
	<div
		class="h-full bg-neutral-900 transition-all duration-150 dark:bg-white"
		style="width: {progress}%"
	></div>
</div>