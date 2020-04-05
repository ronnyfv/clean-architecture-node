import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/httpErrors';
import { badRequest } from '../helpers/httpHelper';
import { Controller } from '../protocols/controller';

class SignUpController implements Controller {
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
  }
}

export { SignUpController };
