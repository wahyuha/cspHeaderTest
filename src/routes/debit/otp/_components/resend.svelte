<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { stores } from "@sapper/app";
  import {
    timer,
    ticking,
    reset,
    remain,
    decreaseRemain,
  } from "@stores/otpCounter";
  import { pad } from "@utils/common";
  import clientHttp from "@utils/http/client";

  $: minutes = Math.floor($timer / 60);
  $: seconds = Math.floor($timer - minutes * 60);

  let timerInt;
  let eligibleRequest = true;
  let loading = false;

  const { session } = stores();
  const sessionClient = $session;
  const dispatch = createEventDispatcher();

  function listenEvent() {
    if ($timer <= 0) {
      clearInterval(timerInt);
      reset();
      eligibleRequest = false;
    }
  }

  function runTimer() {
    timerInt = setInterval(() => {
      ticking();
      listenEvent();
    }, 1000);

    return () => {
      clearInterval(timerInt);
    };
  }

  onMount(() => {
    runTimer();
  });

  async function resendOTP(e) {
    e.preventDefault();
    if ($remain === 0) {
      dispatch("limit", true);
      return false;
    }

    loading = true;
    await clientHttp(sessionClient).post("/otp/resend");
    loading = false;
    decreaseRemain();
    runTimer();
    eligibleRequest = true;
  }
</script>

<div class="pt-16 f12">
  <div>Belum menerima kode?</div>
  {#if eligibleRequest}
    <div>
      Tunggu <span class="resend-timer"
        >{pad(minutes, 2)}:{pad(seconds, 2)}</span
      > untuk kirim ulang
    </div>
  {:else}
    <div class="resend-wrap">
      <a href on:click={resendOTP} class="resend-otp ff-b"
        >Kirim Ulang ({3 - $remain}/3)</a
      >
      {#if loading}
        <div class="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .resend-timer {
    color: #ff2c2c;
  }
  .resend-otp {
    color: #ff2c2c;
    text-decoration: none;
  }
  .resend-wrap {
    display: flex;
  }
  .lds-ring {
    margin: 0;
    padding: 0 4px;
    width: auto !important;
  }
  .lds-ring div {
    border-color: #ff2c2c transparent transparent transparent;
    width: 18px;
    height: 18px;
  }
</style>
