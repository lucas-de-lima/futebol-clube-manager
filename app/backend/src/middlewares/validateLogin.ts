import { NextFunction, Request, Response } from 'express';
import LoginSchema from '../validations/loginSchema';
import ILogin from '../interfaces/loginInterface';
import statusCodes from '../utils/statusCodes';
import CustomError from '../utils/CustomError';

const validateLogin = async (req: Request, _res: Response, next: NextFunction) => {
  const login: ILogin = req.body;
  const loginSchema = new LoginSchema(login);
  const response = loginSchema.validate();

  if (response.error) {
    throw new CustomError(statusCodes.badRequest, 'All fields must be filled');
  }
  next();
};

export default validateLogin;
