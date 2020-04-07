import { AddAccount } from '../../domain/useCases/addAccount';
import { AccountModel } from '../../domain/models/account';
import { Encrypter } from '../protocols/encrypter';
import { AddAccountRepository } from '../protocols/addAccountRepository';

class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly addAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(
    name: string,
    email: string,
    password: string,
  ): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(password);

    const account = await this.addAccountRepository.add(
      name,
      email,
      hashedPassword,
    );

    return account;
  }
}

export { DbAddAccount };
