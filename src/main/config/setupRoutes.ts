import { Express, Router } from 'express';

import { signUpRouts } from '../routes/signUpRoutes';

const setupRoutes = (app: Express): void => {
  const route = Router();

  app.use('/api', route);

  signUpRouts(route);
};

export { setupRoutes };
