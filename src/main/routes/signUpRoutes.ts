import { Router } from 'express';
import { makeSignUpFactory } from '../factories/signUpFactory';
import { expressRouteAdapter } from '../adapters/expressRouteAdapter';

const signUpRouts = (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpFactory()));
};

export { signUpRouts };
