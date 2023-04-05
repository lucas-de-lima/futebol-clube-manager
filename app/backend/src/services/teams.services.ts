import Teams from '../database/models/Team';

export default class TeamService {
  private teamModel;

  constructor() {
    this.teamModel = Teams;
  }

  public getAll = async (): Promise<Teams[]> => {
    const response = await this.teamModel.findAll();
    return response;
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
