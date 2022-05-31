import { createReadStream, promises as fsPromises } from 'fs';
import { parse } from 'csv-parse';
import { SixfoldExplorer } from './../types';
import { calculateGeographicDistance, calculateNeighbors } from './../math/geoUtils';
import { Airport } from './../model/airport';
import { Route } from './../model/route';
import { config } from './../config/config';

class AirDatabase implements SixfoldExplorer.GraphStore {
  private airportsPath: string;
  private routesPath: string;
  public airports: Airport[];
  public airportsMap: Map<number, Airport>;
  public routes: Route[];

  constructor(_airportsPath: string, _routesPath: string) {
    this.airportsPath = _airportsPath;
    this.routesPath = _routesPath;
    this.airports = [];
    this.airportsMap = new Map<number, Airport>();
    this.routes = [];
  }

  findNodeById(id: number): SixfoldExplorer.Undefinedable<SixfoldExplorer.GraphNode> {
    return this.airportsMap.get(id);
  }

  async load(): Promise<void> {
    try {
      const dbFile = await fsPromises.stat(this.airportsPath);
      if (!dbFile.isFile()) {
        console.log(`AirDatabase=>load() Error: Can't find the file ${this.airportsPath}.`);
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }

    const csvParser = parse({
      delimiter: ','
    })

    csvParser.on('readable', () => {
      let record;
      while ((record = csvParser.read()) !== null) {
        const lat = parseFloat(record[6]);
        const lon = parseFloat(record[7]);
        const airport = new Airport(
          parseInt(record[0]),
          record[1],
          record[4],
          record[5],
          lat,
          lon);
        this.airports.push(airport);
        this.airportsMap.set(airport.id, airport);
      }
    });

    const csvStream = createReadStream(this.airportsPath);
    csvStream.pipe(csvParser);

    return new Promise((resolve, reject) => {
      csvStream.on('end', () => {
        console.log(`Data end reached ... loaded ${this.airports.length} Airports.`);
        const naighborRoutes: Route[] = calculateNeighbors(this.airports);
        naighborRoutes.forEach(route => {
          this.routes.push(route);
          route.originAirport.routes.push(route);
        });
        this.loadRoutes().then(response => resolve()).catch(err => reject());
      }).on('error', (err: any) => {
        console.log(err);
        reject();
      })
    });

  }

  async loadRoutes(): Promise<void> {
    try {
      const dbFile = await fsPromises.stat(this.routesPath);
      if (!dbFile.isFile()) {
        console.log(`AirDatabase=>load() Error: Can't find the file ${this.airportsPath}.`);
        return;
      }
    } catch (err) {
      console.log(err);
      return;
    }

    const csvParser = parse({
      delimiter: ','
    })

    csvParser.on('readable', () => {
      let record;
      while ((record = csvParser.read()) !== null) {

        const routeStops = parseInt(record[7]);
        if (routeStops > 0) {
          continue;
        }

        const sourcePortId = parseInt(record[3]);
        const sourcePort = this.airports.find(airport => airport.id === sourcePortId);
        const originPortId = parseInt(record[5]);
        const originPort = this.airports.find(airport => airport.id === originPortId);
        if (typeof sourcePort === 'undefined' || typeof originPort === 'undefined') {
          continue;
        }

        let route = new Route(
          sourcePort,
          originPort,
          calculateGeographicDistance(sourcePort.latitudeInRadians, sourcePort.longitudeInRadians, originPort.latitudeInRadians, originPort.longitudeInRadians),
          false);
        sourcePort.routes.push(route);
        this.routes.push(route);
      }
    });

    const csvStream = createReadStream(this.routesPath);
    csvStream.pipe(csvParser);
    return new Promise((resolve, reject) => {
      csvStream.on('end', () => {
        console.log(`Data end reached ... loaded ${this.routes.length} Routes.`);
        resolve();
      }).on('error', (err: any) => {
        console.log(err);
        reject();
      })
    });
  }

};

const airDatabase = new AirDatabase(config.airportsPath, config.routesPath);

export { airDatabase, AirDatabase };