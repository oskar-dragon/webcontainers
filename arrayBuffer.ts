console.log('CIPA');

const buffer = new ArrayBuffer(16);
const view = new Uint8Array(buffer);

view[0] = 42;
view[1] = 40;

console.log(view[0], buffer);
