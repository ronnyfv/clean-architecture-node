import { AccountMongoRepository } from './accountMongoRepository';
import { MongoHelper } from './mongoHelper';
import { envs } from '../../../main/config/envs';

const makeSut = (): AccountMongoRepository => new AccountMongoRepository();

describe('Account Mongo Repository', () => {
  it('must return an account on success', async () => {
    await MongoHelper.connect(envs.MONGO_URL);

    const sut = makeSut();

    const account = await sut.add('name', 'email@email.com', 'hashedPassword');

    expect(account.id).toBeTruthy();
    expect(account.name).toEqual('name');
    expect(account.email).toEqual('email@email.com');
    expect(account.password).toBeFalsy();

    await MongoHelper.disconnect();
  });
});
