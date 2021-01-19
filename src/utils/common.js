export function pad(num, size) {
  let string = `${num}`;
  while (string.length < (size || 2)) {string = "0" + string;}
  return string;
}