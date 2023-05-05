import { Router } from 'express';
import LoginServices from '../services/LoginServices';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginService = new LoginServices();
const loginController = new LoginController(loginService);

loginRouter.post('/', validateLogin, loginController.login);

export default loginRouter;
