<script>
  import { goto, stores } from "@sapper/app";
  import clientHttp from '@utils/http/client';
  import { onMount } from "svelte";
	import { baseUrl } from '@constants/url'
  import Meta from '@components/meta/index.svelte';
  import { lazy } from "@helpers/img.js";

  const { session } = stores();

  const KEYBOARD = {
    BACKSPACE: 8,
    DELETE: 46,
    ANDROID_BACKSPACE: 229,
  };

  let inputs = [0];
  let pins = {};
  let loaded = false;
  let customerNumber;
  
  export let pin;
  export let size = 6;

  onMount(async () => {
    customerNumber = $session.customerNumber;
    inputs = await createArray(size);
    pins = await createValueSlot(inputs);
    pin = calcPin(pins);
    document.getElementById("pin0").focus();
  });

  const onSubmit = async () => {
    const params = { otp: pin }
		await clientHttp.post(`/otp`, params)
			.then(response => {
        const { data } = response
				if (data.status === "00") {
          goto(`${baseUrl}/debit/success`)
        } else {
          // show error layout
          console.log(`login failed: ${data.message}`);
        }
      })
			.catch(e => console.log(e))
			.finally(() => {
				loaded = true
			})
  };
  
  const calcPin = pins => {
    if (Object.values(pins).length) {
      return Object.values(pins).join("");
    } else return "";
  };

  const changeHandler = function(e, i) {
    let nextPin = e.target.nextElementSibling;
    let prevPin = e.target.previousElementSibling;
    let regx = new RegExp(/^\d+$/);
    if (
      (e.keyCode == KEYBOARD.BACKSPACE ||
        e.keyCode == KEYBOARD.DELETE ||
        e.keyCode == KEYBOARD.ANDROID_BACKSPACE) &&
      !prevPin
    ) {
      pins[i] = "";
    } else if (
      (e.keyCode == KEYBOARD.BACKSPACE ||
        e.keyCode == KEYBOARD.DELETE ||
        e.keyCode == KEYBOARD.ANDROID_BACKSPACE) &&
      prevPin
    ) {
      pins[i] = "";
      prevPin.focus();
    } else if (nextPin) {
      if (regx.test(e.key)) {
        pins[i] = e.key;
      } else {
        return;
      }
      setTimeout(() => {
        nextPin.focus();
      }, 0);
    } else {
      if (regx.test(e.key)) {
        pins[i] = e.key;
      } else {
        return;
      }
    }

    pin = calcPin(pins);
  };
  const createArray = size => {
    return new Array(size);
  };
  const createValueSlot = arr => {
    return arr.reduce((obj, item) => {
      return {
        ...obj,
        [item]: "",
      };
    }, {});
  };
</script>

<style>
	.wrapper {
		background-color: #FFFFFF;
		min-height: 100vh;
	}
	.banner-wrap {
		overflow: hidden;
  }
  .banner-img {
    width: 100%;
  }
  .form-wrap {
		padding: 16px;
  }
  .pin-info {
    margin: 0 0 16px;
  }
  .pin-wrap {
    display: flex;
    align-items: center;
  }
  .pin-input {
    background: #F8F8FC;
    border: 1px solid #E1E1ED;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 700;
    padding: 8px 12px;
    text-align: center;
    width: 36px;
    margin-right: 8px;
  }
  .pt-16 {
    padding-top: 16px;
  }
	.action-wrap {
		padding: 16px;
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
  .resend-timer {
    color: #FF2C2C;
  }
  .counter {
    padding: 16px 0 8px;
    text-align: center;
  }
</style>

<Meta title="Masukkan OTP" />
<div class="wrapper">
	<div class="banner-wrap">
		<img
			class="banner-img"
			alt="Authentication LinkAja"
			src="images/login-banner.png"
			use:lazy={{ src: "images/login-banner.png" }} />
  </div>
	<div class="form-wrap">
    <p class="pin-info">Masukkan kode verifikasi yang dikirim melalui SMS ke nomor {customerNumber || '*************'}</p>
    <div class="pin-wrap">
      {#if inputs.length}
        {#each inputs as item, i}
          <input
            class="pin-input"
            bind:value={pins[i]}
            maxLength="1"
            id={`pin${i}`}
            type="tel"
            pattern="\d{1}"
            maxlength="1"
            on:keydown|preventDefault={event => changeHandler(event, i)}
            placeholder="" />
        {/each}
      {/if}
    </div>
    <div class="pt-16">
      <div>Belum menerima kode?</div>
      <div>Tunggu <span class="resend-timer">00:59</span> untuk Kirim Ulang</div>
    </div>
	</div>

	<div class="action-wrap">
    <button class="action-button" on:click={onSubmit}>Lanjut</button>
    <div class="counter">Berakhir dalam 05:00</div>
	</div>
</div>