import Teams from '../database/models/Team';
import statusCodes from '../controllers/statusCodes';

type TeamResponseError = { type: number; message: string; };
export default class TeamService {
  private teamModel;

  constructor() {
    this.teamModel = Teams;
  }

  // teamResponse = (type:number, message:string) => ({ type, message });

  public getAll = async (): Promise<Teams[]> => {
    const response = await this.teamModel.findAll();
    return response;
  };

  public getById = async (id: number): Promise<Teams | TeamResponseError> => {
    const response = await this.teamModel.findByPk(id);

    if (response === null) {
      return { type: statusCodes.notFound, message: 'Team not found' };
    }
    return response;
  };

  //   public create = async (team): Promise<> => {

  //   };

  // public update = async (team, id) => {

  // };

  // public remove = async (id) => {

  // };
}
