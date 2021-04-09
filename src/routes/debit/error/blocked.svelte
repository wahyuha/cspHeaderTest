<script>
  import { onMount } from "svelte";
  import { popOut } from "@utils/animation";
  import { goto } from "@sapper/app";
  import { baseUrl } from "@constants/url";
  import Meta from "@components/meta/index.svelte";
  import { lazy } from "@helpers/img.js";
  import Button from "@components/button/index.svelte";
  import { customer } from "@stores/customer";

  let animate = false;
  const backToStoreUri = $customer.backToStoreFailedUri || $customer.backToStoreUri;

  onMount(async () => {
    setTimeout(() => (animate = true), 100);
  });
</script>

<Meta title="Akun Terblokir" />

{#if animate}
  <div class="wrapper">
    <div class="page-wrap full-height">
      <img
        class="error-image"
        alt="Akun Terblokir"
        src="images/blocked.png"
        use:lazy={{ src: "images/blocked.png" }}
      />
      <div in:popOut={{ duration: 700 }}>
        <h2 class="tt-info ff-b">Akun Tidak Dapat Diakses</h2>
        <p class="info">
          Saat ini, kamu tidak bisa masuk ke akun kamu.
          Hubungi Call Center LinkAja untuk info lebih lanjut!
        </p>
      </div>
      <Button type="half" onClick={() => goto(backToStoreUri)}>
        Tutup
      </Button>
    </div>
  </div>
{/if}

<style>
  .page-wrap {
    padding: 16px;
    background-color: #ffffff;
    padding-top: 20%;
    text-align: center;
  }
  .full-height {
    min-height: 100vh;
  }
  .error-image {
    width: 100%;
    margin: 8px auto;
  }
  .tt-info {
    font-size: 16px;
    line-height: 24px;
  }
  .info {
    margin: 0;
    color: #52575c;
    padding-bottom: 40px;
  }
</style>
