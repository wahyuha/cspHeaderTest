<script>
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError, pinLengthMessage } from "@utils/error";
  import { customer } from "@stores/customer";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";
  import InputPIN from "@components/input/pin.svelte";
  import Modal from "@components/modal/full.svelte";
  import ForgotContent from "@components/forgot/index.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  const { session } = stores();
  const sessionClient = $session;
  console.log(sessionClient);

  let value;
  let loading = false;
  let showLoaderFirst = false;
  let error;
  let pin = "";
  let confirmPIN = "";
  let { customerNumber } = $customer;
  let errorCodes = ["05", "77", "78", "79", "80", "90", "99"];

  const { editable } = $customer || false;

  $: forgotModal = false;

  const onSubmit = async () => {
    loading = true;
    error = "";
    const params = { pin: value, customerNumber };

    if (`${value}`.length < 6) {
      error = pinLengthMessage;
      loading = false;
      return;
    }

    await clientHttp(sessionClient)
      .post("/pin", params)
      .then((response) => {
        const { data, status } = response.data;
        if (status === "00") {
          $session.customerNumber = data.customerNumber;
          goto(`${baseUrl}/debit/otp`);
        } else if (errorCodes.includes(status)) {
          // change with constant
          goto(`${baseUrl}/debit/error/blocked`);
        } else {
          error = publicError(status);
        }
      })
      .catch((e) => {
        console.log(e);
        error = publicError();
      })
      .finally(() => {
        loading = false;
      });
  };
</script>

<Meta title="Masukkan nomor LinkAja" />
<div class="wrapper">
  <div class="banner-wrap">
    <img
      class="banner-img"
      alt="Authentication LinkAja"
      src="images/login-banner.png"
      use:lazy={{ src: "images/login-banner.png" }}
    />
  </div>
  <div class="form-wrap" in:fade={{ duration: 300 }}>
    <div class="tt-info ff-b">Buat PIN, Yuk!</div>
    <p class="login-info">PIN LinkAja terdiri dari 6 digit, rahasiakan ya!</p>
    <div class="input-wrap">
      <div class="f-label ff-b">Nomor Handphone</div>
      <input
        type="tel"
        disabled
        value={customerNumber}
        class="input-general"
        placeholder="Masukkan nomor handphone kamu"
      />
    </div>
    <div class="input-wrap">
      <div class="ff-b">PIN</div>
      <InputPIN bind:value={pin} {error} />
    </div>
    <div class="input-wrap">
      <div class="ff-b">Konfirmasi PIN</div>
      <InputPIN bind:value={confirmPIN} {error} />
    </div>
  </div>

  <div class="action-wrap">
    <Button disabled={loading} onClick={onSubmit} bind:loading>Buat PIN</Button>
  </div>
</div>
{#if forgotModal}
  <Modal
    on:cancel={() => (forgotModal = false)}
    on:close={() => (forgotModal = false)}
  >
    <ForgotContent />
  </Modal>
{:else if showLoaderFirst}
  <LoaderBlocking />
{/if}

<style>
  .banner-wrap {
    background-color: #ffffff;
    overflow: hidden;
  }
  .banner-img {
    width: 100%;
    min-height: 90px;
  }
  .form-wrap {
    background-color: #ffffff;
    padding: 16px;
  }
  .tt-info {
    padding: 0 0 8px;
    font-weight: 700;
    font-size: 16px;
  }
  .login-info {
    margin: 0 0 16px;
  }
  .f-label {
    color: #9CA4AC;
  }
  .input-wrap {
    padding-bottom: 16px;
  }
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
  input.input-general::-webkit-outer-spin-button,
  input.input-general::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.input-general[type="tel"] {
    -moz-appearance: textfield;
  }
  .input-info {
  padding: 4px 0;
    color: #9CA4AC;
    font-size: 12px;
  }
  .action-wrap {
    padding: 16px;
    padding-top: 0px;
    background-color: #ffffff;
  }
</style>
