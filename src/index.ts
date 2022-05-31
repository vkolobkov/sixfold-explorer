import * as express from 'express';
import { config } from './config/config';
import { airDatabase } from './database/database';
import { router } from './controllers/routes';

const app = express();
app.use(express.json());
app.use('/routes', router);

start();

async function start() {
  await airDatabase.load();
  app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
  });
}

