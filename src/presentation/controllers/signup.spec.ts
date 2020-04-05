import { SignUpController } from './signup';
import { MissingParamError } from './../errors/httpErrors';

describe('SignUp Controller', () => {
  it('must return an error when user left name empty', () => {
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
});
