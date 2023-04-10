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

  public getById = async (req: Request, res: Response) => {
    const ID = req.params.id; // captura i ID do params que é uma string
    const id = parseInt(ID, 10); // converte a string para inteiro com a base decimal (base 10)

    const response = await this.teamService.getById(id);

    if ('type' in response) {
      return res.status(response.type).json(response.message);
    }

    return res.status(200).json(response);
  };

  //   public create = async (team): Promise<> => {

  //   };

  // public update = async (team, id) => {

  // };

  // public remove = async (id) => {

  // };
}
