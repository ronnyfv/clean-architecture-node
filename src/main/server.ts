import { app } from './config/app';
import { MongoHelper } from '../infra/db/mongodb/mongoHelper';
import { envs } from './config/envs';

MongoHelper.connect(envs.MONGO_URL)
  .then(() => {
    app.listen(envs.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Running on port ${envs.PORT}`);
    });
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
  });
