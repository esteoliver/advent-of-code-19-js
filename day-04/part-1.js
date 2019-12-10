const assert = require('assert');

const meetCriteria = (number) => {
  let [prev, ...digits] = number.toString(10).split('').map(i => parseInt(i, 10));
  let withAdjacent = false;

  return digits.every((digit) => {
    if (!withAdjacent) withAdjacent = prev === digit;

    return prev <= digit && (prev = digit);
  }) && withAdjacent;
};

let i = 382345;
let count = 0;

while (i <= 843167) {
  if (meetCriteria(i)) count += 1;
  i += 1;
}

console.log(count);
assert.equal(count, 460)