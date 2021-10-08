<script>
  import { onMount } from "svelte";
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
  let showModal = false;
  $: consentInfo = !isRegister
    ? "Dengan menghubungkan LinkAja, kamu akan memberikan info di bawah ini ke"
    : "Dengan daftar dan menghubungkan LinkAja, kamu akan memberikan info di bawah ini ke Livin’ Mandiri";

  onMount(async () => {
    if (process.env.SAPPER_APP_CRYPTO_MODE === "false") {
      await fetchCheck();
    } else {
      const loadedInt = setInterval(() => {
        if (typeof JSEncrypt !== "undefined") {
          fetchCheck();
          clearInterval(loadedInt);
          return true;
        }
      }, 300);
    }
  });

  async function fetchCheck() {
    await clientHttp(sessionClient)
      .post("/check")
      .then((response) => {
        const { data, status } = response.data;
        if (status === "00") {
          partnerName = data.partnerName;
          isRegister = data.isRegister;
          console.log("isRegister :", isRegister);
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
          });
        } else if (status === "990") {
          goto(`${baseUrl}/debit/error/unmatched`);
        } else {
          const queryCode = status ? `?code=${status}` : "";
          goto(`${baseUrl}/debit/error${queryCode}`);
        }
      })
      .catch((e) => {
        console.error(e);
        goto(`${baseUrl}/debit/error?code=999`);
      })
      .then(() => {
        loaded = true;
      });
  }

  async function handleNextStep() {
    if (isRegister) {
      await clientHttp(sessionClient)
        .post("/otp/request")
        .then(() => {
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
      {loaded ? consentInfo : ""}
      <span class={loaded ? "ff-b" : "text-blur"}>{partnerName}</span>
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
