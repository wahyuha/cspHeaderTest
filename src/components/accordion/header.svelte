<script>
  export let open = false;
</script>

<style>
  .header {
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    border-bottom: 1px solid #E1E1ED;
  }

  .arrow-right:before {
    display: block;
    width: 16px;
    height: 16px;
    content: "";
    background-image: url('/dd/icons/arrow-right.png');
    background-size: 16px;
  }

  .arrowUp:before {
    display: block;
    width: 16px;
    height: 16px;
    content: "";
    background-image: url('/dd/icons/arrow-right.png');
    background-size: 16px;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }

  .arrowDown:before {
    display: block;
    width: 16px;
    height: 16px;
    content: "";
    background-image: url('/dd/icons/arrow-right.png');
    background-size: 16px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
</style>

<div on:click class={"header"}>
  <slot />
  <span class={`${open ? "arrowUp" : "arrowDown"}`} />
</div>
