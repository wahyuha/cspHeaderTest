<script>
	import { goto} from "@sapper/app";
	import { baseUrl } from '@constants/url'
	import Meta from '@components/meta/index.svelte';
	import { lazy } from "@helpers/img.js";
	import Button from '@components/button/index.svelte';
</script>

<style>
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
    line-height: 24px;
  }
	.info {
		margin: 0;
    color: #52575C;
    padding-bottom: 40px;
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
    <h2 class="tt-info ff-b">Halaman Gagal Dimuat</h2>
		<p class="info">Hal ini dapat terjadi karena koneksi internet tidak stabil, sesi berakhir atau hal lainnya. Coba dalam beberapa saat lagi, ya!</p>
		<Button
			type="fit"
			onClick={() => goto(`${baseUrl}/debit/consent`)}
		>
			Muat Ulang
		</Button>
  </div>
</div>