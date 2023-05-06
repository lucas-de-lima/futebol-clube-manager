import { NextFunction, Request, Response } from 'express';
import statusCodes from '../utils/statusCodes';
import MatchesServices from '../services/MatchesServices';

export default class MatchesController {
  constructor(private matchesService = new MatchesServices()) {}

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.matchesService.getAll();

    return res.status(statusCodes.ok).json(response);
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const response = await this.matchesService.getById(+id);

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
