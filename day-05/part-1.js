const { readFile } = require('fs');
const IntcodeRunner = require('./IntcodeRunner');
const assert = require('assert');

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  const intcoder = new IntcodeRunner(data.split(',').map((n) => parseInt(n, 10)), [1]);

  intcoder.run();

  console.log(intcoder.output);
  assert.equal(13818007, intcoder.output[intcoder.output.length - 1]);
});