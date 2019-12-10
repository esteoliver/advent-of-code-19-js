const { readFile } = require('fs');
const assert = require('assert');

readFile('./input', 'utf8', (err, data) => {

  const pixels = [];
  const IMAGE_SIZE = 25 * 6;

  data.split('').map((i) => parseInt(i, 10)).forEach((bit, index) => {
    if (!pixels[index % IMAGE_SIZE]) pixels[index % IMAGE_SIZE] = [];

    pixels[index % IMAGE_SIZE].push(bit);
  });

  const resp = pixels.map((bits) => bits.find((bit) => bit === 0 || bit === 1));

  while (resp.length) {
    console.log(resp.splice(0, 25).join(''))
  }
});

// 1000 0 1001 0 0110 0 1110 0 10010
// 1000 0 1001 0 1001 0 1001 0 10010
// 1000 0 1111 0 1000 0 1001 0 11110
// 1000 0 1001 0 1000 0 1110 0 10010
// 1000 0 1001 0 1001 0 1000 0 10010
// 1111 0 1001 0 0110 0 1000 0 10010

// LHCPH