import { AddAccount } from '../../domain/useCases/addAccount';
import { DbAddAccount } from './dbAddAccount';

const makeSut = (): AddAccount => {
  class Encrypter {
    async encrypt(value: string): Promise<string> {
      return await new Promise((resolve, reject) => {
        resolve('hashedValue');
      });
    }
  }

  const encrypter = new Encrypter();

  return new DbAddAccount(encrypter);
};

describe('DbAddAccount', () => {
  it('must crypto the password', async () => {
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
