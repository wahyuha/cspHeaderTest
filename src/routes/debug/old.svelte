<script>
  import { onMount } from "svelte";

  let title = "Check old browser";
  let description = "";
  let partner = "LinkAja";

  let counter = 0;

  $: {
    (() => {
      counter = counter + 2;
    })();
  }

  onMount(async () => {
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
</div>

<style>
</style>
