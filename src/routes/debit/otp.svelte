<script>
  import { goto, stores } from "@sapper/app";
  import clientHttp from "@utils/http/client";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError } from "@utils/error";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";
  import Counter from "@components/counter/index.svelte";
  import InputOTP from "@components/input/otp.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  const { session } = stores();
  const sessionClient = $session;

  let otp;
  let customerNumber;
  
  let loading = false;
  let error;
  let showLoaderFirst = false;

  onMount(async () => {
    customerNumber = $session.customerNumber;
  });

  const onSubmit = async () => {
    loading = true;
    error = "";
    const params = { otp };
    await clientHttp(sessionClient).post("/otp", params)
      .then(response => {
        const { status } = response.data;
        if (status === "00") {
          goto(`${baseUrl}/debit/success`);
        } else if (status === "LA909") {
          goto(`${baseUrl}/debit/error/unauthorized`);
        } else {
          error = publicError(status);
        }
      })
      .catch(() => error = publicError())
      .finally(() => {
        loading = false;
      });
  };

  const autoSubmit = async () => {
    loading = true;
    await onSubmit();
  };
</script>

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
  .pt-16 {
    padding-top: 16px;
  }
	.action-wrap {
		padding: 16px;
  }
  .resend-timer {
    color: #FF2C2C;
  }
</style>

<Meta title="Masukkan OTP" />
<div class="wrapper-clean">
	<div class="banner-wrap">
		<img
			class="banner-img"
			alt="OTP LinkAja"
			src="images/login-banner.png"
			use:lazy={{ src: "images/login-banner.png" }} />
  </div>
  
	<div class="form-wrap">
    <p class="pin-info" in:fade={{ duration: 300 }}>
      Masukkan kode verifikasi yang dikirim melalui SMS ke nomor {customerNumber || "*************"}
    </p>
    <InputOTP
      bind:otp={otp}
      autoSubmit={autoSubmit}
      error={error}
    />
    <div class="pt-16">
      <div>Belum menerima kode?</div>
      <div>Tunggu <span class="resend-timer">00:59</span> untuk Kirim Ulang</div>
    </div>
	</div>

	<div class="action-wrap" in:fade={{ duration: 500 }}>
    <Button
      disabled={loading}
      bind:loading={loading}
			onClick={onSubmit}
		>
			Lanjut
    </Button>
    <Counter on:limit={() => { showLoaderFirst = true }} />
  </div>
</div>
{#if showLoaderFirst}
  <LoaderBlocking />
{/if}