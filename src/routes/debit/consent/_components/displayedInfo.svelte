<script>
	import { lazy } from "@helpers/img.js";
</script>

<style>
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
</style>

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