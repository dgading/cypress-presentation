export function generateHelloWorld(str) {
  let my_string = str.split("").reverse().join("");
  return `${my_string}!`;
}
