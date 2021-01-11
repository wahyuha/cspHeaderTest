<script context="module">
  export const ACCORDION = {};
</script>

<script>
  import { getContext } from "svelte";

  import Header from "@components/accordion/header.svelte";
  import Content from "@components/accordion/content.svelte";

  export let key;
  const { handleChange, selected } = getContext(ACCORDION);
  $: open = $selected === key;
</script>

<Header on:click={handleChange.bind(null, key)} {open}>
  <slot name="header" />
</Header>
<Content {open}>
  <slot name="content" />
</Content>
