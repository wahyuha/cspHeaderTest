<script>
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { customer } from "@stores/customer";
  import { setIdentity } from "@stores/identity";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";
  import Modal from "@components/modal/full.svelte";
  import ForgotContent from "@components/forgot/index.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  const { session } = stores();

  let loading = false;
  let showLoaderFirst = false;
  let error;
  let { customerNumber, name, email } = $customer;

  const { editable } = $customer || false;

  $: forgotModal = false;

  const onSubmit = async () => {
    setIdentity({
      name,
      email
    });
    return goto(`${baseUrl}/register/pin`);
  };
</script>

<Meta title="Masukkan nomor LinkAja" />
<div class="wrapper">
  <div class="banner-wrap">
    <img
      class="banner-img"
      alt="Authentication LinkAja"
      src="images/login-banner.png"
      use:lazy={{ src: "images/login-banner.png" }}
    />
  </div>
  <div class="form-wrap" in:fade={{ duration: 300 }}>
    <div class="tt-info ff-b">Daftar & Hubungkan LinkAja</div>
    <p class="login-info">Pendaftaran untuk {customerNumber || ''}</p>
    <div class="input-wrap">
      <div class="f-label ff-b">Nama Lengkap</div>
      <input
        type="tel"
        disabled={!editable}
        bind:value={name}
        class="input-general"
        placeholder="Masukkan nama lengkap kamu"
      />
    </div>
    <div class="input-wrap">
      <div class="f-label ff-b">Email</div>
      <input
        type="tel"
        disabled={!editable}
        bind:value={email}
        class="input-general"
        placeholder="Masukkan email kamu"
      />
      <div class="input-info">Email diperlukan supaya kamu bisa akses pemulihan akun LinkAja saat kamu lupa PIN</div>
    </div>
  </div>

  <div class="action-wrap">
    <p class="action-info">
      Saya telah membaca dan menyetujui 
      <a
        href
        on:click={(e) => {
          e.preventDefault();
        }}
        class="tnc-link">Ketentuan Layanan</a
      >
      pendaftaran akun LinkAja
    </p>
    <Button disabled={loading} onClick={onSubmit} bind:loading>Buat PIN</Button>
  </div>
</div>
{#if forgotModal}
  <Modal
    on:cancel={() => (forgotModal = false)}
    on:close={() => (forgotModal = false)}
  >
    <ForgotContent />
  </Modal>
{:else if showLoaderFirst}
  <LoaderBlocking />
{/if}

<style>
  .banner-wrap {
    background-color: #ffffff;
    overflow: hidden;
  }
  .banner-img {
    width: 100%;
    min-height: 90px;
  }
  .form-wrap {
    background-color: #ffffff;
    padding: 16px;
  }
  .tt-info {
    padding: 0 0 8px;
    font-weight: 700;
    font-size: 16px;
  }
  .login-info {
    margin: 0 0 16px;
  }
  .f-label {
    color: #9CA4AC;
  }
  .input-wrap {
    padding-bottom: 16px;
  }
  .input-general {
    background: #f8f8fc;
    border: 1px solid #e1e1ed;
    box-sizing: border-box;
    border-radius: 6px;
    font-size: 12px;
    padding: 12px;
    width: 100%;
    outline: none;
    -webkit-appearance: none;
  }
  input.input-general::-webkit-outer-spin-button,
  input.input-general::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input.input-general[type="tel"] {
    -moz-appearance: textfield;
  }
  .input-info {
  padding: 4px 0;
    color: #9CA4AC;
    font-size: 12px;
  }
  .action-wrap {
    padding: 16px;
    padding-top: 0px;
    background-color: #ffffff;
  }
</style>
