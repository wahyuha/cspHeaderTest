<script>
	import { onMount } from "svelte";
	import { goto, stores } from "@sapper/app";
	import { popOut } from "@utils/animation";
	import { baseUrl } from "@constants/url";
	import Meta from "@components/meta/index.svelte";
	import { lazy } from "@helpers/img.js";
	import Button from "@components/button/index.svelte";

	const { session } = stores();
	const { extSessionId } = $session;

	let animate = false;

	onMount(async () => {
  setTimeout(() => (animate = true), 100);
});
</script>

<Meta title="Halaman Gagal Dimuat" />
{#if animate}
<div class="wrapper">
	<div class="page-wrap full-height">
		<img
			class="error-image"
			alt="LinkAja error page"
			src="images/timeout.png"
      use:lazy={{ src: "images/timeout.png" }}
    />
    <h2 class="tt-info ff-b">Pendaftaran LinkAja Gagal</h2>
		<p class="info" in:popOut={{ duration: 700 }}>
			Hal ini dapat terjadi karena koneksi internet tidak stabil, sesi berakhir atau kamu keluar dari proses
		</p>
		<div class="space-between">
      <Button
        type="half"
				outline
        class="no-outline mt-20"
        onClick={() => goto(`${baseUrl}/debit/exit`)}
      >
        Tutup
      </Button>
			<div class="sep-x"></div>
			<Button
        type="half"
				class="mt-20"
        onClick={() => goto(`${baseUrl}/debit/reinit?s=${extSessionId}`)}
      >
        Ulangi Proses
      </Button>
    </div>
  </div>
</div>
{/if}

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
	.space-between {
		display: flex;
    justify-content: space-between;
  }
	.sep-x {
		width: 16px;
	}
</style>