import { writable } from "svelte/store";

export const customer = writable({});

export const setCustomer = (data) => {
  customer.update((c) => ({ ...c, ...data }));
};
