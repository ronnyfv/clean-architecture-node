import { SignUpController } from './signup';
import { MissingParamError, InvalidParamError } from './../errors/httpErrors';
import { AccountModel } from '../../domain/models/account';
import { EmailValidatorAdapter } from '../../utils/emailValidatorAdapter';
import { ServerError } from '../errors/serverErrors';

const makeSut = (
  emailValidatorReturn = true,
  userThrowError = false,
): SignUpController => {
  class AddAccount {
    async add(
      name: string,
      email: string,
      password: string,
    ): Promise<AccountModel> {
      return await new Promise((resolve, reject) => {
        if (userThrowError) {
          reject(new Error());
        }

        resolve({
          id: 1,
          name: name,
          email: email,
        });
      });
    }
  }

  const addAccount = new AddAccount();
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
    const sut = makeSut(false);
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

  it('must return an error when an user with the received email already exists', async () => {
    const sut = makeSut(true, true);
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'emailWithExistingUser@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('must create an user with the filled values', async () => {
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
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'anyName',
      email: 'anyEmail@email.com',
    });
  });
});
