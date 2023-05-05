import { INTEGER, BOOLEAN, Model } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';
// import OtherModel from './OtherModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  timestamps: false,
});

TeamsModel.belongsTo(MatchesModel, { foreignKey: 'id', as: 'homeTeam' });
TeamsModel.belongsTo(MatchesModel, { foreignKey: 'id', as: 'awayTeam' });

MatchesModel.hasMany(TeamsModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
MatchesModel.hasMany(TeamsModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default MatchesModel;
