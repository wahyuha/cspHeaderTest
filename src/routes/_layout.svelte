<script>
	import * as Sentry from "@sentry/browser";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { stores } from "@sapper/app";
	import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte";

	const { preloading, session } = stores();
	const sessionClient = $session;
	let color1 = "#FF7475";
	let color2 = "#C2F3FF";

	onMount(() => {
		if (sessionClient && sessionClient.extSessionId) {
			Sentry.setUser({ id: sessionClient.extSessionId });
		}
	});
	
	var cathError = () => {}
	if (typeof window !== "undefined") {
		cathError = () => {
			window.onerror = function (msg, url, lineNo, columnNo, error) {
				console.log(error);
				return false;
			}
		}
	}

	cathError();
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