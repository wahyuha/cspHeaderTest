<script>
  import { onMount } from "svelte";
  import KEYCODE from "@constants/keyCode";

  const { BACKSPACE, LEFT_ARROW, RIGHT_ARROW, DELETE, SPACEBAR } = KEYCODE;

  export let otp;
  export let error;
  export let autoSubmit;

  let size = 6;
  let inputs = [0];
  let otps = {};
  let elms = [];

  $: styleWrap = error ? "otp-wrap shake-me" : "otp-wrap";
  $: style = error ? "otp-input ff-b input-error" : "otp-input ff-b";

  onMount(async () => {
    inputs = await createArray(size);
    otps = await createValueSlot(inputs);
    otp = calcOtp(otps);
    setTimeout(() => !error && elms[0].focus(), 100);
  });

  const calcOtp = (otps) => {
    if (Object.keys(otps).length) {
      return Object.keys(otps)
        .map((key) => otps[key])
        .join("");
    } else return "";
  };

  const handleKeydown = function (e, i) {
    let nextOtp = e.target.nextElementSibling;
    let prevOtp = e.target.previousElementSibling;
    if ((e.keyCode === BACKSPACE || e.key === "Backspace") && i > 0) {
      otps[i] = "";
      setTimeout(() => {
        prevOtp.focus();
      }, 100);
    } else if ((e.keyCode === DELETE || e.key === "Delete") && i > 0) {
      otps[i] = "";
      setTimeout(() => {
        prevOtp.focus();
      }, 100);
    } else if ((e.keyCode === LEFT_ARROW || e.key === "ArrowLeft") && i > 0) {
      prevOtp.focus();
    } else if (
      (e.keyCode === RIGHT_ARROW || e.key === "ArrowRight") &&
      i < size - 1
    ) {
      nextOtp.focus();
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === " " ||
      e.key === "Spacebar" ||
      e.key === "Space"
    ) {
      e.preventDefault();
    }

    otp = calcOtp(otps);
  };

  const isInputValueValid = (value) => {
    const isTypeValid = !isNaN(parseInt(value, 10));

    return isTypeValid && value.trim().length === 1;
  };

  const handleChange = (e, i) => {
    const { value } = e.target;

    if (isInputValueValid(value)) {
      otps[i] = value;
    }
  };

  const handleInput = (e, i) => {
    let nextOtp = e.target.nextElementSibling;
    let prevOtp = e.target.previousElementSibling;

    if (isInputValueValid(e.target.value)) {
      if (i <= size - 2) {
        setTimeout(() => {
          nextOtp.focus();
        }, 100);
      } else if (i >= size - 1) {
        otp = calcOtp(otps);
        setTimeout(() => {
          autoSubmit && autoSubmit();
        }, 700);
      }
    } else {
      // workaround for keyCode "229 Unidentified" on Android.
      const { nativeEvent } = e;

      if (
        nativeEvent &&
        nativeEvent.data === null &&
        nativeEvent.inputType === "deleteContentBackward"
      ) {
        e.preventDefault();
        otps[i] = "";
        prevOtp.focus();
      }
    }
  };

  function resetErrorIfAny() {
    if (error) {
      error = "";
    }
  }

  const createArray = (size) => {
    return new Array(size);
  };

  const createValueSlot = (arr) => {
    return arr.reduce((obj, item) => {
      return {
        ...obj,
        [item]: "",
      };
    }, {});
  };
</script>

<div class={styleWrap}>
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
        on:change={(event) => handleChange(event, i)}
        on:keydown={(event) => handleKeydown(event, i)}
        on:input={(event) => handleInput(event, i)}
        on:focus={(e) => e.target.select()}
        on:click={resetErrorIfAny}
        placeholder=""
      />
    {/each}
  {/if}
</div>
{#if error}
  <div class="error-text pt-16">{error}</div>
{/if}

<style>
  .otp-wrap {
    display: flex;
    align-items: center;
  }
  .otp-input {
    background: #f8f8fc;
    border: 1px solid #e1e1ed;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 16px;
    padding: 8px 12px;
    text-align: center;
    width: 36px;
    margin-right: 8px;
  }
  .input-error {
    border: 1px solid #d90102;
  }
  .error-text {
    color: #d90102;
    font-size: 12px;
    padding: 4px 0;
    padding-top: 16px;
  }
</style>
