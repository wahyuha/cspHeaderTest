<script>
  import { fade } from "svelte/transition";
  import { stores } from "@sapper/app";
  import PageLoadingBar from "sapper-page-loading-bar/PageLoadingBar.svelte";

  const { preloading } = stores();
  let color1 = "#FF7475";
  let color2 = "#C2F3FF";

  var cathError = () => {};
  if (typeof window !== "undefined") {
    cathError = () => {
      window.onerror = function (msg, url, lineNo, columnNo, error) {
        console.log(error);
        return false;
      };
    };
  }

  cathError();
</script>

<PageLoadingBar {preloading} {color1} {color2} />

{#if !$preloading}
  <main transition:fade>
    <slot />
  </main>
{/if}

<style>
  main {
    max-width: 420px;
    margin: 0 auto;
    background-color: #eff1f6;
  }
</style>
