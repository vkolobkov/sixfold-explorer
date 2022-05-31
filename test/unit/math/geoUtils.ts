import { expect } from 'chai';
import { calculateGeographicDistance, degreesToRadians } from './../../../src/math/geoUtils';

describe('Degrees to radians transformation tests', () => {
  it(`Correct calculation of 180 degrees shoud return ${Math.PI}.`, () => {
    const radians = degreesToRadians(180);
    expect(radians).to.approximately(Math.PI, 0.001);
  });
});

describe('Geographic distance calculation tests', () => {
  it(`Correct calculation of distance between Tallinn and London.`, () => {
    const tallinnCoordinates = {
      latitude: 1.0374038455385417,
      longitude: 0.43204705844603825
    };
    const londonCoordinates = {
      latitude: 0.8988472351308352,
      longitude: -0.0022032338345475615
    };
    const tallinnLondonDistance = 1784.27;
    const distance = calculateGeographicDistance(tallinnCoordinates.latitude, tallinnCoordinates.longitude, londonCoordinates.latitude, londonCoordinates.longitude);
    expect(distance).to.approximately(tallinnLondonDistance, 0.1);
  });
});