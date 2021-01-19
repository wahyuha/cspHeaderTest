<script>
	export let loading = false;
	export let disabled;
	export let onClick;
	export let type = "normal"; // normal | fit
	export let outline;
	export { className as class };

	let className;
	
	let style = `action-button ff-b ${className}`;
if (type === "fit") {
  style = `${style} action-button ff-b fit-content`;
	} else {
  style = `${style} action-button ff-b full`;
	}
	if (outline) {
	  style = `${style} outline`;
	}

	function handleClick(e) {
	  loading = true;
	  e.preventDefault();
	  onClick();
	}
</script>

<style>
	.action-button {
		font-size: 14px;
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
	.outline {
		background: none;
		border: solid 1px #FF2C2C;
		color: #FF2C2C;
	}
	.action-button:active {
		background-color: #fa7575;
		outline: none;
	}
	.outline:active {
		background-color: #F8F8FC;
	}
	.m-x-2 {
    margin: 0 8px;
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