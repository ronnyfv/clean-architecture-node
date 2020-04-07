import { Router } from 'express';

const signUpRouts = (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.send({ ok: 'ok' });
  });
};

export { signUpRouts };
