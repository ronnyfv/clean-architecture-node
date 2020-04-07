import { AccountModel } from '../../domain/models/account';

interface AddAccountRepository {
  add(name: string, email: string, password: string): Promise<AccountModel>;
}

export { AddAccountRepository };
