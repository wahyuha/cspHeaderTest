<script>
  import Meta from '@components/meta/index.svelte';
	import { lazy } from "@helpers/img.js";
</script>

<style>
	.t-c {
    text-align: center;
	}
	.banner-wrap {
		overflow: hidden;
    margin-top: 60px;
    padding: 16px 0;
  }
  .banner-img {
    width: 100%;
  }
  .success-title {
    font-size: 16px;
  }
  .success-text {
    padding: 0 16px;
  }
</style>

<Meta title="Pembayaran Berhasil" />
<div class="wrapper-clean t-c">
	<div class="banner-wrap">
		<img
			class="banner-img"
			alt="Authentication LinkAja"
			src="images/success.png"
			use:lazy={{ src: "images/success.png" }} />
  </div>
  <h2 class="success-title ff-b">Penyambungan Berhasil!</h2>
  <p class="success-text">Tunggu sebentar, ya, kamu akan segera diarahkan kembali ke situs partner</p>
</div>