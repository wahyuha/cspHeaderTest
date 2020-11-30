<script>
	// import Nav from '../components/Nav.svelte';

	export let segment;
</script>

<style>
	main {
		max-width: 420px;
		margin: 0 auto;
		background-color: #EFF1F6;
	}
	p {
		padding: 0;
	}
</style>

<!-- <Nav {segment}/> -->

<main>
	<slot></slot>
</main>