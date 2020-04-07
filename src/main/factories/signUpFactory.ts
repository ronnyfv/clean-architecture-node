import { SignUpController } from '../../presentation/controllers/signUpController';
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter';
import { DbAddAccount } from '../../data/useCases/dbAddAccount';
import { BcryptAdapter } from '../../infra/cryptography/bcryptAdapter';
import { AccountMongoRepository } from '../../infra/db/mongodb/accountMongoRepository';

const makeSignUpFactory = (): SignUpController => {
  const addAccountRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter();
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
  const emailValidator = new EmailValidatorAdapter();

  return new SignUpController(emailValidator, addAccount);
};

export { makeSignUpFactory };
