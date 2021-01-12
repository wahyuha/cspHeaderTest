import { writable } from "svelte/store";

export const selected = writable(null);

let sel;
selected.subscribe(s => (sel = s));
export const setSelected = s => selected.set(s);
export const getSelected = () => sel;
