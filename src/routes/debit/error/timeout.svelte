<script>
  import { goto, stores } from "@sapper/app";
  import { baseUrl } from "@constants/url";
  import { lazy } from "@helpers/img.js";
  import { popOut } from "@utils/animation";
  import Meta from "@components/meta/index.svelte";
  import Button from "@components/button/index.svelte";

  const { session } = stores();
  const { extSessionId } = $session;
</script>

<Meta title="Penyambungan Akun Belum Berhasil" />
<div class="wrapper">
  <div class="page-wrap full-height">
    <img
      class="error-image"
      alt="Penyambungan Akun Belum Berhasil"
      src="images/timeout.png"
      use:lazy={{ src: "images/timeout.png" }}
    />
    <div in:popOut={{ duration: 700 }}>
      <h2 class="tt-info ff-b">Penyambungan Akun Belum Berhasil</h2>
      <p class="info">
        Kamu sudah melewati batas waktu yang telah ditentukan. Mohon ulangi
        proses dari awal, ya!
      </p>
    </div>
    <div class="space-between">
      <Button
        full
        onClick={() => goto(`${baseUrl}/debit/reinit?s=${extSessionId}`)}
      >
        Ulangi
      </Button>
      <Button
        full
        class="no-outline mt-20"
        onClick={() => goto(`${baseUrl}/debit/exit`)}
      >
        Tutup
      </Button>
    </div>
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
  .error-image {
    width: 100%;
    min-height: 164px;
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
  .space-between {
    justify-content: space-between;
  }
</style>
