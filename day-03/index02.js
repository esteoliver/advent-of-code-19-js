/*
It turns out that this circuit is very timing-sensitive; you actually need to minimize the signal delay.
x
To do this, calculate the number of steps each wire takes to reach each intersection; choose the intersection where the sum of both wires' steps is lowest. If a wire visits a position on the grid multiple times, use the steps value from the first time it visits that position when calculating the total value of a specific intersection.

The number of steps a wire takes is the total number of grid squares the wire has entered to get to that location, including the intersection being considered. Again consider the example from above:

...........
.+-----+...
.|.....|...
.|..+--X-+.
.|..|..|.|.
.|.-X--+.|.
.|..|....|.
.|.......|.
.o-------+.
...........
In the above example, the intersection closest to the central port is reached after 8+5+5+2 = 20 steps by the first wire and 7+6+4+3 = 20 steps by the second wire for a total of 20+20 = 40 steps.

However, the top-right intersection is better: the first wire takes only 8+5+2 = 15 and the second wire takes only 7+6+2 = 15, a total of 15+15 = 30 steps.

Here are the best steps for the extra examples from above:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = 610 steps
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = 410 steps
What is the fewest combined steps the wires must take to reach an intersection?
*/

const fs = require('fs');

const tracePath = (instructions) => {
  var position = [0, 0]
  var trace = []
  let dir, t;
  let steps = 0;
  instructions.forEach((inst) => {
    dir = inst[0];
    t = parseInt(inst[1]);
    steps += t;

    // console.log(steps)

    switch (dir) {
      case 'R':
        trace.push(['H', position.slice(), [position[0] + t, position[1]], steps]);
        position = [position[0] + t, position[1]];
        break;
      case 'L':
        trace.push(['H', position.slice(), [position[0] - t, position[1]], steps]);
        position = [position[0] - t, position[1]];
        break;
      case 'U':
        trace.push(['V', position.slice(), [position[0], position[1] + t], steps]);
        position = [position[0], position[1] + t];
        break;
      case 'D':
        trace.push(['V', position.slice(), [position[0], position[1] - t], steps]);
        position = [position[0], position[1] - t];
        break;
    }
  });

  // console.log("===========================")
  // console.log()
  return trace;
}

const includePoint = (array, point) => {
  return array.some((elem) => {
    return elem[0] == point[0] && elem[1] == point[1]
  });
}

const between = (x, range) => {
  return x > Math.min(...range) && x < Math.max(...range);
}

const getCross = (path1, path2) => {
  const parsedPath1 = path1.map(p => p.match(/([RULD])(\d*)/).slice(1, 3));
  const parsedPath2 = path2.map(p => p.match(/([RULD])(\d*)/).slice(1, 3));



  const tracedPath1 = tracePath(parsedPath1);
  const tracedPath2 = tracePath(parsedPath2);

  // console.log(tracedPath1)
  // console.log(tracedPath2)

  let cross = [];

  let diri, pi1, pi2, si;
  let dirj, pj1, pj2, sj;
  let found;

  tracedPath1.forEach((rangei) => {
    [diri, pi1, pi2, si] = rangei;

    found = tracedPath2.forEach((rangej) => {
      [dirj, pj1, pj2, sj] = rangej;

      if (diri == dirj) {
        return;
      }

      if (diri == 'H') {
        found = between(pj1[0], [pi1[0], pi2[0]]) && between(pi1[1], [pj1[1], pj2[1]]);
      } else {
        found = between(pi1[0], [pj1[0], pj2[0]]) && between(pj1[1], [pi1[1], pi2[1]]);
      }

      if (found) {
        // console.log(si, sj)
        // console.log(pi1, pi2)
        // console.log(pj1, pj2)
        if (diri == 'H') {
          // console.log(si, sj, Math.abs( pj2[1] - pi1[1] ), Math.abs( pi2[0] - pj1[0] ))
          cross.push( si - Math.abs( pj2[1] - pi1[1] ) + sj - Math.abs( pi2[0] - pj1[0] ) );

        } else {
          // console.log([ pi1[0], pj1[1] ])
          // console.log(si, sj, Math.abs( pj2[0] - pi1[0] ), Math.abs( pi2[1] - pj1[1] ))
          cross.push( si - Math.abs( pj2[0] - pi1[0] ) + sj - Math.abs( pi2[1] - pj1[1] ) );
        }
        // console.log(cross[cross.length - 1])
        // console.log();
      }
    });
  });

  return cross;
}

const manhattanDistance = (point) => {
  return Math.abs(point[0]) + Math.abs(point[1])
}

console.log(Math.min(...getCross(['R8', 'U5', 'L5', 'D3'], ['U7', 'R6', 'D4', 'L4'])));
console.log(Math.min(...getCross(['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'], ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'])));
console.log(Math.min(...getCross(['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51'], ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'])));

fs.readFile('./input', "utf8", (err, data) => {
  if (err) throw err;

  let paths = data.split("\n").map(n => n.split(","));

  console.log(Math.min(...getCross(paths[0], paths[1])))
});