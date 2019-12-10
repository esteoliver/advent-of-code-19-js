const { readFile } = require('fs');
const assert = require('assert');
const IntcodeRunner = require('./IntcodeRunner');

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  const intcoder = new IntcodeRunner(data.split(',').map((n) => parseInt(n, 10)), [2]);

  intcoder.run();

  console.log(intcoder.output);
  // assert.equal(3546494377, intcoder.output[intcoder.output.length - 1]);
});