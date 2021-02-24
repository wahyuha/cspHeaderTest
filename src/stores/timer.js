import { writable } from "svelte/store";

const limit = 5 * 60;
export const timer = writable(limit);

export const ticking = () => {
  timer.update((n) => n - 1);
};

export const reset = () => {
  timer.set(limit);
};
