<script>
  export let open = false;
</script>

<div on:click class={"header"}>
  <slot />
  <span class={`${open ? "arrowUp" : "arrowDown"}`} />
</div>

<style>
  .header {
    padding: 0 16px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 52px;
    border-bottom: 1px solid #e1e1ed;
  }

  .header::before {
    content: " ";
    position: absolute;
    border-bottom: 2px #fff solid;
    height: 52px;
    width: 52px;
    left: 0;
  }

  .arrow-right:before {
    display: block;
    width: 16px;
    height: 16px;
    content: "";
    background-image: url("/dd/icons/arrow-right.png");
    background-size: 16px;
  }

  .arrowUp:before {
    display: block;
    width: 16px;
    height: 16px;
    content: "";
    background-image: url("/dd/icons/arrow-right.png");
    background-size: 16px;
    transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
  }

  .arrowDown:before {
    display: block;
    width: 16px;
    height: 16px;
    content: "";
    background-image: url("/dd/icons/arrow-right.png");
    background-size: 16px;
    transform: rotate(90deg);
    -webkit-transform: rotate(90deg);
  }
</style>
