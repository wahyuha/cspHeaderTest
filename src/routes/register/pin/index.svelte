<script>
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError } from "@utils/error";
  import { customer, setCustomer } from "@stores/customer";
  import { setIdentity } from "@stores/identity";
  import { identity } from "@stores/identity";
  import { createPinValidator } from "@helpers/validator";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";
  import InputPIN from "@components/input/pin.svelte";
  import Modal from "@components/modal/full.svelte";
  import ForgotContent from "@components/forgot/index.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  const { session } = stores();
  const sessionClient = $session;

  let loading = false;
  let showLoaderFirst = false;
  let errorSubmit = "";
  let errors = {};
  let pin = "";
  let pinConfirm = "";
  let { customerNumber = "" } = $customer;
  let isRedirected = !customerNumber;
  let errorCodes = ["05", "77", "78", "79", "80", "90", "99"];

  const { name = "", email = "" } = $identity;

  $: forgotModal = false;

  onMount(async () => {
    const loaded = setInterval(() => {
      if (typeof JSEncrypt !== "undefined") {
        checkAccount();
        clearInterval(loaded);
        return;
      }
    }, 300);
  });

  async function checkAccount() {
    if (isRedirected) {
      await clientHttp(sessionClient)
        .post("/check/general")
        .then((response) => {
          const { data, status } = response.data;
          if (status === "00") {
            customerNumber = data.customerNumber;

            setCustomer({
              customerNumber,
              backToStoreUri: data.backToStoreUri,
              backToStoreFailedUri: data.backToStoreFailedUri,
              editable: data.editable,
              partnerName: data.partnerName,
              isRegister: data.isRegister,
              name,
              email,
            });
            setIdentity({
              name,
              email,
            });
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  const isEligible = () => {
    loading = false;

    const values = { pin, pinConfirm };
    errors = createPinValidator(values);
    if (!Object.keys(errors).length) {
      return true;
    }
    return false;
  };

  const onSubmit = async () => {
    if (isEligible()) {
      loading = true;
      errorSubmit = "";
      const params = { name, email, pin };

      await clientHttp(sessionClient)
        .post("/register", params)
        .then((response) => {
          const { status } = response.data;
          if (status === "00") {
            return goto(`${baseUrl}/register/success`);
          } else if (errorCodes.includes(status)) {
            return goto(`${baseUrl}/debit/error/unregistered`);
          } else {
            errorSubmit = publicError(status);
          }
        })
        .catch(() => {
          errorSubmit = publicError();
        })
        .then(() => {
          loading = false;
        });
    }
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
      {#if errorSubmit}
        <div class="error-text">{errorSubmit}</div>
      {/if}
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
      <InputPIN bind:value={pin} error={errors.pin} />
    </div>
    <div class="input-wrap">
      <div class="ff-b">Konfirmasi PIN</div>
      <InputPIN bind:value={pinConfirm} error={errors.pinConfirm} />
    </div>
  </div>

  <div class="action-wrap">
    <Button disabled={loading} onClick={onSubmit} bind:loading>Lanjut</Button>
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
    color: #9ca4ac;
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
    padding: 16px;
    padding-top: 0px;
    background-color: #ffffff;
  }

  .error-text {
    color: #d90102;
    font-size: 12px;
    padding: 4px 0;
  }
</style>
