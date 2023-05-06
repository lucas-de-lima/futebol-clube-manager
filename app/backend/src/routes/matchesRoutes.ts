import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();

const matchesController = new MatchesController();

matchesRouter.get('/', matchesController.getAll);
matchesRouter.get('/:id', matchesController.getById);

export default matchesRouter;
