import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../errors/httpErrors';
import { badRequest } from '../helpers/httpHelper';

class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }
  }
}

export { SignUpController };
