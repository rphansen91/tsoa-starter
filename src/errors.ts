import { Request, Response, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import logger from 'loglevel';

export class StatusError extends Error {
  public statusCode: number;
}

export class UnauthorizedError extends StatusError {
  message = 'Unauthorized';
  statusCode = 401;
}

export function handleError(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidateError) {
    logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }

  if (err instanceof StatusError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof Error) {
    logger.error('Unknown error', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
}
