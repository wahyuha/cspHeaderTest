<script>
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { publicError } from "@utils/error";
  import Meta from "@components/meta/index.svelte";
  import InputPIN from "@components/input/pin.svelte";
  import Button from "@components/button/index.svelte";
  import Counter from "@components/counter/index.svelte";

  let pin;
  let loading = false;
  let error;

  const { session } = stores();
  const sessionClient = $session;

  const onSubmit = async () => {
    loading = true;
    error = "";
    const params = { pin };
    await clientHttp(sessionClient).post("/pin", params)
      .then(response => {
        const { data, status } = response.data;
        if (status === "00") {
          $session.customerNumber = data.customerNumber;
          goto(`${baseUrl}/debit/otp`);
        } else if (status === "78") { // change with constant
          goto(`${baseUrl}/debit/error/blocked`);
        } else {
          error = publicError(status);
        }
      })
      .catch(e => {console.log(e); error = publicError();})
      .finally(() => {
        loading = false;
      });
  };
</script>

<style>
	.banner-wrap {
    background-color: #FFFFFF;
		overflow: hidden;
  }
  .banner-img {
    width: 100%;
    min-height: 90px;
  }
  .form-wrap {
    background-color: #FFFFFF;
		padding: 16px;
  }
  .login-info {
    margin: 0 0 16px;
  }
  .input-wrap {
    padding-bottom: 16px;
  }
  .input-general {
    background: #F8F8FC;
    border: 1px solid #E1E1ED;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    padding: 12px;
    width: 100%;
  }
	.action-wrap {
		margin-top: 8px;
		padding: 16px;
		background-color: #FFFFFF;
  }
  .pad-pin {
    padding: 0 0 16px;
  }
  .flex-wrap {
		display: flex;
		align-items: center;
	}
	.icon-flex {
		width: 24px;
		padding: 8px 16px 8px 8px;
	}
  .icon-right {
		width: 6px;
		padding: 8px;
	}
	.content-flex {
		width: 100%;
  }
</style>

<Meta title="Masukkan nomor LinkAja" />
<div class="wrapper">
	<div class="banner-wrap">
    <img
			class="banner-img"
			alt="Authentication LinkAja"
			src="images/login-banner.png"
			use:lazy={{ src: "images/login-banner.png" }} />
  </div>
	<div class="form-wrap" in:fade="{{ duration: 300 }}">
    <p class="login-info">Masukkan nomor dan PIN LinkAja kamu</p>
    <div class="input-wrap">
      <div class="ff-b">Nomor Handphone</div>
      <input type="number" disabled class="input-general" />
    </div>
    <div class="input-wrap">
      <div class="ff-b">PIN LinkAja</div>
      <InputPIN bind:pin={pin} error={error} />
    </div>
	</div>

	<div class="action-wrap">
		<div class="flex-wrap pad-pin">
			<img
				class="icon-flex"
				alt="Call LinkAja"
				src="icons/call.png"
        use:lazy={{ src: "icons/call.png" }} />
      <div class="content-flex">
        <div class="ff-b">Lupa PIN?</div>
        <span>Cek cara Reset PIN di sini</span>
      </div>
      <img
				class="icon-right"
				alt="go to forgot pin"
				src="icons/arrow-right.png"
				use:lazy={{ src: "icons/arrow-right.png" }} />
		</div>
    <Button
			disabled={loading}
      onClick={onSubmit}
      bind:loading={loading}
		>
			Lanjut
    </Button>
    <Counter />
	</div>
</div>