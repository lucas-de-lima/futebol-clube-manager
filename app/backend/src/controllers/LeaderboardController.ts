import { Request, Response } from 'express';
import LeaderboardHomeServices from '../services/LeaderboardHomeServices';
import statusCodes from '../utils/statusCodes';
import LeaderboardAwayServices from '../services/LeaderboardAwayServices';
import LeaderboardServices from '../services/LeaderboardServices';

export default class LeaderboardController {
  constructor(
    private leaderboardHomeService = new LeaderboardHomeServices(),
    private leaderboardAwayService = new LeaderboardAwayServices(),
    private leaderboardService = new LeaderboardServices(),
  ) {}

  public getAllHome = async (_req: Request, res: Response) => {
    const response = await this.leaderboardHomeService.getAllHome();
    return res.status(statusCodes.ok).json(response);
  };

  public getAllAway = async (_req: Request, res: Response) => {
    const response = await this.leaderboardAwayService.getAllAway();
    return res.status(statusCodes.ok).json(response);
  };

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.leaderboardService.getAll();
    return res.status(statusCodes.ok).json(response);
  };
}
