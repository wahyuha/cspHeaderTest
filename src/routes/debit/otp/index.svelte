<script>
	import { text } from 'svelte/internal';
import Meta from '../../../components/meta/index.svelte';
	import { lazy } from "../../../helpers/img.js";
</script>

<style>
	.wrapper {
		background-color: #FFFFFF;
		min-height: 100vh;
	}
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
  .pin-wrap {
    display: flex;
    align-items: center;
  }
  .pin-input {
    background: #F8F8FC;
    border: 1px solid #E1E1ED;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 700;
    padding: 8px 12px;
    text-align: center;
    width: 36px;
    margin-right: 8px;
  }
  .input-label {
    font-weight: 700;
  }
  .input-wrap {
    padding-bottom: 16px;
  }
  .input-general {
    background: #F8F8FC;
    border: 1px solid #E1E1ED;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    padding: 12px;
    width: 100%;
  }
  .pt-16 {
    padding-top: 16px;
  }
	.action-wrap {
		padding: 16px;
  }
  .pad-pin {
    padding: 0 0 16px;
  }
  .flex-wrap {
		display: flex;
		align-items: center;
	}
	.icon-flex {
		width: 24px;
		padding: 8px 16px 8px 8px;
	}
  .icon-right {
		width: 6px;
		padding: 8px;
	}
	.content-flex {
		width: 100%;
  }
  .flex-title {
    font-weight: 700;
  }
	.action-button {
		font-size: 14px;
		font-weight: 700;
		background-color: #FF2C2C;
		border-radius: 6px;
		color: #FFF;
		width: 100%;
		padding: 14px;
  }
  .resend-timer {
    color: #FF2C2C;
  }
  .counter {
    padding: 16px 0 8px;
    text-align: center;
  }
</style>

<Meta title="Halaman Persetujuan" />
<div class="wrapper">
	<div class="banner-wrap">
		<img
			class="banner-img"
			alt="Authentication LinkAja"
			src="images/login-banner.png"
			use:lazy={{ src: "images/login-banner.png" }} />
  </div>
	<div class="form-wrap">
    <p class="pin-info">Masukkan kode verifikasi yang dikirim melalui SMS ke nomor *********9356</p>
    <div class="pin-wrap">
      <input type="number" class="pin-input" maxlength="1" />
      <input type="number" class="pin-input" maxlength="1" />
      <input type="number" class="pin-input" maxlength="1" />
      <input type="number" class="pin-input" maxlength="1" />
      <input type="number" class="pin-input" maxlength="1" />
      <input type="number" class="pin-input" maxlength="1" />
    </div>
    <div class="pt-16">
      <div>Belum menerima kode?</div>
      <div>Tunggu <span class="resend-timer">00:59</span> untuk Kirim Ulang</div>
    </div>
	</div>

	<div class="action-wrap">
    <button class="action-button">Lanjut</button>
    <div class="counter">Berakhir dalam 05:00</div>
	</div>
</div>