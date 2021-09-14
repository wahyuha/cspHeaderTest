<script>
  import { goto, stores } from "@sapper/app";
  import clientHttp from "@utils/http/client";
  import { onMount } from "svelte";
  import { customer, setCustomer } from "@stores/customer";
  import { fade } from "svelte/transition";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError } from "@utils/error";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";
  import Counter from "@components/counter/index.svelte";
  import InputOTP from "@components/input/otp.svelte";
  import Modal from "@components/modal/full.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";
  import ResendOTP from "./_components/resend.svelte";
  import LimitOTP from "./_components/limited.svelte";

  const { session } = stores();
  const sessionClient = $session;

  let otp;
  let { customerNumber } = $customer;
  let isRedirected = !Boolean(customerNumber);

  let loading = false;
  let error;
  let showLoaderFirst = false;
  let showModal = false;

  onMount(async () => {
    customerNumber = $session.customerNumber;
  });

  onMount(async () => {
    const loaded = setInterval(() => {
      if (typeof JSEncrypt !== "undefined") {
        checkAccount();
        clearInterval(loaded);
        return;
      }
    }, 300)
  });

  async function checkAccount() {
    if(isRedirected) {
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
          });
        }
      })
      .catch((e) => {
        console.error(e);
      })
    }
  }

  const onSubmit = async () => {
    loading = true;
    error = "";
    const params = { otp };
    await clientHttp(sessionClient)
      .post("/otp", params)
      .then((response) => {
        const { data, status } = response.data;
        if (status === "00") {
          if (data.backToStoreURI) {
            setCustomer({
              backToStoreUri: data.backToStoreURI,
            });
          }
          goto(`${baseUrl}/debit/success`);
        } else if (status === "LA909") {
          goto(`${baseUrl}/debit/error/unauthorized`);
        } else {
          error = publicError(status);
        }
      })
      .catch(() => (error = publicError()))
      loading = false;
  };

  const autoSubmit = async () => {
    loading = true;
    await onSubmit();
  };
</script>

<Meta title="Masukkan OTP" />
<div class="wrapper-clean">
  <div class="banner-wrap">
    <img
      class="banner-img"
      alt="OTP LinkAja"
      src="images/login-banner.png"
      use:lazy={{ src: "images/login-banner.png" }}
    />
  </div>

  <div class="form-wrap">
    <p class="pin-info" in:fade={{ duration: 300 }}>
      Masukkan kode verifikasi yang dikirim melalui SMS ke nomor {customerNumber ||
        "*************"}
    </p>
    <InputOTP bind:otp {autoSubmit} {error} />
    <ResendOTP
      on:limit={() => {
        showModal = true;
      }}
    />
  </div>

  <div class="action-wrap" in:fade={{ duration: 500 }}>
    <Button disabled={loading} bind:loading onClick={onSubmit}>Lanjut</Button>
    <Counter
      on:limit={() => {
        showLoaderFirst = true;
      }}
    />
  </div>
</div>
{#if showLoaderFirst}
  <LoaderBlocking />
{:else if showModal}
  <Modal
    on:cancel={() => (showModal = false)}
    on:close={() => (showModal = false)}
  >
    <LimitOTP onClick={() => (showModal = false)} />
  </Modal>
{/if}

<style>
  .banner-wrap {
    overflow: hidden;
  }
  .banner-img {
    width: 100%;
    min-height: 90px;
  }
  .form-wrap {
    padding: 16px;
  }
  .pin-info {
    margin: 0 0 16px;
  }
  .action-wrap {
    padding: 16px;
  }
</style>
