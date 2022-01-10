<script>
  // import { goto } from "@sapper/app";
  // import { baseUrl } from "@constants/url";

  export let status;
  export let error;

  const dev = process.env.NODE_ENV === "development";

  let label = "Halaman Gagal Dimuat";
  let description =
    "Terjadi kesalahan pada server kami. Coba dalam beberapa saat lagi, ya!";
  if (status === 404) {
    label = "Waduh, halaman ini tidak ada";
    description = "Mungkin kamu salah jalan atau alamat. Ayo balik aja!";
  }
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<div class="wrapper">
  <div class="page-wrap full-height">
    <h2 class="tt-info ff-b">{label}</h2>
    <p class="info">{description}</p>
    {#if dev && error.stack}
      <pre>{error.stack}</pre>
    {/if}
  </div>
</div>

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
