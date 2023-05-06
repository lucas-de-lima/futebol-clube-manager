import * as Joi from 'joi';
import ILogin from '../interfaces/loginInterface';

export default class LoginSchema {
  private login: ILogin;

  constructor(login: ILogin) { this.login = login; }

  private loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'any.required': 'All fields must be filled',
    }),
    password: Joi.string().min(6).required(),
  });

  public validate() {
    return this.loginSchema.validate(this.login);
  }
}
