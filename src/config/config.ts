import * as path from 'path';

const config = {
  port: 3001,
  airportsPath: path.resolve(__dirname, './../../data/airports.dat'),
  routesPath: path.resolve(__dirname, './../../data/routes.dat'),
  neighborDistanceKm: 100,
  earthRadiusKm: 6371,
  routeSegmentsLimit: 4,
  allowGroundRoutes: true,
};

export { config };