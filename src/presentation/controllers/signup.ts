import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError, InvalidParamError } from '../errors/httpErrors';
import { badRequest } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/emailValidator';

class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
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

    return {
      statusCode: 200,
      body: {},
    };
  }
}

export { SignUpController };
