import { Request, Response } from 'express';
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
}
