<script>
  import { onMount } from "svelte";
  import { goto, stores } from "@sapper/app";
  import { fade } from "svelte/transition";
  import { Checkbox } from "seruni";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { customer, setCustomer } from "@stores/customer";
  import { setIdentity } from "@stores/identity";
  import { createAccountValidator } from "@helpers/validator";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";
  import Modal from "@components/modal/full.svelte";
  import TncContent from "./_components/tncContent.svelte";
  import LoaderBlocking from "@components/loader/blocking.svelte";

  const { session } = stores();
  const sessionClient = $session;

  let accept = false;
  let showLoaderFirst = false;
  let showModal = false;
  let errors = {};
  let { customerNumber, name, email } = $customer;
  let isRedirected = !customerNumber;

  let { editable } = $customer || false;

  onMount(async () => {
    const loaded = setInterval(() => {
      if (typeof JSEncrypt !== "undefined") {
        checkIdentity();
        clearInterval(loaded);
        return;
      }
    }, 300);
  });

  async function checkIdentity() {
    if (isRedirected) {
      await clientHttp(sessionClient)
        .post("/check/general")
        .then((response) => {
          const { data, status } = response.data;
          if (status === "00") {
            customerNumber = data.customerNumber;
            name = data.name;
            email = data.email;
            editable = data.editable;

            setCustomer({
              customerNumber,
              backToStoreUri: data.backToStoreUri,
              backToStoreFailedUri: data.backToStoreFailedUri,
              editable,
              partnerName: data.partnerName,
              isRegister: data.isRegister,
              name,
              email,
            });
            setIdentity({
              name,
              email,
            });
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  const isEligible = () => {
    if (!editable) {
      return true;
    }

    const values = { name, email };
    errors = createAccountValidator(values);
    if (!Object.keys(errors).length) {
      return true;
    }
    return false;
  };

  const onSubmit = async () => {
    if (isEligible()) {
      setIdentity({
        name,
        email,
      });
      return goto(`${baseUrl}/register/pin`);
    }
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
    <p class="login-info">Pendaftaran untuk {customerNumber || ""}</p>
    <div class="input-wrap">
      <div class="f-label ff-b">Nama Lengkap</div>
      <input
        type="tel"
        disabled={!editable}
        bind:value={name}
        class="input-general"
        placeholder="Masukkan nama lengkap kamu"
      />
      {#if errors.name}
        <div class="error-text">{errors.name}</div>
      {/if}
    </div>
    <div class="input-wrap">
      <div class="f-label ff-b">Alamat Email</div>
      <input
        type="tel"
        disabled={!editable}
        bind:value={email}
        class="input-general"
        placeholder="Masukkan email kamu"
      />
      {#if errors.email}
        <div class="error-text">{errors.email}</div>
      {/if}
      <div class="input-info">
        Email diperlukan supaya kamu bisa akses pemulihan akun LinkAja saat kamu
        lupa PIN
      </div>
    </div>
  </div>

  <div class="action-wrap">
    <div class="tnc-section">
      <Checkbox bind:checked={accept} text="" />
      <div class="action-info">
        Saya telah membaca dan menyetujui <a
          href
          on:click={(e) => {
            e.preventDefault();
            showModal = true;
          }}
          class="tnc-link">Ketentuan Layanan</a
        > penyambungan akun LinkAja
      </div>
    </div>
    <Button disabled={!accept} onClick={onSubmit}>Lanjut</Button>
  </div>
</div>
{#if showModal}
  <Modal
    on:cancel={() => (showModal = false)}
    on:close={() => (showModal = false)}
  >
    <TncContent />
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
    color: #9ca4ac;
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
    color: #9ca4ac;
    font-size: 12px;
  }
  .action-wrap {
    padding: 16px;
    padding-top: 0px;
    background-color: #ffffff;
  }

  .error-text {
    color: #d90102;
    font-size: 12px;
    padding: 4px 0;
  }
  .tnc-section {
    display: flex;
  }
</style>
