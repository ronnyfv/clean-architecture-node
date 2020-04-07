import { Request, Response, NextFunction } from 'express';

const useContentType = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.type('json');
  next();
};

export { useContentType };
