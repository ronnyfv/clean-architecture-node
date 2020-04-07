import { Express } from 'express';
import { bodyParser } from '../middlewares/bodyParser';
import { useCors } from '../middlewares/cors';
import { useContentType } from '../middlewares/contentType';

const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser);
  app.use(useCors);
  app.use(useContentType);
};

export { setupMiddlewares };
