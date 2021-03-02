<script>
  import KEYCODE from "@constants/keyCode";

  export let pin;
  export let error;

  let input;

  $: styledError = error ? "input-error shake-me" : "";

  function validateByLength(e) {
    if (
      pin &&
      `${pin}`.length >= 6 &&
      !Object.values(KEYCODE).includes(e.keyCode)
    ) {
      e.preventDefault();
      return false;
    }
    if (error) error = "";
  }

  function autoUnfocus() {
    if (pin && `${pin}`.length >= 6) {
      setTimeout(() => input.blur(), 500);
    }
  }

  function clearPin() {
    pin = "";
  }
</script>

<div class="input-group">
  <input
    bind:this={input}
    bind:value={pin}
    on:keydown={validateByLength}
    on:keyup={autoUnfocus}
    type="number"
    class={`${styledError} input-general mask-password`}
    pattern="[0-9]*"
    inputmode="numeric"
  />
  {#if pin}
    <button type="button" class="button-clear" on:click={clearPin}
      >&times;</button
    >
  {/if}
</div>
{#if error}
  <div class="error-text">{error}</div>
{/if}

<style>
  .input-general {
    background: #f8f8fc;
    border: 1px solid #e1e1ed;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    padding: 12px;
    width: 100%;
    outline: none;
    -webkit-appearance: none;
  }
  .input-error {
    border: 1px solid #d90102;
  }
  input.input-general::-webkit-outer-spin-button,
  input.input-general::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.input-general[type="number"] {
    -moz-appearance: textfield;
  }
  .input-group {
    position: relative;
    width: 100%;
  }
  .button-clear {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: #ffffff;
    background-color: #9ca4ac;
    z-index: 1;
    right: 14px;
    top: 10px;
    outline: 0;
  }
  .mask-password {
    -webkit-text-security: disc;
    -moz-webkit-text-security: disc;
    -moz-text-security: disc;
  }
  .error-text {
    color: #d90102;
    font-size: 12px;
    padding: 4px 0;
  }
</style>
