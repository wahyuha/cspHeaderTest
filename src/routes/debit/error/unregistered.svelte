<script>
	import { goto, stores } from "@sapper/app";
	import { fade } from "svelte/transition";
	import { baseUrl } from "@constants/url";
	import Meta from "@components/meta/index.svelte";
	import { lazy } from "@helpers/img.js";
	import Button from "@components/button/index.svelte";

	const { session } = stores();
	const { extSessionId } = $session;
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
		min-height: 164px;
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
			alt="LinkAja error page"
			src="images/general-error.png"
      use:lazy={{ src: "images/general-error.png" }}
    />
    <h2 class="tt-info ff-b">Pendaftaran Gagal</h2>
		<p class="info" in:fade="{{ duration: 300 }}">
			Pendaftaran Anda gagal. Coba lagi beberapa saat.
		</p>
		<Button
			type="fit"
			onClick={() => goto(`${baseUrl}/debit/reinit?s=${extSessionId}`)}
		>
			Muat Ulang
		</Button>
  </div>
</div>