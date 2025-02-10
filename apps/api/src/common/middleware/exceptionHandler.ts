import { NextFunction, Request, Response } from 'express';

import { HttpException, InternalServerErrorException } from '../exception/http';

export const exceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    if (err instanceof InternalServerErrorException) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(err.status).json({ message: err.message });
  } else if (err instanceof SyntaxError) {
    return res.status(400).json({ message: 'Malformed payload' });
  } else {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
