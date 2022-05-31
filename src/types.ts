export namespace SixfoldExplorer {

  export type Nullable<T> = T | null;
  export type Undefinedable<T> = T | undefined;

  export interface GraphStore {
    findNodeById(id: number): Undefinedable<GraphNode>;
  }

  export interface GraphNode {
    readonly id: number;
    readonly edges: GraphEdge[];
  };

  export enum GraphEdgeType {
    All,
    Air,
    Ground,
  };

  export interface GraphEdge {
    readonly weight: number;
    readonly edgeType: GraphEdgeType;
    readonly originNodeId: number;
    readonly destinationNodeId: number;
  };

  export interface RouteWeight {
    weight: number;
    airRoutesCount: number;
    groundRoutesCount: number;
  };
}