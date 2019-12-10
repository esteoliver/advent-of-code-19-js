const { readFile } = require('fs');
const assert = require('assert');

const chunk = function* chunk(arr, size) {
  while (arr.length) {
    yield arr.splice(0, size);
  }
};

readFile('./input', 'utf8', (err, data) => {

  const it = chunk(data.split('').map((i) => parseInt(i, 10)), 25 * 6);
  const layerCounter = [];
  let i = 0;
  let result = it.next();

  while (!result.done) {
    layerCounter[i] = { 0: 0, 1: 0, 2: 0 };

    result.value.forEach((bit) => {
      layerCounter[i][bit] += 1;
    });

    result = it.next();
    i += 1;
  }

  // console.log(layerCounter)
  const resp = layerCounter.reduce((res, layer) => (res[0] > layer[0] ? layer : res));

  console.log(resp[1] * resp[2]);
  assert.equal(1215, resp[1] * resp[2])
});
