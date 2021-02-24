<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { timer, ticking, reset } from "@stores/timer";
  import { pad } from "@utils/common";
  import { goto } from "@sapper/app";
  import { baseUrl } from "@constants/url";

  const dispatch = createEventDispatcher();

  $: minutes = Math.floor($timer / 60);
  $: seconds = Math.floor($timer - minutes * 60);

  let timerInt;

  function listenEvent() {
    if ($timer <= 0) {
      clearInterval(timerInt);
      dispatch("limit", true);
      reset();
      setTimeout(() => goto(`${baseUrl}/debit/error/timeout`), 2000);
    }
  }

  onMount(() => {
    timerInt = setInterval(() => {
      ticking();
      listenEvent();
    }, 1000);

    return () => {
      clearInterval(timerInt);
    };
  });
</script>

<div class="counter">Berakhir dalam {pad(minutes, 2)}:{pad(seconds, 2)}</div>

<style>
  .counter {
    padding: 16px 0 8px;
    text-align: center;
  }
</style>
