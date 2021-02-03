<script>
	import { fade } from "svelte/transition";
	import { lazy } from "@helpers/img.js";
	import Button from "@components/button/index.svelte";
 
  export let onClick;

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

<div class="wrapper">
	<div class="page-wrap full-height">
		<img
			class="error-image"
			alt="linkaja-limit-otp"
			src="images/limit.png"
      use:lazy={{ src: "images/limit.png" }}
    />
    <h2 class="tt-info ff-b">Tunggu 5 menit dulu, ya!</h2>
		<p class="info" in:fade="{{ duration: 300 }}">
			Kamu sudah 3 kali meminta kode verifikasi dan tidak dapat meminta kode baru dalam 5 menit ke depan
		</p>
		<Button
      type="fit"
      onClick={onClick}
		>
			Tutup
		</Button>
  </div>
</div>