import { SignUpController } from './signup';
import { MissingParamError, InvalidParamError } from './../errors/httpErrors';
import { AccountModel } from '../../domain/models/account';

const makeSut = (
  emailValidatorReturn = true,
  userThrowError = false,
): SignUpController => {
  class EmailValidator {
    isValid(email: string): boolean {
      return emailValidatorReturn;
    }
  }

  class AddAccount {
    add(name: string, email: string, password: string): AccountModel {
      if (userThrowError) {
        throw new Error();
      }

      return {
        id: 1,
        name: name,
        email: email,
      };
    }
  }

  const addAccount = new AddAccount();

  const emailValidator = new EmailValidator();

  return new SignUpController(emailValidator, addAccount);
};

describe('SignUp Controller', () => {
  it('must return an error when user left name empty', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPasswordConfirmation',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('must return an error when user left email empty', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        password: 'anyPassword',
        passwordConfirmation: 'anyPasswordConfirmation',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('must return an error when user left password empty', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('must return an error when user left password confirmation empty', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation'),
    );
  });

  it('must return an error when password confirmation fails', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anotherPassword',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation'),
    );
  });

  it('must return an error when invalid email is provided', () => {
    const sut = makeSut(false);
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'invalid_email@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('must return an error when an user with the received email already exists', () => {
    const sut = makeSut(true, true);
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'emailWithExistingUser@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('must create an user with the filled values', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'anyName',
      email: 'anyEmail@email.com',
    });
  });
});
