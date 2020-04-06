import { EmailValidatorAdapter } from './emailValidatorAdapter';

describe('EmailValidator Adapter', () => {
  it('must return false when validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    expect(sut.isValid('invalidemailgmail.com')).toBe(false);
  });

  it('must return true when validator returns true', () => {
    const sut = new EmailValidatorAdapter();

    expect(sut.isValid('validemail@gmail.com')).toBe(true);
  });
});
