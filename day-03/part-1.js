const {
  readFile
} = require('fs');
const assert = require('assert');

const pathIntervals = (instructions) => {

  let pos = [0, 0];
  let trace = [];
  let steps = 0;
  let totalSteps = 0;

  const moves = {
    'R': () => {
      trace.push(['H', pos.slice(), [pos[0] + steps, pos[1]], totalSteps]);
      pos = [pos[0] + steps, pos[1]];
    },
    'L': () => {
      trace.push(['H', pos.slice(), [pos[0] - steps, pos[1]], totalSteps]);
      pos = [pos[0] - steps, pos[1]];
    },
    'U': () => {
      trace.push(['V', pos.slice(), [pos[0], pos[1] + steps], totalSteps]);
      pos = [pos[0], pos[1] + steps];
    },
    'D': () => {
      trace.push(['V', pos.slice(), [pos[0], pos[1] - steps], totalSteps]);
      pos = [pos[0], pos[1] - steps];
    }
  };

  instructions.forEach(([dir, step]) => {
    steps = parseInt(step);
    totalSteps += steps;

    moves[dir]();
  });

  return trace;
}

const parseDir = (dir) => dir.match(/([RULD])(\d*)/).slice(1, 3);

const isBetween = (x, range) => {
  return x > Math.min(...range) && x < Math.max(...range);
}

const areCrossed = ([a1, a2], [b1, b2]) => {
  return isBetween(b1[0], [a1[0], a2[0]]) && isBetween(a1[1], [b1[1], b2[1]]);
}

const getCross = (wire1, wire2) => {

  const tracedPath1 = pathIntervals(wire1.map(dir => parseDir(dir)));
  const tracedPath2 = pathIntervals(wire2.map(dir => parseDir(dir)));

  let cross = [];

  tracedPath1.forEach(([wire1Dir, wire1Point1, wire1Point2]) => {

    found = tracedPath2.forEach( ([wire2Dir, wire2Point1, wire2Point2]) => {
      if (wire1Dir == wire2Dir) return;

      if (wire1Dir == 'H') {
        areCrossed([wire1Point1, wire1Point2], [wire2Point1, wire2Point2]) && cross.push([wire2Point1[0], wire1Point1[1]]);
      } else {
        areCrossed([wire2Point1, wire2Point2], [wire1Point1, wire1Point2]) && cross.push([wire1Point1[0], wire2Point1[1]]);
      }
    });
  });

  return cross;
}

const manhattanDistance = ([x, y]) => Math.abs(x) + Math.abs(y);

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  let [wire1, wire2] = data.split("\n").map(n => n.split(','));

  const res = Math.min(...getCross(wire1, wire2).map(manhattanDistance));

  console.log(res);
  assert.equal(227, res);
});