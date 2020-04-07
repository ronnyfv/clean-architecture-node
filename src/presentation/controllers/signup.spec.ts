import { SignUpController } from './signup';
import { MissingParamError, InvalidParamError } from './../errors/httpErrors';
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter';
import { ServerError } from '../errors/serverErrors';
import { DbAddAccount } from '../../data/useCases/dbAddAccount';
import { AccountMongoRepository } from '../../infra/db/mongodb/accountMongoRepository';
import { BcryptAdapter } from '../../infra/cryptography/bcryptAdapter';
import { MongoHelper } from '../../infra/db/mongodb/mongoHelper';

const makeSut = (): SignUpController => {
  const addAccountRepository = new AccountMongoRepository();
  const bcryptAdapter = new BcryptAdapter();
  const addAccount = new DbAddAccount(bcryptAdapter, addAccountRepository);
  const emailValidator = new EmailValidatorAdapter();

  return new SignUpController(emailValidator, addAccount);
};

describe('SignUp Controller', () => {
  it('must return an server error as the default error', async () => {
    const sut = makeSut();
    const httpRequest = {};

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('must return an error when user left name empty', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPasswordConfirmation',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('must return an error when user left email empty', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        password: 'anyPassword',
        passwordConfirmation: 'anyPasswordConfirmation',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('must return an error when user left password empty', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('must return an error when user left password confirmation empty', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('must return an error when password confirmation fails', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anotherPassword',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
    );
  });

  it('must return an error when invalid email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'invalidemailemail.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('must create an user with the filled values', async () => {
    await MongoHelper.connect();

    const sut = makeSut();

    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.body.id).toBeTruthy();
    expect(httpResponse.body.name).toEqual('anyName');
    expect(httpResponse.body.email).toEqual('anyEmail@email.com');
    expect(httpResponse.body.password).toBeFalsy();

    await MongoHelper.disconnect();
  });
});
