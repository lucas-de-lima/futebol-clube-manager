import { Request, Response } from 'express';
import LeaderboardHomeServices from '../services/LeaderboardHomeServices';
import statusCodes from '../utils/statusCodes';
import LeaderboardAwayServices from '../services/LeaderboardAwayServices';

export default class LeaderboardController {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeServices(),
    private leaderboardAwayService = new LeaderboardAwayServices(),
  ) {}

  public getAllHome = async (_req: Request, res: Response) => {
    const response = await this.leaderboardHomeService.getAllHome();
    return res.status(statusCodes.ok).json(response);
  };

  public getAllAway = async (_req: Request, res: Response) => {
    const response = await this.leaderboardAwayService.getAllAway();
    return res.status(statusCodes.ok).json(response);
  };
}
