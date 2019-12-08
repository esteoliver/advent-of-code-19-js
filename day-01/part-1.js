const { readFile } = require('fs');

const fuelToLaunch = (mass) => Math.floor(mass/3) - 2;

readFile('./input', 'utf8', (err, data) => {
  if (err) throw err;

  fuelReq = data.split("\n")
                .map( n => parseInt(n) )
                .map( mass => fuelToLaunch(mass) )
                .reduce( (acc, val) => acc + val );

  console.log(fuelReq);
});
