import { elasticOut } from "svelte/easing";

export function popOut(node, { duration }) {
  return {
    duration,
    css: (t) => {
      const eased = elasticOut(t);
      return `transform: scale(${eased});`;
    },
  };
}
