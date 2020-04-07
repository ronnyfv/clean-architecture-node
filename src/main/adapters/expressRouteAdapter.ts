import { Controller } from '../../presentation/protocols/controller';
import { Request, Response, RequestHandler } from 'express';
import { HttpRequest } from '../../presentation/protocols/http';

const expressRouteAdapter = (controller: Controller): RequestHandler => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    res.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export { expressRouteAdapter };
