import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError, InvalidParamError } from '../errors/httpErrors';
import { badRequest, okRequest } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/emailValidator';
import { AddAccount } from '../../domain/useCases/addAccount';

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    if (!this.emailValidator.isValid(httpRequest.body.email)) {
      return badRequest(new InvalidParamError('email'));
    }

    if (httpRequest.body.password !== httpRequest.body.passwordConfirmation) {
      return badRequest(new InvalidParamError('passwordConfirmation'));
    }

    try {
      const account = this.addAccount.add(
        httpRequest.body.name,
        httpRequest.body.email,
        httpRequest.body.password,
      );

      return okRequest(account);
    } catch (err) {
      return badRequest(new InvalidParamError('email'));
    }
  }
}

export { SignUpController };
