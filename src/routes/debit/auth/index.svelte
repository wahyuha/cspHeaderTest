<script>
	import { text } from 'svelte/internal';
import Meta from '../../../components/meta/index.svelte';
	import { lazy } from "../../../helpers/img.js";
</script>

<style>
	.wrapper {
		background-color: #E1E1ED;
		min-height: 100vh;
	}
	.banner-wrap {
		overflow: hidden;
  }
  .banner-img {
    width: 100%;
  }
  .form-wrap {
    background-color: #FFFFFF;
		padding: 16px;
  }
  .login-info {
    margin: 0 0 16px;
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
	.action-wrap {
		margin-top: 8px;
		padding: 16px;
		background-color: #FFFFFF;
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
    <p class="login-info">Masukkan nomor dan PIN LinkAja kamu</p>
    <div class="input-wrap">
      <div class="input-label">Nomor Handphone</div>
      <input type="text" class="input-general" />
    </div>
    <div class="input-wrap">
      <div class="input-label">PIN LinkAja</div>
      <input type="number" class="input-general" />
    </div>
	</div>

	<div class="action-wrap">
		<div class="flex-wrap pad-pin">
			<img
				class="icon-flex"
				alt="Call LinkAja"
				src="icons/call.png"
        use:lazy={{ src: "icons/call.png" }} />
      <div class="content-flex">
        <div class="flex-title">Lupa PIN?</div>
        <span>Cek cara Reset PIN di sini</span>
      </div>
      <img
				class="icon-right"
				alt="go to forgot pin"
				src="icons/arrow-right.png"
				use:lazy={{ src: "icons/arrow-right.png" }} />
		</div>
    <button class="action-button">Lanjut</button>
    <div class="counter">Berakhir dalam 05:00</div>
	</div>
</div>