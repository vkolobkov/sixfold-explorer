import { SixfoldExplorer } from '../types';
import { PriorityQueue } from '../priorityQueue';
import { performance } from "perf_hooks";

const graphEdgeCompare = (a: SixfoldExplorer.GraphEdge, b: SixfoldExplorer.GraphEdge) => {
  return a.weight - b.weight;
};

class Dijkstra {
  private graphStore: SixfoldExplorer.GraphStore;
  constructor(_graphStore: SixfoldExplorer.GraphStore) {
    this.graphStore = _graphStore;
  }

  calculateShortestRoute(startNode: SixfoldExplorer.GraphNode, endNode: SixfoldExplorer.GraphNode, maxEdgesInRoute: number = 4, groundRoutesAllowed: boolean = false): SixfoldExplorer.GraphEdge[] {
    //const startTime = performance.now();

    const visitedGraphNodes: number[] = [];
    const totalRouteWeights: SixfoldExplorer.RouteWeight[] = [];
    const shortestRoutesTo: SixfoldExplorer.GraphEdge[] = [];
    const queue: PriorityQueue<SixfoldExplorer.GraphEdge> = new PriorityQueue<SixfoldExplorer.GraphEdge>(graphEdgeCompare);

    let edgeToCalculate = { weight: 0, edgeType: SixfoldExplorer.GraphEdgeType.Air, originNodeId: -1, destinationNodeId: startNode.id };
    totalRouteWeights[startNode.id] = { weight: 0, airRoutesCount: 0, groundRoutesCount: 0 };
    while (edgeToCalculate) {
      const currentRouteWeight = totalRouteWeights[edgeToCalculate.destinationNodeId];
      if (currentRouteWeight.airRoutesCount >= maxEdgesInRoute) {
        edgeToCalculate = queue.dequeue();
        continue;
      }
      const currentNode = this.graphStore.findNodeById(edgeToCalculate.destinationNodeId);
      let edgesFromDestination: SixfoldExplorer.GraphEdge[] = [];
      if (currentNode) {
        edgesFromDestination = currentNode.edges
      }

      for (let nextEdge of edgesFromDestination) {
        if (nextEdge.destinationNodeId === startNode.id) {
          continue;
        }
        if (!groundRoutesAllowed && nextEdge.edgeType === SixfoldExplorer.GraphEdgeType.Ground) {
          continue
        }

        let nextWeightRoute = totalRouteWeights[nextEdge.destinationNodeId];
        const nextTotalWeight = currentRouteWeight.weight + nextEdge.weight;
        if (nextWeightRoute === undefined
          || nextTotalWeight < nextWeightRoute.weight) {
          if (!visitedGraphNodes.includes(nextEdge.destinationNodeId)) {
            queue.enqueue({ weight: nextTotalWeight, edgeType: nextEdge.edgeType, originNodeId: nextEdge.originNodeId, destinationNodeId: nextEdge.destinationNodeId });
          }
          nextWeightRoute = { ...currentRouteWeight, weight: nextTotalWeight };
          if (nextEdge.edgeType === SixfoldExplorer.GraphEdgeType.Air) {
            nextWeightRoute.airRoutesCount += 1;
          } else if (nextEdge.edgeType === SixfoldExplorer.GraphEdgeType.Ground) {
            nextWeightRoute.groundRoutesCount += 1;
          }
          totalRouteWeights[nextEdge.destinationNodeId] = nextWeightRoute;
          shortestRoutesTo[nextEdge.destinationNodeId] = nextEdge;
        }
      }
      visitedGraphNodes.push(edgeToCalculate.destinationNodeId);
      edgeToCalculate = queue.dequeue();
    }

    const edges: SixfoldExplorer.GraphEdge[] = [];
    let edge = shortestRoutesTo[endNode.id]
    while (edge) {
      edges.push(edge);
      edge = shortestRoutesTo[edge.originNodeId];
    }
    edges.reverse();

    // const endTime = performance.now();
    // console.log(`Dijkstra time - ${(endTime - startTime) / 1000} seconds.`);

    return edges;
  }

}

export { Dijkstra };