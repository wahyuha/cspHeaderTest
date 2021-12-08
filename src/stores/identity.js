import { writable } from "svelte/store";

export const identity = writable({});

export const setIdentity = (data) => {
  identity.update((user) => ({ ...user, ...data }));
};
