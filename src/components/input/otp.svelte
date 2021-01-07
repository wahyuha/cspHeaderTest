<script>
  import { onMount } from "svelte";

  const KEYBOARD = {
    BACKSPACE: 8,
    DELETE: 46,
    ANDROID_BACKSPACE: 229,
  };

  let inputs = [0];
  let otps = {};
  let elms = [];
  
  export let otp;
  export let size = 6;

  onMount(async () => {
    inputs = await createArray(size);
    otps = await createValueSlot(inputs);
    otp = calcOtp(otps);
    setTimeout(() => elms[0].focus(), 100)
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
    if (
      (e.keyCode == KEYBOARD.BACKSPACE ||
        e.keyCode == KEYBOARD.DELETE ||
        e.keyCode == KEYBOARD.ANDROID_BACKSPACE) &&
      !prevOtp
    ) {
      otps[i] = "";
    } else if (
      (e.keyCode == KEYBOARD.BACKSPACE ||
        e.keyCode == KEYBOARD.DELETE ||
        e.keyCode == KEYBOARD.ANDROID_BACKSPACE) &&
      prevOtp
    ) {
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
      if (regx.test(e.key)) {
        otps[i] = e.key;
      } else {
        return;
      }
    }

    otp = calcOtp(otps);
  };
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
</style>

<div class="otp-wrap">
  {#if inputs.length}
    {#each inputs as item, i}
      <input
        class="otp-input ff-b"
        bind:this={elms[i]}
        bind:value={otps[i]}
        maxLength="1"
        id={`otp${i}`}
        type="tel"
        pattern="\d{1}"
        maxlength="1"
        on:keydown|preventDefault={event => changeHandler(event, i)}
        placeholder="" />
    {/each}
  {/if}
</div>
  