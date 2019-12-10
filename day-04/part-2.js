const assert = require('assert');

const meetCriteria = (number) => {
  const digits = number.toString(10).split('').map(i => parseInt(i, 10));
  let prev;
  const digitCount = {};

  return digits.every((digit) => {
    if (!digitCount[digit]) {
      digitCount[digit] = 1;
    } else {
      digitCount[digit] += 1;
    }

    if (!prev) {
      prev = digit;
      return true;
    }

    return prev <= digit && (prev = digit);
  }) && Object.values(digitCount).some( (i) => i == 2 );
};

let i = 382345;
let count = 0;

while (i <= 843167) {
  if (meetCriteria(i)) count += 1;
  i += 1;
}

console.log(count);
assert.equal(count, 290)