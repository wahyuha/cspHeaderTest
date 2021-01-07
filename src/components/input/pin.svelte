<script>
  export let pin;
  export let error;

  let input
  let style = 'input-general mask-password'
  if (error) style = `${style} input-error`

  function validateByLength(e) {
    const BACKSPACE_CODE = 8
    if (pin && `${pin}`.length >= 6 && e.keyCode !== BACKSPACE_CODE) {
      e.preventDefault();
      return false
    }
    if (error) error = ''
  }

  function autoUnfocus(e) {
    if (pin && `${pin}`.length >= 6) {
      setTimeout(() => input.blur(), 500)
    }
  }
</script>

<style>
  .input-general {
    background: #F8F8FC;
    border: 1px solid #E1E1ED;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    padding: 12px;
    width: 100%;
  }
  .input-error {
    border: 1px solid #D90102;
  }
  .mask-password {
    -webkit-text-security: disc;
    -moz-webkit-text-security: disc;
    -moz-text-security: disc;
  }
  .error-text {
    color: #D90102;
    font-size: 12px;
    padding: 4px 0;
  }
</style>

<input
  bind:this={input}
  bind:value={pin}
  on:keydown={validateByLength}
  on:keyup={autoUnfocus}
  type="number"
  class={style}
  pattern="[0-9]*"
  inputmode="numeric"
/>
{#if error}
  <div class="error-text">{error}</div>
{/if}