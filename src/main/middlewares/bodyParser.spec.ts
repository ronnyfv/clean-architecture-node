import request from 'supertest';

import { app } from '../config/app';

describe('BodyParser Middleware', () => {
  it('must parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body);
    });

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'test name' })
      .expect({
        name: 'test name',
      });
  });
});
