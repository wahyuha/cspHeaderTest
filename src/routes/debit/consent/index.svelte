<script context="module">
	export async function preload(page) {
    const { s } = page.query;
		return { sessionID: s }
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { goto} from "@sapper/app";
	import { baseUrl } from '@constants/url'
	import Meta from '@components/meta/index.svelte';
	import clientHttp from '@utils/http/client';
  import { lazy } from "@helpers/img.js";
  import DisplayedInfo from './_components/displayedInfo.svelte'
	import Button from '@components/button/index.svelte';

	export let sessionID
	let partnerName = 'partner link aja'
	let loaded = false

	onMount(async () => {
		await clientHttp.get(`/check?s=${sessionID}`)
			.then(response => {
				const { data } = response.data
				partnerName = data.partnerName
			})
			.catch(e => console.log(e))
			.finally(() => {
				loaded = true
			})
  });
</script>

<style>
	.direction-wrap {
		padding: 16px;
		background-color: #FFFFFF;
	}
	.logo {
		width: 48px;
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
	.partner-name { font-weight: 700 }
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
		<p class="info">Dengan menghubungkan LinkAja, kamu akan memberikan info di bawah ini ke <span class={loaded ? "partner-name" : "partner-blur"}>{partnerName}</span></p>
	</div>
	<DisplayedInfo />

	<div class="action-wrap">
		<p class="action-info">Dengan klik 'Lanjut', kamu telah membaca dan menyetujui <a href class="tnc-link">Syarat dan Ketentuan</a> yang berlaku</p>
		<Button
			disabled={!loaded}
			onClick={() => goto(`${baseUrl}/debit/auth`)}
		>
			Lanjut
		</Button>
	</div>
</div>