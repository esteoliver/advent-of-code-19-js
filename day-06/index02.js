/*
--- Part Two ---

Now, you just need to figure out how many orbital transfers you (YOU) need to take to get to Santa (SAN).

You start at the object YOU are orbiting; your destination is the object SAN is orbiting. An orbital transfer lets you move from any object to an object orbiting or orbited by that object.

For example, suppose you have the following map:

COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN
Visually, the above map of orbits looks like this:

                          YOU
                         /
        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
In this example, YOU are in orbit around K, and SAN is in orbit around I. To move from K to I, a minimum of 4 orbital transfers are required:

K to J
J to E
E to D
D to I
Afterward, the map of orbits looks like this:

        G - H       J - K - L
       /           /
COM - B - C - D - E - F
               \
                I - SAN
                 \
                  YOU
What is the minimum number of orbital transfers required to move from the object YOU are orbiting to the object SAN is orbiting? (Between the objects they are orbiting - not between YOU and SAN.)
*/

const fs = require('fs');

const findOrbit = (start, finish, spaceMap) => {

  let orbits = [[start, 0]];
  let spaceObject, steps;
  let visited = [];

  while (orbits.length > 0) {

    // console.log(orbits);

    [spaceObject, ...steps] = orbits.shift();

    if (!spaceObject) continue;

    steps = parseInt(steps);

    if (spaceObject == finish) {
      return steps - 2;
    }


    visited.push(spaceObject);


    orbits = orbits.concat(spaceMap[spaceObject].map( (obj) => {

      if (visited.includes(obj)) return [null, null];

      return [obj, steps + 1];
    }))
  }

  return -1;
}



fs.readFile('./input', "utf8", (err, data) => {
  if (err) throw err;

  let spaceMap = {};

  data.split("\n").map(n => n.split(")")).forEach((orbit) => {
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

  console.log(findOrbit('YOU', 'SAN', spaceMap));
});

fs.readFile('./input02', "utf8", (err, data) => {
  if (err) throw err;

  let spaceMap = {};

  data.split("\n").map(n => n.split(")")).forEach((orbit) => {
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

  console.log(findOrbit('YOU', 'SAN', spaceMap));
});