<script>
	import { fade } from "svelte/transition";
	import { stores } from "@sapper/app";
	import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte";

	const { preloading } = stores();
	let color1 = '#FF7475';
	let color2 = '#C2F3FF';
</script>

<style>
	main {
		max-width: 420px;
		margin: 0 auto;
		background-color: #EFF1F6;
	}
</style>

<PageLoadingBar {preloading} {color1} {color2} />

{#if !$preloading}
	<main transition:fade>
		<slot></slot>
	</main>
{/if}