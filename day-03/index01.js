/*
--- Day 3: Crossed Wires ---

The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.

Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).

The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.

For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:

...........
...........
...........
....+----+.
....|....|.
....|....|.
....|....|.
.........|.
.o-------+.
...........
Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:

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
These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.

Here are a few more examples:

R75,D30,R83,U83,L12,D49,R71,U7,L72
U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
What is the Manhattan distance from the central port to the closest intersection?
*/

const fs = require('fs');

const times = (n, cb) => {
  let i = -1;

  while (++i < n) {
    cb();
  }
}

const tracePath = (instructions) => {
  var position = [0, 0]
  var trace = []
  let dir, t;
  let steps = 0;
  instructions.forEach((inst) => {
    dir = inst[0];
    t = parseInt(inst[1]);
    steps += t;

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

    found = tracedPath2.forEach( (rangej) => {
      [dirj, pj1, pj2, sj] = rangej;

      if (diri == dirj) { return; }

      if (diri == 'H') {
        found = between(pj1[0], [pi1[0], pi2[0]]) && between(pi1[1], [pj1[1], pj2[1]])
      } else {
        found = between(pi1[0], [pj1[0], pj2[0]]) && between(pj1[1], [pi1[1], pi2[1]])
      }

      if (found) {
        if (diri == 'H') {
          cross.push([ pj1[0], pi1[1] ])
        } else {
          cross.push([ pi1[0], pj1[1] ])
        }
      }
    });
  });

  return cross;

  // return tracedPath1.filter( value => { return includePoint(tracedPath2, value); } )
}

const manhattanDistance = (point) => {
  return Math.abs(point[0]) + Math.abs(point[1])
}

console.log( Math.min(...getCross(['R8','U5','L5','D3'], ['U7','R6','D4','L4']).map(manhattanDistance)) );
console.log( Math.min(...getCross(['R75','D30','R83','U83','L12','D49','R71','U7','L72'], ['U62','R66','U55','R34','D71','R55','D58','R83']).map(manhattanDistance)) );
console.log( Math.min(...getCross(['R98','U47','R26','D63','R33','U87','L62','D20','R33','U53','R51'], ['U98','R91','D20','R16','D67','R40','U7','R15','U6','R7']).map(manhattanDistance)) );

fs.readFile('./input', "utf8", (err, data) => {
  if (err) throw err;

  let paths = data.split("\n").map( n => n.split(",") );

  console.log(Math.min(...getCross(paths[0], paths[1]).map( manhattanDistance )))
});