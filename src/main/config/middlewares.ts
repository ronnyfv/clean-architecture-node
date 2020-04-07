import { Express } from 'express';
import { bodyParser } from '../middlewares/bodyParser';
import { useCors } from '../middlewares/cors';

const middleware = (app: Express): void => {
  app.use(bodyParser);
  app.use(useCors);
};

export { middleware };
