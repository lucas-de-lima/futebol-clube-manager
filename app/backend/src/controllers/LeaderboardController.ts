import { Request, Response } from 'express';
import LeaderboardServices from '../services/LeaderboardServices';
import statusCodes from '../utils/statusCodes';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardServices()) {}

  public getAllHome = async (_req: Request, res: Response) => {
    const response = await this.leaderboardService.getAllHome();
    return res.status(statusCodes.ok).json(response);
  };

  //   public getById = async (req: Request, res: Response, next: NextFunction) => {
  //     try {
  //       const { id } = req.params;

  //       const response = await this.teamService.getById(+id);

//       return res.status(200).json(response);
//     } catch (error) {
//       next(error);
//     }
//   };
}
