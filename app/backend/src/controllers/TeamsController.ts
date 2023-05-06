import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamsServices';
import statusCodes from '../utils/statusCodes';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.teamService.getAll();
    console.log(response);

    return res.status(statusCodes.ok).json(response);
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const response = await this.teamService.getById(+id);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
