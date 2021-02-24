import { writable } from "svelte/store";

const remainInit = 3;
export const remain = writable(remainInit);

export const decreaseRemain = () => {
  remain.update((n) => n - 1);
};

const limit = 1 * 60;
export const timer = writable(limit);

export const ticking = () => {
  timer.update((n) => n - 1);
};

export const reset = () => {
  timer.set(limit);
};
