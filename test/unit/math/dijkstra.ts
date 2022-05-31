import { expect } from 'chai';
import { Dijkstra } from './../../../src/math/dijkstra';
import { SixfoldExplorer } from './../../../src/types';
import { graphStore } from './graphStore';

describe('Dijkstra tests', () => {
  it(`Shortest route without limit.`, () => {
    const dijkstra = new Dijkstra(graphStore);
    const shortestRoute = dijkstra.calculateShortestRoute(graphStore.findNodeById(1) as SixfoldExplorer.GraphNode, graphStore.findNodeById(5) as SixfoldExplorer.GraphNode, 10, true);
    const totalWeight = shortestRoute.reduce((acc, { weight }) => acc + weight, 0);
    expect(shortestRoute.length).to.equal(3);
    expect(totalWeight).to.equal(4);
  });

  it(`Shortest route with limit of 2.`, () => {
    const dijkstra = new Dijkstra(graphStore);
    const shortestRoute = dijkstra.calculateShortestRoute(graphStore.findNodeById(1) as SixfoldExplorer.GraphNode, graphStore.findNodeById(5) as SixfoldExplorer.GraphNode, 2, true);
    const totalWeight = shortestRoute.reduce((acc, { weight }) => acc + weight, 0);
    expect(shortestRoute.length).to.equal(2);
    expect(totalWeight).to.equal(11);
  });
});