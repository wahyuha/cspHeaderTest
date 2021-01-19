<script>
  import { onMount } from "svelte";
  import { timer, ticking, reset } from "@stores/timer";
  import { pad } from "@utils/common";
  import { goto } from "@sapper/app";
  import { baseUrl } from "@constants/url";

  $: minutes = Math.floor($timer / 60);
  $: seconds = Math.floor($timer - minutes * 60);

  function listenEvent() {
    if ($timer <= 0) {
      reset();
      setTimeout(() => goto(`${baseUrl}/debit/error/unauthorized`), 1000);
    }
  }

  onMount(() => {
    setInterval(() => {
      ticking();
      listenEvent();
    }, 1000);
  });
</script>

<style>
  .counter {
    padding: 16px 0 8px;
    text-align: center;
  }
</style>

<div class="counter">Berakhir dalam {pad(minutes, 2)}:{pad(seconds, 2)}</div>