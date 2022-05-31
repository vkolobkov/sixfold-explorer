import { degreesToRadians } from './../math/geoUtils';
import { SixfoldExplorer } from './../types';
import { Route } from './route';

export class Airport implements SixfoldExplorer.GraphNode {
  public id: number;
  public name: string;
  public iata: string;
  public icao: string;
  public latitude: number;
  public longitude: number;
  public latitudeInRadians: number;
  public longitudeInRadians: number;
  public routes: Route[];

  constructor(_id: number,
    _name: string,
    _iata: string,
    _icao: string,
    _latitude: number,
    _longitude: number,) {
    this.id = _id;
    this.name = _name;
    this.iata = _iata;
    this.icao = _icao;
    this.latitude = _latitude;
    this.longitude = _longitude;
    this.latitudeInRadians = degreesToRadians(_latitude);
    this.longitudeInRadians = degreesToRadians(_longitude);
    this.routes = [];
  }

  public get edges(): SixfoldExplorer.GraphEdge[] {
    return this.routes;
  }
}