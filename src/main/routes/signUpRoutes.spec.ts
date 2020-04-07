import request from 'supertest';

import { app } from '../config/app';
import { MongoHelper } from '../../infra/db/mongodb/mongoHelper';
import { envs } from '../config/envs';

describe('SignUp Routes', () => {
  it('must return an account on success', async () => {
    await MongoHelper.connect(envs.MONGO_URL);

    await request(app)
      .post('/api/signup')
      .send({
        name: 'name',
        email: 'validemail@email.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);

    await MongoHelper.disconnect();
  });
});
