<script>
  import { onMount } from "svelte";
  import * as Sentry from "@sentry/browser";
  import { goto, stores } from "@sapper/app";
  import { setCustomer } from "@stores/customer";
  import { Checkbox } from "seruni";
  import Meta from "@components/meta/index.svelte";
  import clientHttp from "@utils/http/client";
  import { baseUrl } from "@constants/url";
  import tncConst from "@constants/tnc";
  import { lazy } from "@helpers/img.js";
  import DisplayedInfo from "./_components/displayedInfo.svelte";
  import Button from "@components/button/index.svelte";
  import Modal from "@components/modal/full.svelte";
  import TncContent from "./_components/tncContent.svelte";

  const { session } = stores();
  const sessionClient = $session;

  let accept = false;
  let tnc = tncConst;
  let isRegister = false;
  let partnerName = "merchant LinkAja";
  let loaded = false;
  $: showModal = false;

  onMount(async () => {
    Sentry.captureMessage("Register Page Mounted");
    if (process.env.SAPPER_APP_CRYPTO_MODE === "false") {
      Sentry.captureMessage("SAPPER_APP_CRYPTO_MODE is false");
      await fetchCheck();
    } else {
      Sentry.captureMessage("SAPPER_APP_CRYPTO_MODE is true");
      const loadedInt = setInterval(() => {
        Sentry.captureMessage("Waiting for crypto to load");
        if (typeof JSEncrypt !== "undefined") {
          Sentry.captureMessage("JSEncrypt loaded");
          fetchCheck();
          Sentry.captureMessage("fetchCheck loaded");
          clearInterval(loadedInt);
          Sentry.captureMessage("clearInterval cleared");
          return true;
        }
      }, 300);
    }
  });

  async function fetchCheck() {
    await clientHttp(sessionClient)
      .post("/check")
      .then((response) => {
        Sentry.captureMessage("Register Page FetchCheck Success");
        const { data, status } = response.data;
        if (status === "00") {
          Sentry.captureMessage("Register Page FetchCheck 00");
          partnerName = data.partnerName;
          isRegister = data.isRegister;
          if (data.tnc && data.tnc.length) {
            tnc = data.tnc;
          }
          setCustomer({
            customerNumber: data.customerNumber,
            backToStoreUri: data.backToStoreUri,
            backToStoreFailedUri: data.backToStoreFailedUri,
            editable: data.editable,
            partnerName: data.partnerName,
            name: data.name,
            email: data.email,
            state: data.state,
          });
          Sentry.captureMessage("setCustomer");
        } else if (status === "990") {
          Sentry.captureMessage("Register Page FetchCheck 990");
          goto(`${baseUrl}/debit/error/unmatched`);
        } else {
          Sentry.captureMessage("Register Page FetchCheck else");
          const queryCode = status ? `?code=${status}` : "";
          goto(`${baseUrl}/debit/error${queryCode}`);
        }
        Sentry.captureMessage("Register Page FetchCheck end");
      })
      .catch((e) => {
        Sentry.captureException(e);
        console.error(e);
        goto(`${baseUrl}/debit/error?code=999`);
      })
      .then(() => {
        Sentry.captureMessage("Register Page FetchCheck then loaded");
        loaded = true;
      });
  }

  async function handleNextStep() {
    if (isRegister) {
      await clientHttp(sessionClient)
        .post("/otp/request")
        .then((response) => {
          const { data } = response.data;
          setCustomer({
            state: data.state,
            customerNumber: data.customerNumber,
          });
          return goto(`${baseUrl}/register/otp`);
        })
        .then(() => {
          loaded = true;
        });
      return false;
    }
    return goto(`${baseUrl}/debit/pin`);
  }
</script>

<Meta title="Halaman Persetujuan" />
<div class="wrapper">
  <div class="direction-wrap">
    <img
      class="logo"
      alt="LinkAja"
      src="images/logo-main.png"
      use:lazy={{ src: "images/logo-main.png" }}
    />
    <p class="info">
      {#if loaded}
        {#if isRegister}
          Dengan daftar dan menghubungkan LinkAja, kamu akan memberikan info di
          bawah ini ke Livin’ Mandiri
        {:else}
          Dengan menghubungkan LinkAja, kamu akan memberikan info di bawah ini
          ke
          <span class={"ff-b"}>{partnerName}</span>
        {/if}
      {:else}
        <span class={"text-blur"}>{partnerName}</span>
      {/if}
    </p>
  </div>

  <DisplayedInfo {tnc} {loaded} />

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
    <Button disabled={!accept} onClick={handleNextStep}>Lanjut</Button>
  </div>
</div>
{#if showModal}
  <Modal
    on:cancel={() => (showModal = false)}
    on:close={() => (showModal = false)}
  >
    <TncContent />
  </Modal>
{/if}

<style>
  .direction-wrap {
    padding: 16px;
    background-color: #ffffff;
  }
  .logo {
    width: 48px;
    height: 48px;
    margin: 8px 0;
  }
  .info {
    margin: 0;
  }
  .action-wrap {
    margin-top: 8px;
    padding: 16px 16px 32px;
    background-color: #ffffff;
  }
  .tnc-section {
    display: flex;
  }
</style>
