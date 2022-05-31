import { SixfoldExplorer } from "../../../src/types";

const graphNodeMap: Map<number, SixfoldExplorer.GraphNode> = new Map<number, SixfoldExplorer.GraphNode>();
let graphNode: SixfoldExplorer.GraphNode = {
  id: 1,
  edges: [
    {
      weight: 1,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 1,
      destinationNodeId: 4
    },
    {
      weight: 7,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 1,
      destinationNodeId: 2
    }
  ]
};
graphNodeMap.set(graphNode.id, graphNode);

graphNode = {
  id: 2,
  edges: [
    {
      weight: 7,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 2,
      destinationNodeId: 1
    },
    {
      weight: 3,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 2,
      destinationNodeId: 3
    }
  ]
};
graphNodeMap.set(graphNode.id, graphNode);

graphNode = {
  id: 3,
  edges: [
    {
      weight: 3,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 3,
      destinationNodeId: 2
    },
    {
      weight: 1,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 3,
      destinationNodeId: 4
    },
    {
      weight: 2,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 3,
      destinationNodeId: 5
    }
  ]
};
graphNodeMap.set(graphNode.id, graphNode);

graphNode = {
  id: 4,
  edges: [
    {
      weight: 1,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 4,
      destinationNodeId: 1
    },
    {
      weight: 1,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 4,
      destinationNodeId: 3
    },
    {
      weight: 10,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 4,
      destinationNodeId: 5
    }
  ]
};
graphNodeMap.set(graphNode.id, graphNode);

graphNode = {
  id: 5,
  edges: [
    {
      weight: 2,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 5,
      destinationNodeId: 3
    },
    {
      weight: 10,
      edgeType: SixfoldExplorer.GraphEdgeType.Air,
      originNodeId: 5,
      destinationNodeId: 4
    }
  ]
};
graphNodeMap.set(graphNode.id, graphNode);

const graphStore: SixfoldExplorer.GraphStore = {
  findNodeById: (id: number): SixfoldExplorer.Undefinedable<SixfoldExplorer.GraphNode> => graphNodeMap.get(id)
};

export { graphStore };