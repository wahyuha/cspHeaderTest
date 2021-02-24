<script>
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError } from "@utils/error";
  import { customer } from "@stores/customer";
  import Meta from "@components/meta/index.svelte";
  import InputPIN from "@components/input/pin.svelte";
  import Button from "@components/button/index.svelte";
  import Counter from "@components/counter/index.svelte";
  import Modal from "@components/modal/full.svelte";
  import ForgotTrigger from "@components/forgot/trigger.svelte";
  import ForgotContent from "@components/forgot/index.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  let pin;
  let loading = false;
  let error;
  let showLoaderFirst = false;

  const { session } = stores();
  const sessionClient = $session;

  $: forgotModal = false;

  const onSubmit = async () => {
    loading = true;
    error = "";
    const params = { pin };
    await clientHttp(sessionClient)
      .post("/pin", params)
      .then((response) => {
        const { data, status } = response.data;
        if (status === "00") {
          $session.customerNumber = data.customerNumber;
          goto(`${baseUrl}/debit/otp`);
        } else if (status === "78") {
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
    <p class="login-info">Masukkan nomor dan PIN LinkAja kamu</p>
    <div class="input-wrap">
      <div class="ff-b">Nomor Handphone</div>
      <input
        type="text"
        value={$customer.number}
        disabled
        class="input-general"
      />
    </div>
    <div class="input-wrap">
      <div class="ff-b">PIN LinkAja</div>
      <InputPIN bind:pin {error} />
    </div>
  </div>

  <div class="action-wrap">
    <ForgotTrigger on:close={() => (forgotModal = true)} />
    <Button disabled={loading} onClick={onSubmit} bind:loading>Lanjut</Button>
    <Counter
      on:limit={() => {
        showLoaderFirst = true;
      }}
    />
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
  .login-info {
    margin: 0 0 16px;
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
  .action-wrap {
    margin-top: 8px;
    padding: 16px;
    background-color: #ffffff;
  }
</style>
