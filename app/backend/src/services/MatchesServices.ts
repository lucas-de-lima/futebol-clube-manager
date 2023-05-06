import CustomError from '../utils/CustomError';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import statusCodes from '../utils/statusCodes';

export default class MatchesServices {
  constructor(private matchesModel = MatchesModel, private teamsModel = TeamsModel) {}

  public async getAll(): Promise<MatchesModel[]> {
    const response = await this.matchesModel.findAll(
      {
        include: [
          { model: this.teamsModel, as: 'homeTeam' },
          { model: this.teamsModel, as: 'awayTeam' },
        ],
      },
    );
    return response;
  }

  public async getById(id: number): Promise<MatchesModel> {
    const response = await this.matchesModel.findByPk(id);

    if (response === null) {
      throw new CustomError(statusCodes.badRequest, 'Team not found');
    }
    return response;
  }
}
