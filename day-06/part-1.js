const { readFile } = require('fs');
const assert = require('assert');

const numberOfOrbits = (spaceObject, spaceMap, depth) => {
  if (!spaceMap[spaceObject]) {
    return depth;
  }

  return depth + spaceMap[spaceObject].map((orbit) => numberOfOrbits(orbit, spaceMap, depth + 1))
    .reduce((acc, v) => acc + v);
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
  });

  const res = numberOfOrbits('COM', spaceMap, 0);

  console.log(res);
  assert.equal(271151, res);
});

