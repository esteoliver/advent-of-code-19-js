/*
--- Part Two ---

The air conditioner comes online! Its cold air feels good for a while, but then the TEST alarms start to go off. Since the air conditioner can't vent its heat anywhere but back into the spacecraft, it's actually making the air inside the ship warmer.

Instead, you'll need to use the TEST to extend the thermal radiators. Fortunately, the diagnostic program (your puzzle input) is already equipped for this. Unfortunately, your Intcode computer is not.

Your computer is only missing a few opcodes:

Opcode 5 is jump-if-true: if the first parameter is non-zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
Opcode 6 is jump-if-false: if the first parameter is zero, it sets the instruction pointer to the value from the second parameter. Otherwise, it does nothing.
Opcode 7 is less than: if the first parameter is less than the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
Opcode 8 is equals: if the first parameter is equal to the second parameter, it stores 1 in the position given by the third parameter. Otherwise, it stores 0.
Like all instructions, these instructions need to support parameter modes as described above.

Normally, after an instruction is finished, the instruction pointer increases by the number of values in that instruction. However, if the instruction modifies the instruction pointer, that value is used and the instruction pointer is not automatically increased.

For example, here are several programs that take one input, compare it to the value 8, and then produce one output:

3,9,8,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
3,9,7,9,10,9,4,9,99,-1,8 - Using position mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).
3,3,1108,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is equal to 8; output 1 (if it is) or 0 (if it is not).
3,3,1107,-1,8,3,4,3,99 - Using immediate mode, consider whether the input is less than 8; output 1 (if it is) or 0 (if it is not).

Here are some jump tests that take an input, then output 0 if the input was zero or 1 if the input was non-zero:

3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9 (using position mode)
3,3,1105,-1,9,1101,0,0,12,4,12,99,1 (using immediate mode)

Here's a larger example:

3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99
The above example program uses an input instruction to ask for a single number. The program will then output 999 if the input value is below 8, output 1000 if the input value is equal to 8, or output 1001 if the input value is greater than 8.

This time, when the TEST diagnostic program runs its input instruction to get the ID of the system to test, provide it 5, the ID for the ship's thermal radiator controller. This diagnostic test suite only outputs one number, the diagnostic code.

What is the diagnostic code for system ID 5?
*/

const fs = require('fs');
const readline = require('readline-sync');
const assert = require('assert');

const getModes = (n) => {
  const instruction = n % 100;

  const parametersMode = Math.floor(n / 100).toString(10).split('').map(i => parseInt(i));

  return [instruction, parametersMode];
}

assert.deepEqual(getModes(1002), [2, [1, 0]]);

const runIntcode = (instructions) => {
  let command, pos1, pos2, resultPos;
  let pointer = 0;
  let answer;
  let index;

  while (pointer != null && pointer < instructions.length) {
    [instruction] = instructions.slice(pointer, pointer + 1);

    [command, paramMode] = getModes(instruction);
    // console.log([command, paramMode])
    switch (command) {
      case 1:
        [param1, param2, param3] = instructions.slice(pointer + 1, pointer + 4);

        param1 = (paramMode[paramMode.length - 1] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
        param2 = (paramMode[paramMode.length - 2] ? param2 || 0 : param2 < 0 ? instructions[instructions.length + param2] : instructions[param2])

        instructions[param3] = param1 + param2
        pointer += 4
        break;
      case 2:
        [param1, param2, param3] = instructions.slice(pointer + 1, pointer + 4);

        param1 = (paramMode[paramMode.length - 1] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
        param2 = (paramMode[paramMode.length - 2] ? param2 || 0 : param2 < 0 ? instructions[instructions.length + param2] : instructions[param2])

        instructions[param3] = param1 * param2
        pointer += 4;
        break;
      case 3:
        resultPos = instructions[pointer + 1];
        answer = readline.question('input: ');
        instructions[resultPos] = parseInt(answer);
        pointer += 2;
        break;
      case 4:
        param1 = instructions[pointer + 1];
        param1 = (paramMode[0] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
        console.log(param1);
        pointer += 2;
        break;
      case 5:
        // console.log(5, paramMode)
        [param1, param2] = instructions.slice(pointer + 1, pointer + 3);

        param1 = (paramMode[paramMode.length - 1] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
        param2 = (paramMode[paramMode.length - 2] ? param2 || 0 : param2 < 0 ? instructions[instructions.length + param2] : instructions[param2])


        if (param1 != 0) {
          pointer = param2
        } else {
          pointer += 3;
        }
        break;
      case 6:
          // console.log(6, paramMode)
          [param1, param2] = instructions.slice(pointer + 1, pointer + 3);

          param1 = (paramMode[paramMode.length - 1] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
          param2 = (paramMode[paramMode.length - 2] ? param2 || 0 : param2 < 0 ? instructions[instructions.length + param2] : instructions[param2])

          if (param1 == 0) {
            pointer = param2;
          } else {
            pointer += 3;
          }
          break;
      case 7:
          // console.log(7, paramMode)
          [param1, param2, param3] = instructions.slice(pointer + 1, pointer + 4);

          param1 = (paramMode[paramMode.length - 1] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
          param2 = (paramMode[paramMode.length - 2] ? param2 || 0 : param2 < 0 ? instructions[instructions.length + param2] : instructions[param2])


          if (param1 < param2) {
            instructions[param3] = 1;
          } else {
            instructions[param3] = 0;
          }
          pointer += 4;
          break;
      case 8:
          // console.log(8, paramMode)
          [param1, param2, param3] = instructions.slice(pointer + 1, pointer + 4);

          param1 = (paramMode[paramMode.length - 1] ? param1 || 0 : param1 < 0 ? instructions[instructions.length + param1] : instructions[param1])
          param2 = (paramMode[paramMode.length - 2] ? param2 || 0 : param2 < 0 ? instructions[instructions.length + param2] : instructions[param2])

          if (param1 == param2) {
            instructions[param3] = 1;
          } else {
            instructions[param3] = 0;
          }
          pointer += 4;
          break;
      case 99:
        pointer = null;
        break;
      default:
        throw "Something went wrong";
    }
  }

  return instructions;
}

// console.log(runIntcode([3,9,8,9,10,9,4,9,99,-1,8]));
// console.log(runIntcode([3,3,1108,-1,8,3,4,3,99]));
// console.log(runIntcode([3,3,1107,-1,8,3,4,3,99]));

// console.log(runIntcode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9]));
// console.log(runIntcode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1]));

// console.log(runIntcode([3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99]));

fs.readFile('./input', "utf8", (err, data) => {
  if (err) throw err;

  let intcode = runIntcode(data.split(",").map(n => parseInt(n)));

  // console.log(intcode);
});