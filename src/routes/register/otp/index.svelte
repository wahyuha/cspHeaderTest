<script>
  import { goto, stores } from "@sapper/app";
  import clientHttp from "@utils/http/client";
  import { onMount } from "svelte";
  import { customer, setCustomer } from "@stores/customer";
  import { setIdentity } from "@stores/identity";
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
  let { customerNumber, name, email, state } = $customer;
  let isRedirected = !customerNumber;
  let { editable } = $customer || false;

  let loading = false;
  let error;
  let showLoaderFirst = false;
  let showModal = false;

  onMount(async () => {
    // customerNumber = $session.customerNumber;
    const loaded = setInterval(() => {
      if (typeof JSEncrypt !== "undefined") {
        checkIdentity();
        clearInterval(loaded);
        return;
      }
    }, 300);
  });

  async function checkIdentity() {
    if (isRedirected) {
    await clientHttp(sessionClient)
      .post("/check/general")
      .then((response) => {
        const { data, status } = response.data;
        console.log(response);
        if (status === "00") {
          customerNumber = data.customerNumber;
          name = data.name;
          email = data.email;

          setCustomer({
            customerNumber,
            backToStoreUri: data.backToStoreUri,
            backToStoreFailedUri: data.backToStoreFailedUri,
            editable,
            partnerName: data.partnerName,
            isRegister: data.isRegister,
            name,
            email,
          });
          setIdentity({
            name,
            email,
          });
        } else if (status === "990") {
          goto(`${baseUrl}/debit/error/unmatched`);
        } else {
          const queryCode = status ? `?code=${status}` : "";
          goto(`${baseUrl}/debit/error${queryCode}`);
        }
      })
      .catch((e) => {
        console.error(e);
      });
    } else {
      if (state !== 'RegisterStateOtpRequest') {
        goto(`${baseUrl}/debit/error/unmatched`);
      }
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
        loading = false;
        if (status === "00") {
          setCustomer({
            state: data.state,
            customerNumber: data.customerNumber,
            backToStoreUri: data.backToStoreURI || "",
          });
          return goto(`${baseUrl}/register/identity`);
        } else if (status === "LA909") {
          return goto(`${baseUrl}/debit/error/unauthorized`);
        } else {
          error = publicError(status);
        }
      })
      .catch(() => (error = publicError()))
      .then(() => {
        loading = false;
      });
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
      src="images/otp-banner-sm.png"
      use:lazy={{ src: "images/otp-banner.png" }}
    />
  </div>

  <div class="form-wrap">
    <div class="tt-info ff-b">Konfirmasi OTP Kamu</div>
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
  .tt-info {
    padding: 0 0 8px;
    font-weight: 700;
    font-size: 16px;
  }
  .pin-info {
    margin: 0 0 16px;
  }
  .action-wrap {
    padding: 16px;
  }
</style>
