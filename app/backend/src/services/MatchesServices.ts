// import { response } from 'express';
import IMatchCreate from '../interfaces/matchCreateInterface';
import IMatch from '../interfaces/matchInterface';
import CustomError from '../utils/CustomError';
import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import statusCodes from '../utils/statusCodes';

export default class MatchesServices {
  constructor(private matchesModel = MatchesModel, private teamsModel = TeamsModel) {}

  public async getAll(): Promise<IMatch[] | MatchesModel[]> {
    const response: IMatch[] | MatchesModel[] = await this.matchesModel.findAll(
      {
        include: [
          { model: this.teamsModel, as: 'homeTeam' },
          { model: this.teamsModel, as: 'awayTeam' },
        ],
      },
    );
    return response;
  }

  public async getByQuery(query: string): Promise<IMatch[] | MatchesModel[]> {
    const response = await this.matchesModel.findAll(
      {
        where: { inProgress: JSON.parse(query) },
        include: [
          { model: this.teamsModel, as: 'homeTeam' },
          { model: this.teamsModel, as: 'awayTeam' },
        ],
      },
    );
    return response;
  }

  public async getById(id: number): Promise<IMatch | MatchesModel | null> {
    const response = await this.matchesModel.findByPk(id);
    return response;
  }

  public async updateById(
    id: number,
    { homeTeamGoals, awayTeamGoals }: Partial<IMatch>,
  ) {
    await this.matchesModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );

    const response = await this.getById(id);
    return response;
  }

  public async finish(id: number) {
    await this.matchesModel.update({ inProgress: false }, { where: { id } });
  }

  public async create(match: IMatchCreate) {
    if (match.homeTeamId === match.awayTeamId) {
      throw new CustomError(
        statusCodes.unprocessableEntity,
        'It is not possible to create a match with two equal teams',
      );
    }
    if (!(await this.getById(+match.homeTeamId))
     || !(await this.getById(+match.awayTeamId))) {
      throw new CustomError(
        statusCodes.notFound,
        'There is no team with such id!',
      );
    }
    const response = await this.matchesModel.create(
      { ...match, inProgress: true },
    );
    return response;
  }
}
