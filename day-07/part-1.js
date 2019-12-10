const { readFile } = require('fs');
const assert = require('assert');
const { permutation } = require('js-combinatorics');
const IntcodeRunner = require('./IntcodeRunner');


readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  const intcode = data.split(',').map((i) => parseInt(i, 10));
  let intcodeRunners;
  let startingInput = 0;
  let max = 0;

  permutation([4, 3, 2, 1, 0]).forEach((phaseSetting) => {
    phaseSetting.forEach((phase) => {
      intcodeRunner = new IntcodeRunner(intcode, [phase, startingInput]);
      intcodeRunner.run();
      startingInput = intcodeRunner.output[intcodeRunner.output.length - 1];
    });

    max = Math.max(max, startingInput);
    startingInput = 0;
  });

  console.log(max);
  assert.equal(359142, max);
});

// 359142