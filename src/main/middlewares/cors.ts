import { Request, Response, NextFunction } from 'express';

const useCors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*');
  res.set('access-control-allow-methods', '*');
  res.set('access-control-allow-headers', '*');
  next();
};

export { useCors };
