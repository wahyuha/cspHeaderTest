<script>
  import { onMount } from "svelte";
  import browserDetect from "browser-detect";

  const browser = browserDetect();

  let title = "Check old browser";
  let description = "";
  let partner = "LinkAja";

  let counter = 0;
  let triggerFrom = "initiation";

  $: {
    (() => {
      triggerFrom = "constructor";
      counter = counter + 2;
      console.log("wkwk");
    })();
  }

  onMount(async () => {
    triggerFrom = "onMount";
    counter++;
  });
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="linkaja_partner" content={partner} />
  <meta name="linkaja_title" content={title} />
  <meta name="linkaja_description" content={description} />
</svelte:head>
<div class="wrapper">
  <h1>Hello, Sempu</h1>
  <p>
    Counter: {counter}
  </p>
  <p>
    Triggered from: {triggerFrom}
  </p>
  <p>
    You are using browser {browser.name} v{browser.version} on {browser.os} from
    {browser.mobile ? "mobile" : "desktop"}
  </p>
</div>

<style>
</style>
