import { Express } from 'express';
import { bodyParser } from '../middlewares/bodyParser';

const middleware = (app: Express): void => {
  app.use(bodyParser);
};

export { middleware };
