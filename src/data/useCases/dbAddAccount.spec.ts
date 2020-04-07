import { AddAccount } from '../../domain/useCases/addAccount';
import { DbAddAccount } from './dbAddAccount';
import { Encrypter } from '../protocols/encrypter';
import { AddAccountRepository } from '../protocols/addAccountRepository';
import { AccountModel } from '../../domain/models/account';

const makeSut = (): AddAccount => {
  class EncrypterAdapter implements Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('hashedValue');
      });
    }
  }

  class AddAccountRepositoryAdapter implements AddAccountRepository {
    async add(
      name: string,
      email: string,
      password: string,
    ): Promise<AccountModel> {
      return await new Promise((resolve, reject) => {
        resolve({
          id: 111,
          name: 'validName',
          email: 'validEmail@email.com',
        });
      });
    }
  }

  const encrypter = new EncrypterAdapter();
  const addAccountRepository = new AddAccountRepositoryAdapter();

  return new DbAddAccount(encrypter, addAccountRepository);
};

describe('DbAddAccount', () => {
  it('must create and return an account', async () => {
    const sut = makeSut();

    const account = await sut.add(
      'validName',
      'validEmail@email.com',
      'validPass',
    );

    expect(account).toEqual({
      id: 111,
      name: 'validName',
      email: 'validEmail@email.com',
    });
  });
});
