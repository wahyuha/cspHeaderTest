<script>
  export let tnc = [];
  export let loaded;
  import { lazy } from "@helpers/img.js";
</script>

<div class="form-display">
  {#each tnc as item, index}
    <div class="flex-wrap">
      <img
        class="icon-flex"
        alt={item.title}
        src={item.imageURL}
        use:lazy={{ src: item.imageURL }}
      />
      <div
        class={`content-flex ff-b ${
          tnc.length - 1 === index ? "no-border" : ""
        } ${!loaded ? "text-blur" : ""}`}
      >
        {item.title}
      </div>
    </div>
  {/each}
</div>

<style>
  .form-display {
    padding: 0 16px;
    background-color: #ffffff;
  }
  .flex-wrap {
    display: flex;
    align-items: center;
  }
  .icon-flex {
    width: 24px;
    height: 24px;
    padding: 8px 16px 8px 8px;
  }
  .content-flex {
    padding: 16px 0;
    border-bottom: 1px solid #e1e1ed;
    width: 100%;
  }
  .no-border {
    border: none;
  }
</style>
