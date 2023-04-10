import { Request, Response } from 'express';
import TeamService from '../services/teams.services';
import statusCodes from './statusCodes';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const response = await this.teamService.getAll();
    console.log(response);

    return res.status(statusCodes.ok).json(response);
  };

  // public getById = async (id) => {

  // };

  //   public create = async (team): Promise<> => {

  //   };

  // public update = async (team, id) => {

  // };

  // public remove = async (id) => {

  // };
}