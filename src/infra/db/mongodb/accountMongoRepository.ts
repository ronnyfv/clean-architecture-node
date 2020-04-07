import { AddAccountRepository } from '../../../data/protocols/addAccountRepository';
import { AccountModel } from '../../../domain/models/account';
import { MongoHelper } from './mongoHelper';

class AccountMongoRepository implements AddAccountRepository {
  async add(
    name: string,
    email: string,
    password: string,
  ): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts');

    const result = await accountCollection.insertOne({
      name,
      email,
      password,
    });

    const {
      password: accountPassword,
      ...accountWithoutPassword
    } = result.ops[0];

    return MongoHelper.parseEntity(accountWithoutPassword);
  }
}

export { AccountMongoRepository };
