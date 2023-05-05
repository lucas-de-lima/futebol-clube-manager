import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/CustomError';

export default class ErrorHandle {
  public static handle(
    error: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { status, message } = error;
    res.status(status).json({ message });
  }
}
