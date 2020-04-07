import { AddAccount } from '../../domain/useCases/addAccount';
import { DbAddAccount } from './dbAddAccount';
import { AccountMongoRepository } from '../../infra/db/mongodb/accountMongoRepository';
import { BcryptAdapter } from '../../infra/cryptography/bcryptAdapter';
import { MongoHelper } from '../../infra/db/mongodb/mongoHelper';

const makeSut = (): AddAccount => {
  const addAccountRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter();

  return new DbAddAccount(bcryptAdapter, addAccountRepository);
};

describe('DbAddAccount', () => {
  it('must create and return an account', async () => {
    await MongoHelper.connect();

    const sut = makeSut();

    const account = await sut.add(
      'validName',
      'validEmail@email.com',
      'validPass',
    );

    expect(account.id).toBeTruthy();
    expect(account.name).toEqual('validName');
    expect(account.email).toEqual('validEmail@email.com');
    expect(account.password).toBeFalsy();

    await MongoHelper.disconnect();
  });
});
