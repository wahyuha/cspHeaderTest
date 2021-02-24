<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { goto } from "@sapper/app";
  import { customer } from "@stores/customer";
  import Meta from "@components/meta/index.svelte";
  import { lazy } from "@helpers/img.js";

  onMount(async () => {
    const backToStoreUri = $customer.backToStoreUri;
    setTimeout(() => {
      backToStoreUri && goto(backToStoreUri);
    }, 3000);
  });
</script>

<Meta title="Pembayaran Berhasil" />
<div class="wrapper-clean t-c">
  <div class="banner-wrap" in:fly={{ y: 300, duration: 700 }}>
    <img
      class="banner-img"
      alt="Authentication LinkAja"
      src="images/success.png"
      use:lazy={{ src: "images/success.png" }}
    />
  </div>
  <div in:fly={{ y: -200, duration: 1700 }}>
    <h2 class="success-title ff-b">Penyambungan Berhasil!</h2>
    <p class="success-text">
      Tunggu sebentar, ya, kamu akan segera diarahkan kembali ke situs partner
    </p>
  </div>
</div>

<style>
  .t-c {
    text-align: center;
  }
  .banner-wrap {
    overflow: hidden;
    margin-top: 60px;
    padding: 16px 0;
  }
  .banner-img {
    width: 100%;
  }
  .success-title {
    font-size: 16px;
  }
  .success-text {
    padding: 0 16px;
  }
</style>
