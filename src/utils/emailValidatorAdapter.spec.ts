import { EmailValidatorAdapter } from './emailValidatorAdapter';

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter();

describe('EmailValidator Adapter', () => {
  it('must return false when validator checks a invalid email', () => {
    const sut = makeSut();

    expect(sut.isValid('invalidemailgmail.com')).toBe(false);
  });

  it('must return true when validator checks a valid email', () => {
    const sut = makeSut();

    expect(sut.isValid('validemail@gmail.com')).toBe(true);
  });
});
