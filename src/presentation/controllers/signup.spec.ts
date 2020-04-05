import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  it('must return 400 when no name is provided', () => {
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        email: 'anyEmail@email.com',
        password: 'anyPassword',
        passwordConfirmation: 'anyPasswordConfirmation',
      },
    };

    const httpResponse = sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
