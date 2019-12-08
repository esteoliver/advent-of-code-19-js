const { readFile } = require('fs');

const fuelToLaunch = (mass) => Math.floor(mass/3) - 2;

const refuelToLaunch = (mass) => {
  const partial = fuelToLaunch(mass);

  if (partial <= 0) return 0;

  return partial + refuelToLaunch(partial);
}

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  fuelReq = data.split("\n")
                .map( n => parseInt(n) )
                .map( mass => refuelToLaunch(mass) )
                .reduce( (acc, val) => acc + val );

  console.log(fuelReq);
});