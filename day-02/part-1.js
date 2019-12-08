const assert = require('assert');
const {
  readFile
} = require('fs');

const IntcodeRunner = require('./IntcodeRunner');

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  let intcoder = new IntcodeRunner(data.split(',').map(n => parseInt(n)));

  let intcodeRes = intcoder.run();

  // .map((mass) => fuelToLaunch(mass))
  // .reduce((acc, val) => acc + val);

  console.log(intcodeRes[0]);

  assert.equal(6730673, intcodeRes[0]);
});