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
  } else if (type === "half") {
    style = `${style} action-button ff-b half`;
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

<button class={style} {disabled} on:click={handleClick}>
  {#if loading}
    <div class="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  {:else}
    <slot />
  {/if}
</button>

<style>
  .action-button {
    font-size: 14px;
    background-color: #ff2c2c;
    border-radius: 6px;
    color: #fff;
    padding: 14px;
  }
  .full {
    width: 100%;
  }
  .half {
    width: 70%;
  }
  .fit-content {
    padding: 14px 60px;
  }
  .outline {
    background: none;
    border: solid 1px #ff2c2c;
    color: #ff2c2c;
  }
  .action-button:active {
    background-color: #fa7575;
    outline: none;
  }
  .outline:active {
    background-color: #f8f8fc;
  }
  .m-x-2 {
    margin: 0 8px;
  }
</style>
