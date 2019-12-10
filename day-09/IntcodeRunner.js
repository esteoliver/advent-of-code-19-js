class IntcodeRunner {
  constructor(code, input = []) {
    this.pointer = 0;
    this.code = code.slice();
    this.initialCode = code.slice();
    this.input = input;
    this.output = [];
    this.relativeBase = 0;
  }
}

IntcodeRunner.prototype.getCommand = function getCommand() {
  return this.code[this.pointer] % 100;
};

// Mode 0 => by reference 1 => by value 2 => relative
IntcodeRunner.prototype.getArgumentValue = function getArgumentValue(arg, mode) {
  if (mode === 1) return arg;

  return this.code[this.getArgumentPos(arg, mode)];
};

IntcodeRunner.prototype.getArgumentPos = function getArgumentPos(arg, mode) {
  const reference = mode ? this.relativeBase + arg : arg;
  const pos = (reference < 0 ? this.code.length - reference : reference);

  if (this.code[pos] === undefined) {
    this.code[pos] = 0;
  }

  return pos;
};

IntcodeRunner.prototype.commands = function commands() {
  return {
    1: (arg1, arg2, output, [arg1Mode, arg2Mode, outputMode]) => {
      this.code[this.getArgumentPos(output, outputMode)] = this.getArgumentValue(arg1, arg1Mode)
                          + this.getArgumentValue(arg2, arg2Mode);
      this.pointer += 4;
    },
    2: (arg1, arg2, output, [arg1Mode, arg2Mode, outputMode]) => {
      this.code[this.getArgumentPos(output, outputMode)] = this.getArgumentValue(arg1, arg1Mode)
                          * this.getArgumentValue(arg2, arg2Mode);
      this.pointer += 4;
    },
    3: (input, [inputMode]) => {
      if (!this.input.length) {
        this.halt = true;
      } else {
        this.halt = false;
        this.code[this.getArgumentPos(input, inputMode)] = this.input.shift();
        this.pointer += 2;
      }
    },
    4: (arg1, [arg1Mode]) => {
      this.output.push(this.getArgumentValue(arg1, arg1Mode));
      // console.log(arg1, this.getArgumentValue(arg1, arg1Mode));
      this.pointer += 2;
    },
    5: (arg1, arg2, [arg1Mode, arg2Mode]) => {
      if (this.getArgumentValue(arg1, arg1Mode) !== 0) {
        this.pointer = this.getArgumentValue(arg2, arg2Mode);
      } else {
        this.pointer += 3;
      }
    },
    6: (arg1, arg2, [arg1Mode, arg2Mode]) => {
      if (this.getArgumentValue(arg1, arg1Mode) === 0) {
        this.pointer = this.getArgumentValue(arg2, arg2Mode);
      } else {
        this.pointer += 3;
      }
    },
    7: (arg1, arg2, output, [arg1Mode, arg2Mode, outputMode]) => {
      if (this.getArgumentValue(arg1, arg1Mode) < this.getArgumentValue(arg2, arg2Mode)) {
        this.code[this.getArgumentPos(output, outputMode)] = 1;
      } else {
        this.code[this.getArgumentPos(output, outputMode)] = 0;
      }
      this.pointer += 4;
    },
    8: (arg1, arg2, output, [arg1Mode, arg2Mode, outputMode]) => {
      if (this.getArgumentValue(arg1, arg1Mode) === this.getArgumentValue(arg2, arg2Mode)) {
        this.code[this.getArgumentPos(output, outputMode)] = 1;
      } else {
        this.code[this.getArgumentPos(output, outputMode)] = 0;
      }
      this.pointer += 4;
    },
    9: (arg1, [arg1Mode]) => {
      this.relativeBase += this.getArgumentValue(arg1, arg1Mode);
      this.pointer += 2;
    },
    99: () => {
      this.pointer = null;
      this.ended = true;
    },
  };
};

IntcodeRunner.prototype.nArguments = function nArguments(command) {
  switch (command) {
    case 1:
    case 2:
    case 7:
    case 8: return 4;
    case 3:
    case 4:
    case 9: return 2;
    case 5:
    case 6: return 3;
    case 99:
    default: return 1;
  }
};

IntcodeRunner.prototype.commandArguments = function commandArguments(command) {
  return this.code.slice(this.pointer + 1, this.pointer + this.nArguments(command));
};

IntcodeRunner.prototype.argumentsMode = function argumentsMode() {
  return Math.floor(this.code[this.pointer] / 100)
    .toString(10)
    .split('')
    .map((i) => parseInt(i, 10))
    .reverse();
};

IntcodeRunner.prototype.run = function run() {
  let args;
  this.halt = false;
  while (this.pointer != null && !this.halt) {
    args = this.commandArguments(this.getCommand());

    this.commands()[this.getCommand()](
      ...args,
      this.argumentsMode(),
    );
  }
  return this.code;
};

IntcodeRunner.prototype.reset = function reset(code = this.initialCode) {
  this.code = code.slice();
  this.initialCode = code;
  this.pointer = 0;
  this.ended = false;
  this.input = [];
  this.output = [];
};

module.exports = IntcodeRunner;
