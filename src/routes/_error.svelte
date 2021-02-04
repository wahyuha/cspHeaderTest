<script>
	import { lazy } from "@helpers/img.js";
	import { goto } from "@sapper/app";
	import { baseUrl } from "@constants/url";
	import Button from "@components/button/index.svelte";

	export let status;
	export let error;

	const dev = process.env.NODE_ENV === "development";

	let label = "Halaman Gagal Dimuat";
	let description = "Terjadi kesalahan pada server kami. Coba dalam beberapa saat lagi, ya!";
	if (status === 404) {
	  label = "Waduh, halaman ini tidak ada";
	  description = "Mungkin kamu salah jalan atau alamat. Ayo balik aja!";
	}

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

<svelte:head>
	<title>{status}</title>
</svelte:head>

<div class="wrapper">
	<div class="page-wrap full-height">
		<img
			class="error-image"
			alt="LinkAja"
			src="images/general-error.png"
      use:lazy={{ src: "images/general-error.png" }}
    />
    <h2 class="tt-info ff-b">{label}</h2>
		<p class="info">{description}</p>
		<Button
			type="fit"
			onClick={() => goto(`${baseUrl}/debit/exit`)}
			>
			Tutup
		</Button>
		{#if dev && error.stack}
			<pre>{error.stack}</pre>
		{/if}
  </div>
</div>
