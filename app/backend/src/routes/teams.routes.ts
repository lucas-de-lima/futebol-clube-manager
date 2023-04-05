import { Router } from 'express';
import TeamController from '../controllers/teams.controller';

const teamsRouter = Router();

const teamsController = new TeamController();

teamsRouter.get('/', teamsController.getAll);

export default teamsRouter;
