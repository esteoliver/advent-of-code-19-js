/*
--- Day 4: Secure Container ---

You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.

However, they do remember a few key facts about the password:

It is a six-digit number.
The value is within the range given in your puzzle input.
Two adjacent digits are the same (like 22 in 122345).
Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
Other than the range rule, the following are true:

111111 meets these criteria (double 11, never decreases).
223450 does not meet these criteria (decreasing pair of digits 50).
123789 does not meet these criteria (no double).
How many different passwords within the range given in your puzzle input meet these criteria?

Your puzzle input is 382345-843167.
*/

const fs = require('fs');

const meetCriteria = (number) => {
  const digits = number.toString(10).split('').map( i => parseInt(i) );

  let adjacent = false;
  let previous;
  let valid;

  // console.log(digits)

  const isValid = digits.every( (digit) => {
    if (!previous) {
      previous = digit;
      return true;
    }

    valid = previous <= digit;

    if (!adjacent) { adjacent = previous == digit }

    previous = digit;
    return valid;
  });
  // console.log(isValid)
  // console.log(adjacent)
  // console.log('-------------------------------')

  return isValid && adjacent;
};

const checkRange = (r1, r2) => {
  let i = r1;
  let count = 0;

  while (i <= r2) {

    if (meetCriteria(i)) { count++; }

    i++;
  }

  return count;
}

console.log(checkRange(111111, 111111));
console.log(checkRange(223450, 223450));
console.log(checkRange(123789, 123789));


console.log(checkRange(382345, 843167));