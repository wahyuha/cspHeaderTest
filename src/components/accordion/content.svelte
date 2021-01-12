<script>
  import { cubicOut, cubicIn } from "svelte/easing";

  export let open;

  function customslide(
    node,
    { delay = 0, duration = 100, easing: easing$1 = cubicInOut }
  ) {
    const style = getComputedStyle(node);
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);
    return {
      delay,
      duration,
      easing: easing$1,
      css: t => {
        return (
          `overflow: hidden;` +
          `opacity: 0;` +
          `height: ${t * height}px;` +
          `padding-top: ${t * padding_top}px;` +
          `padding-bottom: ${t * padding_bottom}px;` +
          `margin-top: ${t * margin_top}px;` +
          `margin-bottom: ${t * margin_bottom}px;` +
          `border-top-width: ${t * border_top_width}px;` +
          `border-bottom-width: ${t * border_bottom_width}px;`
        );
      },
    };
  }
</script>

{#if open}
  <div
    in:customslide={{ easing: cubicIn }}
    out:customslide={{ easing: cubicOut }}>
    <slot />
  </div>
{/if}
