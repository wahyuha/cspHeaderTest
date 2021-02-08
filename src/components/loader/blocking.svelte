<script>
  import { fade } from "svelte/transition";
</script>

<style>
  .container {
    position: fixed;
    display: block;
    background: #000;
    opacity: 0.6;
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

  .content {
    background-color: #FFF;
    box-shadow: 0px 0px 1px rgba(81, 113, 145, 0.48), 0px 0px 56px rgba(81, 113, 145, 0.08), 0px 14px 42px rgba(81, 113, 145, 0.16);
    border-radius: 6px;
    padding: 12px;
    left: calc(50% - 48px);
    position: absolute;
    text-align: center;
    top: 40%;
    width: fit-content;
    z-index: 101;
  }
  .content-text {
    line-height: 1rem;
  }
  .lds-ring {
    margin: 0;
  }
  .lds-ring div {
    border-color: #52575C transparent transparent transparent;
  }
</style>

<div class="container">
  <div class="modal" in:fade={{ duration: 300 }}>
  </div>
</div>
<div class="content">
  <div class="lds-ring">
    <div/><div/><div/><div/>
  </div>
  <div class="content-text">
    Loading
  </div>
</div>