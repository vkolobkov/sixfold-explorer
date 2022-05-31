import { Router } from "express";
import { config } from "../config/config";
import { airDatabase } from "../database/database";
import { Dijkstra } from "../math/dijkstra";
import { Airport } from "../model/airport";
import { Route } from "../model/route";
import { SixfoldExplorer } from "../types";

const findAirportByCode = (code: string) => {
  const codeInUpperCase = code.toUpperCase();
  let airport: SixfoldExplorer.Undefinedable<Airport>;
  if (codeInUpperCase.length === 3) {
    airport = airDatabase.airports.find(ap => ap.iata === codeInUpperCase);
  }
  if (codeInUpperCase.length === 4) {
    airport = airDatabase.airports.find(ap => ap.icao === codeInUpperCase);
  }
  return airport;
}

const router = Router();
router.get('/:from/:to', (req, res) => {
  const fromAirport = findAirportByCode(req.params.from);
  if (fromAirport === undefined) {
    res.status(400).send(`Airport with code ${req.params.from} not found.`);
    return;
  }

  const toAirport = findAirportByCode(req.params.to);
  if (toAirport === undefined) {
    res.status(400).send(`Airport with code ${req.params.to} not found.`);
    return;
  }

  const dijkstra = new Dijkstra(airDatabase);
  const shortestRoute = dijkstra.calculateShortestRoute(fromAirport, toAirport, config.routeSegmentsLimit, config.allowGroundRoutes);
  if (shortestRoute.length === 0)
    res.status(404).send('Sorry no route was found at all.');
  else
    res.status(200).json(shortestRoute.map(item => {
      let route = (item as unknown as Route);
      return {
        from: `${route.originAirport.icao}/${route.originAirport.iata}`,
        to: `${route.destinationAirport.icao}/${route.destinationAirport.iata}`,
        distance: route.distance,
        isGround: route.isGround
      }
    }));
});

router.post('/', (req, res) => {
  const routeRequest = req.body;
  const fromAirport = findAirportByCode(routeRequest.from);
  if (fromAirport === undefined) {
    res.status(400).send(`Airport with code ${routeRequest.from} not found.`);
    return;
  }

  const toAirport = findAirportByCode(routeRequest.to);
  if (toAirport === undefined) {
    res.status(400).send(`Airport with code ${routeRequest.to} not found.`);
    return;
  }

  const dijkstra = new Dijkstra(airDatabase);
  const shortestRoute = dijkstra.calculateShortestRoute(fromAirport, toAirport, config.routeSegmentsLimit, config.allowGroundRoutes);
  if (shortestRoute.length === 0)
    res.status(404).send('Sorry no route was found at all.');
  else
    res.status(200).json(shortestRoute.map(item => {
      let route = (item as unknown as Route);
      return {
        from: `${route.originAirport.icao}/${route.originAirport.iata}`,
        to: `${route.destinationAirport.icao}/${route.destinationAirport.iata}`,
        distance: route.distance,
        isGround: route.isGround
      }
    }));
});

export { router };