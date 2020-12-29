<script>
	import { goto} from "@sapper/app";
	import { baseUrl } from '@constants/url'
	import Meta from '@components/meta/index.svelte';
	import { lazy } from "@helpers/img.js";
</script>

<style>
	.wrapper {
		background-color: #E1E1ED;
		min-height: 100vh;
	}
	.page-wrap {
		padding: 16px;
		background-color: #FFFFFF;
    padding-top: 20%;
    text-align: center;
	}
  .full-height {
    min-height: 100vh;
  }
	.error-image {
		width: 100%;
		margin: 8px auto;
	}
  .tt-info {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
	.info {
		margin: 0;
    color: #52575C;
    padding-bottom: 40px;
	}
	.action-button {
		font-size: 14px;
		background-color: #FF2C2C;
		border-radius: 6px;
		color: #FFF;
		padding: 14px;
	}
	.action-button:active {
		background-color: #fa7575;
	}
  .button-content {
    padding: 14px 36px;
  }
</style>

<Meta title="Halaman Gagal Dimuat" />
<div class="wrapper">
	<div class="page-wrap full-height">
		<img
			class="error-image"
			alt="LinkAja"
			src="images/general-error.png"
      use:lazy={{ src: "images/general-error.png" }}
    />
    <h2 class="tt-info">Halaman Gagal Dimuat</h2>
    <p class="info">Hal ini dapat terjadi karena koneksi internet tidak stabil, sesi berakhir atau hal lainnya. Coba dalam beberapa saat lagi, ya!</p>
    <button
      class="action-button button-content"
      on:click={() => goto(`${baseUrl}/debit/consent`)}>
      Muat Ulang
    </button>
  </div>
</div>