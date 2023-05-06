import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../auth/authFunction';
import CustomError from '../utils/CustomError';
import statusCodes from '../utils/statusCodes';

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new CustomError(statusCodes.unauthorized, 'Token not found');
  }
  try {
    const payload = verifyToken(authorization);
    req.body.data = payload.data;
    next();
  } catch (error) {
    throw new CustomError(statusCodes.unauthorized, 'Token must be a valid token');
  }
};

export default validateToken;
