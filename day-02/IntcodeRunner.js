class IntcodeRunner {
  constructor(code) {
    this.pointer = 0;
    this.code = code.slice();
    this._code = code.slice();
  }
};

IntcodeRunner.prototype.getCommand = function () {
  return this.code[this.pointer]
};

IntcodeRunner.prototype.commands = function () {
  return {
    1: (arg1, arg2, output) => {
      this.code[output] = this.code[arg1] + this.code[arg2];
      this.pointer += 4;
    },
    2: (arg1, arg2, output) => {
      this.code[output] = this.code[arg1] * this.code[arg2];
      this.pointer += 4;
    },
    99: () => {
      this.pointer = null;
    }
  }
};

IntcodeRunner.prototype.arguments = function () {
  return {
    1: () => this.code.slice(this.pointer + 1, this.pointer + 4),
    2: () => this.code.slice(this.pointer + 1, this.pointer + 4),
    99: () => []
  }
};

IntcodeRunner.prototype.run = function () {
  while (this.pointer != null) {
    this.commands()[this.getCommand()](...this.arguments()[this.getCommand()]());
  }
  return this.code;
};

IntcodeRunner.prototype.reset = function (code = this._code) {
  this.code = code;
  this._code = code;
  this.pointer = 0;
};

module.exports = IntcodeRunner;