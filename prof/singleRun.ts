import { Route } from '../src/model/route';
import { airDatabase } from './../src/database/database';
import { Dijkstra } from './../src/math/dijkstra';

start();

async function start() {
  await airDatabase.load();
  runOnce('TLL', 'HNL', 4, false);
  runOnce('TLL', 'HNL', 5, false);
  runOnce('LGW', 'AAL', 4, false);
  runOnce('LGW', 'AAL', 4, true);
  runOnce('LHR', 'AAL', 1, false);
  runOnce('LHR', 'AAL', 1, true);
}

const runOnce = function (from: string, to: string, maxRoutes: number, groundAllowed: boolean) {
  console.log('');
  console.log(`Searching for route from ${from} to ${to}...`);

  const fromAirport = airDatabase.airports.find((airport: any) => airport.iata === from);
  const toAirport = airDatabase.airports.find((airport: any) => airport.iata === to);
  if (fromAirport === undefined) {
    throw new Error('runOnce() => From airport can not be found in calculated route.')
  }
  if (toAirport === undefined) {
    throw new Error('runOnce() => To airport can not be found in calculated route.')
  }

  const dijkstra = new Dijkstra(airDatabase);
  const result = dijkstra.calculateShortestRoute(fromAirport, toAirport, maxRoutes, groundAllowed);
  result.forEach(item => console.log(`${(item as unknown as Route).originAirport.iata} => ${(item as unknown as Route).destinationAirport.iata} distance: ${(item as unknown as Route).distance} ground route: ${(item as unknown as Route).isGround}`))
  const totalDistance = result.reduce((acc, { weight }) => acc + weight, 0);
  console.log(`Total distance - ${totalDistance}`);

}