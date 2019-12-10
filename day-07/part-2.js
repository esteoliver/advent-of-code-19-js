const { readFile } = require('fs');
const assert = require('assert');
const { permutation } = require('js-combinatorics');
const IntcodeRunner = require('./IntcodeRunner');


readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  const intcode = data.split(',').map((i) => parseInt(i, 10));
  const intcodeRunners = [
    new IntcodeRunner(intcode),
    new IntcodeRunner(intcode),
    new IntcodeRunner(intcode),
    new IntcodeRunner(intcode),
    new IntcodeRunner(intcode),
  ];
  let startingInput = 0;
  let max = 0;
  let loop = 0;

  permutation([9, 8, 7, 6, 5]).forEach((phaseSetting) => {
    // console.log(phaseSetting)
    // phaseSetting = [ 9, 8, 6, 7, 5 ]
    phaseSetting.forEach((phase, index) => {
      intcodeRunners[index].input.push(phase, startingInput);
      intcodeRunners[index].run();
      startingInput = intcodeRunners[index].output[intcodeRunners[index].output.length - 1];
    });

    while (!intcodeRunners[4].ended) {
      intcodeRunners[loop].input.push(startingInput);
      intcodeRunners[loop].run();
      startingInput = intcodeRunners[loop].output[intcodeRunners[loop].output.length - 1];
      loop = (loop + 1) % 5;
    }

    intcodeRunners.forEach((intcodeRunner) => intcodeRunner.reset());
    // console.log(startingInput);
    max = Math.max(max, startingInput);
    startingInput = 0;
  });

  console.log(max);
  assert.equal(4374895, max);
});
