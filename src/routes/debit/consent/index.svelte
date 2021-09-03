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

  let tnc = [
    {
      title: "Nomor handphone",
      imageURL: "icons/phone.png",
    },
    {
      title: "Nama akun Linkaja",
      imageURL: "icons/avatar.png",
    },
    {
      title: "Info saldo Linkaja",
      imageURL: "icons/idr.png",
    },
  ];
  let partnerName = "merchant LinkAja";
  let loaded = false;
  $: showModal = false;

  onMount(async () => {
    setTimeout(async () => {
      await clientHttp(sessionClient)
        .post("/check")
        .then((response) => {
          const { data, status } = response.data;
          if (status === "00") {
            partnerName = data.partnerName;
            if (data.tnc && data.tnc.length) {
              tnc = data.tnc;
            }
            setCustomer({
              customerNumber: data.customerNumber,
              backToStoreUri: data.backToStoreUri,
              backToStoreFailedUri: data.backToStoreFailedUri,
              editable: data.editable,
              partnerName: data.partnerName,
            });
          } else {
            const queryCode = status ? `?code=${status}` : "";
            goto(`${baseUrl}/debit/error${queryCode}`);
          }
        })
        .catch((e) => {
          console.error(e);
          goto(`${baseUrl}/debit/error?code=999`);
        })
        .finally(() => {
          loaded = true;
        });
    }, 800)
  });
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
      Dengan menghubungkan LinkAja, kamu akan memberikan info di bawah ini ke <span
        class={loaded ? "ff-b" : "text-blur"}>{partnerName}</span
      >
    </p>
  </div>

  <DisplayedInfo {tnc} {loaded} />

  <div class="action-wrap">
    <p class="action-info">
      Dengan klik 'Lanjut', kamu telah membaca dan menyetujui <a
        href
        on:click={(e) => {
          e.preventDefault();
          showModal = true;
        }}
        class="tnc-link">Syarat dan Ketentuan</a
      > yang berlaku
    </p>
    <Button disabled={!loaded} onClick={() => goto(`${baseUrl}/debit/pin`)}>
      Lanjut
    </Button>
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
</style>
