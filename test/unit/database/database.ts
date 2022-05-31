import { expect } from 'chai';
import * as path from 'path';
import { AirDatabase } from './../../../src/database/database';

describe('Database tests', () => {
  it(`Check data load.`, async () => {
    const database = new AirDatabase(path.resolve(__dirname, '../../data/airports.dat'), path.resolve(__dirname, '../../data/routes.dat'));
    await database.load();
    expect(database.airports.length).to.equal(10);
    expect(database.routes.length).to.equal(19);
  });
  it(`Wrong file.`, async () => {
    const database = new AirDatabase(path.resolve(__dirname, '../../data/airports'), path.resolve(__dirname, '../../data/routes.dat'));
    await database.load();
    expect(database.airports.length).to.equal(0);
    expect(database.routes.length).to.equal(0);
  });
});