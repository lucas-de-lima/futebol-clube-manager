import ILogin from '../interfaces/loginInterface';
import UserModel from '../database/models/UsersModel';

export default class LoginServices {
  constructor(private userModel = UserModel) { }

  public async inspectLogin(login: ILogin): Promise<UserModel> {
    const [response] = await this.userModel.findAll({
      where: {
        email: login.email,
      },
      attributes: { exclude: ['password'] },
    });
    return response;
  }
}
