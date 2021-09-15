<script>
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError, pinLengthMessage } from "@utils/error";
  import { customer, setCustomer } from "@stores/customer";
  import Meta from "@components/meta/index.svelte";
  import InputPIN from "@components/input/pin.svelte";
  import Button from "@components/button/index.svelte";
  import Counter from "@components/counter/index.svelte";
  import Modal from "@components/modal/full.svelte";
  import ForgotTrigger from "@components/forgot/trigger.svelte";
  import ForgotContent from "@components/forgot/index.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  const { session } = stores();
  const sessionClient = $session;

  let value;
  let loading = false;
  let showLoaderFirst = false;
  let error;
  let { customerNumber } = $customer;
  let isRedirected = !Boolean(customerNumber);
  let errorCodes = ["05", "77", "78", "79", "80", "90", "99"];

  const { editable } = $customer || false;

  $: forgotModal = false;

  onMount(async () => {
    console.log('init pin...');
    if (process.env.SAPPER_APP_CRYPTO_MODE === "false") {
      await checkAccount();
    } else {
      const loadedInt = setInterval(() => {
        if (typeof JSEncrypt !== "undefined") {
          checkAccount();
          clearInterval(loadedInt);
          return true;
        }
      }, 300)
    }
  });

  async function checkAccount() {
    console.log('JSEn loaded (pin)');
    if(isRedirected) {
      console.log('redirected');
      await clientHttp(sessionClient)
      .post("/check/general")
      .then((response) => {
        console.log('check/general response 200');
        const { data, status } = response.data;
        if (status === "00") {
          console.log('status 00');
          customerNumber = data.customerNumber;
          console.log('customerNumber updated');
          
          setCustomer({
            customerNumber,
            backToStoreUri: data.backToStoreUri,
            backToStoreFailedUri: data.backToStoreFailedUri,
            editable: data.editable,
            partnerName: data.partnerName,
            isRegister: data.isRegister,
          });
          console.log('update customer');
        } else {
          console.log('status not 00');
        }
      })
      .catch((e) => {
        console.log('error fetch');
        console.error(e);
      })
    }
  }

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
          goto(`${baseUrl}/debit/error/blocked`);
        } else {
          error = publicError(status);
        }
      })
      .catch((e) => {
        console.log(e);
        error = publicError();
      })
      .then(() => {
        console.log('isLoading?');
        loading = false;
        console.log('loading true?');
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
        type="tel"
        disabled={!editable}
        bind:value={customerNumber}
        class="input-general"
        placeholder="Masukkan nomor handphone kamu"
      />
    </div>
    <div class="input-wrap">
      <div class="ff-b">PIN LinkAja</div>
      <InputPIN bind:value {error} />
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
  input.input-general::-webkit-outer-spin-button,
  input.input-general::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.input-general[type="tel"] {
    -moz-appearance: textfield;
  }
  .action-wrap {
    margin-top: 8px;
    padding: 16px;
    background-color: #ffffff;
  }
</style>
