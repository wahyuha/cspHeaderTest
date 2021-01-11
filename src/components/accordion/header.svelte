<script>
  export let open = false;
</script>

<style>
  .header {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    border-bottom: 1px solid #E1E1ED;
  }

  .arrow-right:before {
    float: right;
    color: #f32656;
    font-size: 18px;
    font-weight: 700;
    content: '▿';
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }

  .arrowUp:before {
    float: right;
    color: #f32656;
    font-size: 16px;
    font-weight: 700;
    content: '▿';
    transform: rotate(-180deg);
    -webkit-transform: rotate(-180deg);
  }

  .arrowDown:before {
    float: right;
    color: #f32656;
    font-size: 16px;
    font-weight: 700;
    content: '▿';
  }
</style>

<div on:click class={"header"}>
  <slot />
  <span class={`${open ? "arrowUp" : "arrowDown"}`} />
</div>
