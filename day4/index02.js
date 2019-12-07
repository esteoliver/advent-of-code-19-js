/*
--- Part Two ---

An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.

Given this additional criterion, but still ignoring the range rule, the following are now true:

112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
How many different passwords within the range given in your puzzle input meet all of the criteria?

Your puzzle input is still 382345-843167.
*/

const fs = require('fs');

const meetCriteria = (number) => {
  const digits = number.toString(10).split('').map( i => parseInt(i) );

  let adjacent = false;
  let previous;
  let valid;
  let lock = false;
  let presence = {};

  // console.log(digits)

  const isValid = digits.every( (digit) => {

    if (!presence[digit]) {
      presence[digit] = 1;
    } else {
      presence[digit]++;
    }

    if (!previous) {
      previous = digit;
      return true;
    }

    // console.log(previous, digit, presence)

    valid = previous <= digit;

    previous = digit;
    return valid;
  });
  // console.log(isValid)
  // console.log(adjacent)
  // console.log('-------------------------------')

  return isValid && Object.values(presence).some( (i) => i == 2 );
};

const checkRange = (r1, r2) => {
  let i = r1;
  let count = 0;

  while (i <= r2) {

    if (meetCriteria(i)) {
      count++;
    }

    i++;
  }

  return count;
}

console.log(checkRange(112233, 112233));
console.log(checkRange(123444, 123444));
console.log(checkRange(111122, 111122));

console.log(checkRange(444555, 444555));

console.log(checkRange(382345, 843167));