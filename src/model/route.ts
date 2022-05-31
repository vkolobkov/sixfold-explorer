import { SixfoldExplorer } from './../types';
import { Airport } from './airport';

export class Route implements SixfoldExplorer.GraphEdge {
  public originAirport: Airport;
  public destinationAirport: Airport;
  public distance: number;
  public isGround: boolean;

  constructor(_originAirport: Airport, _destinationAirport: Airport, _distance: number, _isGround: boolean) {
    this.originAirport = _originAirport;
    this.destinationAirport = _destinationAirport;
    this.distance = _distance;
    this.isGround = _isGround;
  }

  public get weight(): number {
    return this.distance;
  }

  public get edgeType(): SixfoldExplorer.GraphEdgeType {
    if (this.isGround) {
      return SixfoldExplorer.GraphEdgeType.Ground;
    }
    return SixfoldExplorer.GraphEdgeType.Air;
  }

  public get originNodeId(): number {
    return this.originAirport.id;
  }

  public get destinationNodeId(): number {
    return this.destinationAirport.id;
  }
}