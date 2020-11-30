<script>
  export let title;
  export let description = "";
  export let partner = "LinkAja";
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="linkaja_partner" content={partner} />
  <meta name="linkaja_title" content={title} />
  <meta name="linkaja_description" content={description} />
</svelte:head>
