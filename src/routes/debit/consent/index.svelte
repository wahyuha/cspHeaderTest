<script>
	import { goto} from "@sapper/app";
	import { baseUrl } from '../../../constants/url'
	import Meta from '../../../components/meta/index.svelte';
	import { lazy } from "../../../helpers/img.js";
</script>

<style>
	.wrapper {
		background-color: #E1E1ED;
		min-height: 100vh;
	}
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
	.form-display {
		padding: 0 16px;
		background-color: #FFFFFF;
	}
	.flex-wrap {
		display: flex;
		align-items: center;
	}
	.icon-flex {
		width: 24px;
		padding: 8px 16px 8px 8px;
	}
	.content-flex {
		padding: 16px 0;
		border-bottom: 1px solid #E1E1ED;
		width: 100%;
		font-weight: 700;
	}
	.no-border {
		border: none;
	}
	.action-wrap {
		margin-top: 8px;
		padding: 16px 16px 32px;
		background-color: #FFFFFF;
	}
	.action-info {
		margin: 0 0 16px;
	}
	.tnc-link {
		color: #FF2C2C;
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
	.action-button:active {
		background-color: #fa7575;
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
		<p class="info">Dengan menghubungkan LinkAja, kamu akan memberikan info di bawah ini ke [Nama Partner]</p>
	</div>
	<div class="form-display">
		<div class="flex-wrap">
			<img
				class="icon-flex"
				alt="nomor handphone"
				src="icons/phone.png"
				use:lazy={{ src: "icons/phone.png" }} />
			<div class="content-flex">Nomor handphone</div>
		</div>
		<div class="flex-wrap">
			<img
				class="icon-flex"
				alt="akun LinkAja"
				src="icons/avatar.png"
				use:lazy={{ src: "icons/avatar.png" }} />
			<div class="content-flex">Nama akun LinkAja</div>
		</div>
		<div class="flex-wrap">
			<img
				class="icon-flex"
				alt="saldo LinkAja"
				src="icons/idr.png"
				use:lazy={{ src: "icons/idr.png" }} />
			<div class="content-flex no-border">Info saldo LinkAja</div>
		</div>
	</div>

	<div class="action-wrap">
		<p class="action-info">Dengan klik 'Lanjut', kamu telah membaca dan menyetujui <a class="tnc-link">Syarat dan Ketentuan</a> yang berlaku</p>
		<button class="action-button" on:click={() => goto(`${baseUrl}/debit/auth`)}>Lanjut</button>
	</div>
</div>