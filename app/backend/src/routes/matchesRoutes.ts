import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import validateToken from '../middlewares/validateToken';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.patch('/:id/finish', validateToken, matchesController.finish);
matchesRouter.patch('/:id', validateToken, matchesController.updateById);
matchesRouter.post('/', validateToken, matchesController.create);

export default matchesRouter;
