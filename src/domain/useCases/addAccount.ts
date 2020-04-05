import { AccountModel } from '../models/account';

interface AddAccount {
  add(name: string, email: string, password: string): Promise<AccountModel>;
}

export { AddAccount };
