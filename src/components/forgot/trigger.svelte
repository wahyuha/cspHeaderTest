<script>
  import { createEventDispatcher } from "svelte";
  import { lazy } from "@helpers/img.js";

  const dispatch = createEventDispatcher();
</script>

<style>
  .pad-pin {
    padding: 0 0 16px;
  }
  .flex-wrap {
		display: flex;
		align-items: center;
	}
	.icon-flex {
		width: 24px;
		padding: 8px 16px 8px 8px;
	}
  .icon-right {
		width: 6px;
		padding: 8px;
	}
	.content-flex {
		width: 100%;
  }
</style>

<div class="flex-wrap pad-pin">
  <img
    class="icon-flex"
    alt="call-linkaja"
    src="icons/call.png"
    use:lazy={{ src: "icons/call.png" }} />
  <div class="content-flex" on:click={() => dispatch("close")}>
    <div class="ff-b">Lupa PIN?</div>
    <span>Cek cara Reset PIN di sini</span>
  </div>
  <img
    class="icon-right"
    alt="go-to-forgot-pin"
    src="icons/arrow-right.png"
    on:click={() => dispatch("close")}
    use:lazy={{ src: "icons/arrow-right.png" }} />
</div>