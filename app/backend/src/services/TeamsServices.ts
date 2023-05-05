import CustomError from '../utils/CustomError';
import TeamsModel from '../database/models/TeamsModel';
import statusCodes from '../utils/statusCodes';

export default class TeamService {
  constructor(private teamModel = TeamsModel) {}

  public async getAll(): Promise<TeamsModel[]> {
    const response = await this.teamModel.findAll();
    return response;
  }

  public async getById(id: number): Promise<TeamsModel> {
    const response = await this.teamModel.findByPk(id);

    if (response === null) {
      throw new CustomError(statusCodes.badRequest, 'Team not found');
    }
    return response;
  }
}
