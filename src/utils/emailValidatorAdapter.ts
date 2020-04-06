import { EmailValidator } from '../presentation/protocols/emailValidator';

class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}

export { EmailValidatorAdapter };
