import { HttpResponse } from '../protocols/http';
import { ServerError } from '../errors/serverErrors';

const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

const okRequest = (body: any): HttpResponse => ({
  statusCode: 200,
  body,
});

export { okRequest, badRequest, serverError };
