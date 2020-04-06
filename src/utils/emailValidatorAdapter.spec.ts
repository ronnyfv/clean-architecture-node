import { EmailValidatorAdapter } from './emailValidatorAdapter';

describe('EmailValidator Adapter', () => {
  it('must return false when validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    expect(sut.isValid('invalid_email@gmail.com')).toBe(false);
  });
});
