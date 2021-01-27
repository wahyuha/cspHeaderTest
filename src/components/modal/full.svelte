<script>
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import { imgCdnPath } from "@constants/url.js";

  export let modalTitle = "";

  const dispatch = createEventDispatcher();
</script>

<style>
  .container {
    position: fixed;
    display: block;
    background: #fff;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    overflow: auto;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .close {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
  }

  .content {
    padding: 0 16px 16px;
  }

  .modal-header {
    padding: 24px;
  }

  .modal-title {
    margin-left: 22px;
    font-size: 16px;
    font-weight: 700;
  }
</style>

<div class="container">
  <div
    class="modal"
    in:fly={{ y: 200, duration: 300 }}
    out:fly={{ y: 100, duration: 300 }}>
    <div class="modal-header">
      <img
        src={`${imgCdnPath}/icon/icon-close.png`}
        alt="close"
        class="close"
        on:click={() => dispatch("close")} />
        {#if modalTitle}
          <div class="modal-title">{modalTitle}</div>
        {/if}
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</div>
