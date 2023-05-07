import { Request, Response, NextFunction } from 'express';
import IMatchCreate from '../interfaces/matchCreateInterface';
import statusCodes from '../utils/statusCodes';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  constructor(private matchesService = new MatchesServices()) {}

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress) {
      const responseQuery = await this.matchesService.getByQuery(inProgress as string);
      return res.status(200).json(responseQuery);
    }

    const response = await this.matchesService.getAll();
    return res.status(statusCodes.ok).json(response);
  };

  public finish = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finish(+id);
    res.status(statusCodes.ok).json({ message: 'Finished' });
  };

  public updateById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const update = req.body;
    const response = await this.matchesService.updateById(+id, update);
    res.status(statusCodes.ok).json(response);
  };

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const match: IMatchCreate = req.body;
      const response = await this.matchesService.create(match);
      res.status(statusCodes.created).json(response);
    } catch (error) {
      next(error);
    }
  };
}
