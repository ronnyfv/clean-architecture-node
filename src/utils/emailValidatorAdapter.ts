import validator from 'validator';
import { EmailValidator } from '../presentation/protocols/emailValidator';

class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email);
  }
}

export { EmailValidatorAdapter };
