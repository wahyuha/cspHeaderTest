<script>
  import KEYCODE from "@constants/keyCode";

  export let value = null
  export let size = 6;
  export let error = null;
  export let autoUnFocus = true;

  let input;
  let isShow;
  let src = "icons/eye-slash.svg";
  let alt = "hide PIN";

  $: styledError = error ? "input-error shake-me" : "";
  $: styledMask = isShow ? "" : "mask-password";

  function validateByLength(e) {
    if (
            value &&
            `${value}`.length >= size &&
            !Object.values(KEYCODE).includes(e.keyCode)
    ) {
      e.preventDefault();
      return false;
    }
    error = "";
  }

  function onKeyup() {
    if (autoUnFocus && value && `${value}`.length >= size) {
      setTimeout(() => input.blur(), 500);
    }
  }

  function showPIN() {
    isShow = !isShow;
    src = isShow ? "icons/eye.svg" : "icons/eye-slash.svg";
    alt = isShow ? "show PIN" : "hide PIN";
    input.type = isShow ? "tel" : "password";
  }
</script>

<div class="input-group">
  <input
          bind:this={input}
          bind:value={value}
          on:keydown={validateByLength}
          on:keyup={onKeyup}
          type="password"
          class={`${styledError} ${styledMask} input-general`}
          pattern="[0-9]*"
          inputmode="numeric"
          placeholder="Masukkan 6 digit PIN LinkAja"
  />
  {#if value}
    <button type="button" class="button-show" on:click={showPIN}>
      <img {alt} {src}/>
    </button>
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
  input.input-general[type="tel"] {
    -moz-appearance:textfield;
  }
  .input-group {
    position: relative;
    width: 100%;
  }
  .button-show {
    position: absolute;
    z-index: 1;
    right: 14px;
    top: 14px;
    outline: 0;
    background: none;
    font-size: 12px;
    font-weight: 700;
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
