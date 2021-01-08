<script>
  import { onMount } from "svelte";
  import KEYCODE from '@constants/keyCode'
  
  export let otp;
  export let error;
  export let autoSubmit;
  
  const KEYBOARD = {
    BACKSPACE: 8,
    DELETE: 46,
    ANDROID_BACKSPACE: 229,
  };
  
  let size = 6;
  let inputs = [0];
  let otps = {};
  let elms = [];

  $: style = error ? 'otp-input ff-b input-error' : 'otp-input ff-b';

  onMount(async () => {
    inputs = await createArray(size);
    otps = await createValueSlot(inputs);
    otp = calcOtp(otps);
    setTimeout(() => !error && elms[0].focus(), 100)
  });
  
  const calcOtp = otps => {
    if (Object.values(otps).length) {
      return Object.values(otps).join("");
    } else return "";
  };

  const changeHandler = function(e, i) {
    let nextOtp = e.target.nextElementSibling;
    let prevOtp = e.target.previousElementSibling;
    let regx = new RegExp(/^\d+$/);
    if (Object.values(KEYCODE).includes(e.keyCode) && !prevOtp) {
      otps[i] = "";
    } else if (Object.values(KEYCODE).includes(e.keyCode) && prevOtp) {
      otps[i] = "";
      prevOtp.focus();
    } else if (nextOtp) {
      if (regx.test(e.key)) {
        otps[i] = e.key;
      } else {
        return;
      }
      setTimeout(() => {
        nextOtp.focus();
      }, 0);
    } else {
      setTimeout(() => {
        elms[i].blur()
        autoSubmit && autoSubmit();
      }, 1000)
      if (regx.test(e.key)) {
        otps[i] = e.key;
      } else {
        return;
      }
    }

    otp = calcOtp(otps);
  };

  function resetErrorIfAny() {
    if (error) {
      error = ''
    }
  }

  const createArray = size => {
    return new Array(size);
  };

  const createValueSlot = arr => {
    return arr.reduce((obj, item) => {
      return {
        ...obj,
        [item]: "",
      };
    }, {});
  };
</script>

<style>
  .otp-wrap {
    display: flex;
    align-items: center;
  }
  .otp-input {
    background: #F8F8FC;
    border: 1px solid #E1E1ED;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 16px;
    padding: 8px 12px;
    text-align: center;
    width: 36px;
    margin-right: 8px;
  }
  .input-error {
    border: 1px solid #D90102;
  }
  .error-text {
    color: #D90102;
    font-size: 12px;
    padding: 4px 0;
    padding-top: 16px;
  }
</style>

<div class="otp-wrap">
  {#if inputs.length}
    {#each inputs as item, i}
      <input
        class={style}
        bind:this={elms[i]}
        bind:value={otps[i]}
        maxLength="1"
        id={`otp${i}`}
        type="tel"
        pattern="\d{1}"
        maxlength="1"
        on:keydown|preventDefault={event => changeHandler(event, i)}
        on:click={resetErrorIfAny}
        placeholder="" />
    {/each}
  {/if}
</div>
{#if error}
  <div class="error-text pt-16">{error}</div>
{/if}