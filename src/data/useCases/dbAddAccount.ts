import { AddAccount } from '../../domain/useCases/addAccount';
import { AccountModel } from '../../domain/models/account';
import { Encrypter } from '../protocols/encrypter';

class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter;
  }

  async add(
    name: string,
    email: string,
    password: string,
  ): Promise<AccountModel> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hashedPassword = await this.encrypter.encrypt(password);

    return {
      id: 111,
      name,
      email,
    };
  }
}

export { DbAddAccount };
