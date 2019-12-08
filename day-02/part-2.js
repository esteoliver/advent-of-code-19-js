const fs = require('fs');
const assert = require('assert');
const IntcodeRunner = require('./IntcodeRunner');

const findValue = (intcode) => {
  let noun = verb = 0;
  let intcodeTest;

  const intcodeRunner = new IntcodeRunner(intcode);

  while (noun < 100) {
    while (verb < 100) {
      intcodeTest = intcode.slice();

      intcodeTest[1] = noun;
      intcodeTest[2] = verb;

      intcodeRunner.reset(intcodeTest);

      try {
        if (intcodeRunner.run()[0] == 19690720) {
          return [noun, verb];
        }
        verb++;
      } catch(e) {
        verb++;
        continue;
      }
    }
    noun++;
    verb = 0;
  }

  return [];
}

fs.readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  let intcode = data.split(',').map(n => parseInt(n));

  const values = findValue(intcode);

  assert.equal(3749, 100 * values[0] + values[1]);
  console.log(100 * values[0] + values[1])
});