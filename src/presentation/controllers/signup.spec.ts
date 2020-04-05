import { SignUpController } from './signup';
import { MissingParamError, InvalidParamError } from './../errors/httpErrors';

const makeSut = (emailValidatorReturn = true): SignUpController => {
  class EmailValidator {
    isValid(email: string): boolean {
      return emailValidatorReturn;
    }
  }

  const emailValidator = new EmailValidator();

  return new SignUpController(emailValidator);
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

  it('must return an success when valid email is provided', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'anyName',
        email: 'validemail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPassword',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toEqual(200);
  });
});
