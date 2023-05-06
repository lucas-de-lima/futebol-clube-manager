import { NextFunction, Request, Response } from 'express';
import { generateToken } from '../auth/authFunction';
import ILogin from '../interfaces/loginInterface';
import LoginServices from '../services/LoginServices';
import statusCodes from '../utils/statusCodes';

export default class LoginController {
  private loginService;
  constructor(loginService: LoginServices) {
    this.loginService = loginService;
  }

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const login: ILogin = req.body;

      const response = await this.loginService.inspectLogin(login);
      const token = generateToken(response);

      res.status(statusCodes.ok).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
