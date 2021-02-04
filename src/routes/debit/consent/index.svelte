<script>
	import { onMount } from "svelte";
	import { goto, stores } from "@sapper/app";
	import { setCustomer } from "@stores/customer";
	import Meta from "@components/meta/index.svelte";
	import clientHttp from "@utils/http/client";
	import { baseUrl } from "@constants/url";
	import { lazy } from "@helpers/img.js";
	import DisplayedInfo from "./_components/displayedInfo.svelte";
	import Button from "@components/button/index.svelte";
	import Modal from "@components/modal/full.svelte";
	import TncContent from "./_components/tncContent.svelte";

	const { session } = stores();
	const sessionClient = $session;

	let partnerName = "merchant LinkAja";
	let loaded = false;
	$: showModal = false;

	onMount(async () => {
	  await clientHttp(sessionClient).post("/check")
	    .then(response => {
	      const { data, status } = response.data;
	      if (status === "00") {
					partnerName = data.partnerName;
					setCustomer({ 
						number: data.customerNumber,
						backToStoreUri: data.backToStoreUri,
						backToStoreFailedUri: data.backToStoreFailedUri,
					});
	      } else {
	        const queryCode = status ? `?code=${status}` : "";
	        goto(`${baseUrl}/debit/error${queryCode}`);
	      }
	    })
	    .catch(e => {
	      console.error(e);
	      goto(`${baseUrl}/debit/error?code=999`);
	    })
	    .finally(() => {
	      loaded = true;
	    });
});
</script>

<style>
	.direction-wrap {
		padding: 16px;
		background-color: #FFFFFF;
	}
	.logo {
		width: 48px;
		height: 48px;
		margin: 8px 0;
	}
	.info {
		margin: 0;
	}
	.partner-blur {
		color: transparent;
		text-shadow: #000 0 0 10px;
		transition: 0.4s;
	}
	.action-wrap {
		margin-top: 8px;
		padding: 16px 16px 32px;
		background-color: #FFFFFF;
	}
	
</style>

<Meta title="Halaman Persetujuan" />
<div class="wrapper">
	<div class="direction-wrap">
		<img
			class="logo"
			alt="LinkAja"
			src="images/logo-main.png"
			use:lazy={{ src: "images/logo-main.png" }} />
		<p class="info">
			Dengan menghubungkan LinkAja, kamu akan memberikan info di bawah ini ke <span class={loaded ? "ff-b" : "partner-blur"}>{partnerName}</span>
		</p>
	</div>
	<DisplayedInfo />

	<div class="action-wrap">
		<p class="action-info">Dengan klik 'Lanjut', kamu telah membaca dan menyetujui <a href on:click={(e) => {e.preventDefault(); showModal = true}} class="tnc-link">Syarat dan Ketentuan</a> yang berlaku</p>
		<Button
			disabled={!loaded}
			onClick={() => goto(`${baseUrl}/debit/pin`)}
		>
			Lanjut
		</Button>
	</div>
</div>
{#if showModal}
	<Modal
		on:cancel={() => (showModal = false)}
		on:close={() => (showModal = false)}>
		<TncContent />
	</Modal>
{/if}