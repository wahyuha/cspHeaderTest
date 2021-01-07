<script>
	export let loading = false;
	export let disabled;
	export let onClick;
	export let type = "normal"; // normal | fit
	
	let style = "action-button full";
  if (type === "fit") {
    style = "action-button fit-content";
	}

	function handleClick(e) {
		loading = true
		e.preventDefault()
		onClick()
	}
</script>

<style>
	.action-button {
		font-size: 14px;
		font-weight: 700;
		background-color: #FF2C2C;
		border-radius: 6px;
		color: #FFF;
		padding: 14px;
	}
	.full {
		width: 100%;
	}
	.fit-content {
		padding: 14px 36px;
	}
	.action-button:active {
		background-color: #fa7575;
	}
</style>

<button
	class={style}
	disabled={disabled}
	on:click={handleClick}
	>
	{#if loading}
		<div class="lds-ring">
			<div/>
			<div/>
			<div/>
			<div/>
		</div>
	{:else}
		<slot></slot>
	{/if}
</button>