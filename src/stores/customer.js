import { writable } from "svelte/store";

export const customer = writable({});

export const setCustomerNumber = (customerNumber) => {
  customer.update(c => ({ number: customerNumber }));
};