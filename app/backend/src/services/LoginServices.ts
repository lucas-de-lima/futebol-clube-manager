import * as bcrypt from 'bcryptjs';
import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';
import CustomError from '../utils/CustomError';
import statusCodes from '../utils/statusCodes';

export default class LoginServices {
  constructor(private userModel = UserModel) { }

  public async inspectLogin(login: ILogin): Promise<UserModel> {
    const [response] = await this.userModel.findAll({
      where: {
        email: login.email,
      },
    });

    if (!response) {
      throw new CustomError(statusCodes.unauthorized, 'Invalid email or password');
    }

    if (!(await bcrypt.compare(login.password, response.password))) {
      throw new CustomError(401, 'Invalid email or password');
    }
    return response;
  }
}
