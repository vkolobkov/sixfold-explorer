import { config } from "../config/config";
import { Airport } from "../model/airport";
import { Route } from "../model/route";
import { SixfoldExplorer } from "./../types";

const neighborAngularRadius = config.neighborDistanceKm / config.earthRadiusKm;

const degreesToRadians = function (degrees: number): number {
  return degrees * Math.PI / 180;
}

const calculateGeographicDistance = function (
  fromLatInRadians: number, fromLonInRadians: number,
  toLatInRadians: number, toLonInRadians: number): number {
  const latDif = toLatInRadians - fromLatInRadians;
  const lonDif = toLonInRadians - fromLonInRadians;

  const aSide = Math.sin(latDif / 2) * Math.sin(latDif / 2) +
    Math.sin(lonDif / 2) * Math.sin(lonDif / 2) * Math.cos(fromLatInRadians) * Math.cos(toLatInRadians);
  const cSide = 2 * Math.atan2(Math.sqrt(aSide), Math.sqrt(1 - aSide));

  const distance = config.earthRadiusKm * cSide;

  return distance;
}

const calculateNeighbors = function (airports: Airport[]): Route[] {
  const neighborRoutes: Route[] = [];
  for (let apCounter = 0; apCounter < airports.length; apCounter++) {
    let latMin = airports[apCounter].latitudeInRadians - neighborAngularRadius;
    let latMax = airports[apCounter].latitudeInRadians + neighborAngularRadius;

    const lonD = Math.asin(Math.sin(neighborAngularRadius) / Math.cos(airports[apCounter].latitudeInRadians));
    let lonMin = airports[apCounter].longitudeInRadians - lonD;
    let lonMax = airports[apCounter].longitudeInRadians + lonD;

    let addLonMin: SixfoldExplorer.Nullable<number> = null;
    let addLonMax: SixfoldExplorer.Nullable<number> = null;

    if (latMax > Math.PI / 2) {
      lonMin = - Math.PI;
      latMax = Math.PI / 2;
      lonMax = Math.PI;
    }
    if (latMin < -Math.PI / 2) {
      latMin = - Math.PI / 2;
      lonMin = - Math.PI;
      lonMax = Math.PI;
    }
    if (lonMin < -Math.PI) {
      addLonMin = -Math.PI;
      addLonMax = lonMax;
      lonMin = lonMin + Math.PI * 2;
      lonMax = Math.PI;
    }
    if (lonMax > Math.PI) {
      addLonMin = -Math.PI;
      addLonMax = lonMax - Math.PI * 2;
      lonMax = Math.PI;
    }

    airports.map((ap, i) => {

      if (i > apCounter
        && ap.latitudeInRadians > latMin && ap.latitudeInRadians < latMax
        && ap.longitudeInRadians > lonMin && ap.longitudeInRadians < lonMax
        && (addLonMin === null || ap.longitudeInRadians > addLonMin)
        && (addLonMax === null || ap.longitudeInRadians < addLonMax)) {

        const latDif = ap.latitudeInRadians - airports[apCounter].latitudeInRadians;
        const lonDif = ap.longitudeInRadians - airports[apCounter].longitudeInRadians;

        const aSide = Math.sin(latDif / 2) * Math.sin(latDif / 2) +
          Math.sin(lonDif / 2) * Math.sin(lonDif / 2) * Math.cos(airports[apCounter].latitudeInRadians) * Math.cos(ap.latitudeInRadians);
        const cSide = 2 * Math.atan2(Math.sqrt(aSide), Math.sqrt(1 - aSide));
        const distance = config.earthRadiusKm * cSide;

        if (distance < config.neighborDistanceKm) {
          const fwdRoute = new Route(airports[apCounter], ap, distance, true);
          const bwrdRoute = new Route(ap, airports[apCounter], distance, true);
          neighborRoutes.push(fwdRoute);
          neighborRoutes.push(bwrdRoute);
        }
      }
    });
  }
  return neighborRoutes;
}

export { degreesToRadians, calculateGeographicDistance, calculateNeighbors };