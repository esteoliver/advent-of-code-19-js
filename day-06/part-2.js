const { readFile } = require('fs');
const assert = require('assert');

const findOrbit = (start, finish, spaceMap) => {
  let orbits = [[start, 0]];
  let spaceObject;
  let steps;
  const visited = [];

  while (orbits.length > 0) {
    [spaceObject, ...steps] = orbits.shift();

    if (!spaceObject) continue;

    steps = parseInt(steps, 10);

    if (spaceObject === finish) {
      return steps - 2;
    }

    visited.push(spaceObject);

    orbits = orbits.concat(spaceMap[spaceObject].map((obj) => {
      if (visited.includes(obj)) return [null, null];

      return [obj, steps + 1];
    }));
  }

  return -1;
};

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  const spaceMap = {};

  data.split('\n').map((n) => n.split(')')).forEach((orbit) => {
    if (!spaceMap[orbit[0]]) {
      spaceMap[orbit[0]] = [orbit[1]];
    } else {
      spaceMap[orbit[0]].push(orbit[1]);
    }

    if (!spaceMap[orbit[1]]) {
      spaceMap[orbit[1]] = [orbit[0]];
    } else {
      spaceMap[orbit[1]].push(orbit[0]);
    }
  });

  const res = findOrbit('YOU', 'SAN', spaceMap);

  console.log(res);
  assert.equal(388, res);
});