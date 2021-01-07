<script>
  import { goto, stores } from "@sapper/app";
  import clientHttp from '@utils/http/client';
  import { onMount } from "svelte";
	import { baseUrl } from '@constants/url'
  import Meta from '@components/meta/index.svelte';
  import { lazy } from "@helpers/img.js";
  import Button from '@components/button/index.svelte';
  import InputOTP from '@components/input/otp.svelte'

  const { session } = stores();

  let otp;
  let eligible = true;
  let customerNumber;

  onMount(async () => {
    customerNumber = $session.customerNumber;
  });

  const onSubmit = async () => {
    const params = { otp }
		await clientHttp.post(`/otp`, params)
			.then(response => {
        const { data } = response
				if (data.status === "00") {
          goto(`${baseUrl}/debit/success`)
        } else {
          // show error layout
          console.log(`login failed: ${data.message}`);
        }
      })
			.catch(e => console.log(e))
			.finally(() => {
				// loaded = true
			})
  };
</script>

<style>
	.banner-wrap {
		overflow: hidden;
  }
  .banner-img {
    width: 100%;
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
  .counter {
    padding: 16px 0 8px;
    text-align: center;
  }
</style>

<Meta title="Masukkan OTP" />
<div class="wrapper-clean">
	<div class="banner-wrap">
		<img
			class="banner-img"
			alt="Authentication LinkAja"
			src="images/login-banner.png"
			use:lazy={{ src: "images/login-banner.png" }} />
  </div>
	<div class="form-wrap">
    <p class="pin-info">Masukkan kode verifikasi yang dikirim melalui SMS ke nomor {customerNumber || '*************'}</p>
    <InputOTP bind:otp={otp} />
    <div class="pt-16">
      <div>Belum menerima kode?</div>
      <div>Tunggu <span class="resend-timer">00:59</span> untuk Kirim Ulang</div>
    </div>
	</div>

	<div class="action-wrap">
    <Button
      disabled={!eligible}
			onClick={onSubmit}
		>
			Lanjut
		</Button>
    <div class="counter">Berakhir dalam 05:00</div>
	</div>
</div>