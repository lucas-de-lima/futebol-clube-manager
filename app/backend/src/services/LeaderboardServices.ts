import IMatch from '../interfaces/matchInterface';
import MatchesServices from './MatchesServices';
import TeamService from './TeamsServices';

export default class LeaderboardServices {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamsService = new TeamService(),

  ) {}

  private static getTotalPointsHome(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 3;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalGamesHome(teamMatches: IMatch[]): number {
    const value = teamMatches.length;
    return value;
  }

  private static getTotalVictoriesHome(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalDrawsHome(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalLossesHome(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalGoalsFavorHome(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    return value;
  }

  private static getTotalGoalsOwnHome(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    return value;
  }

  private static getTotalGoalsBalanceHome(teamMatches: IMatch[]): number {
    const value = LeaderboardServices.getTotalGoalsFavorHome(teamMatches)
       - LeaderboardServices.getTotalGoalsOwnHome(teamMatches);
    return value;
  }

  private static getTotalEfficiencyHome(teamMatches: IMatch[]): number {
    const value = (LeaderboardServices.getTotalPointsHome(teamMatches)
    / (LeaderboardServices.getTotalGamesHome(teamMatches) * 3)) * 100;
    return value;
  }

  private static calculateStatistics(teamMatches: IMatch[], teamName: string) {
    return {
      name: teamName,
      totalPoints: LeaderboardServices.getTotalPointsHome(teamMatches),
      totalGames: LeaderboardServices.getTotalGamesHome(teamMatches),
      totalVictories: LeaderboardServices.getTotalVictoriesHome(teamMatches),
      totalDraws: LeaderboardServices.getTotalDrawsHome(teamMatches),
      totalLosses: LeaderboardServices.getTotalLossesHome(teamMatches),
      goalsFavor: LeaderboardServices.getTotalGoalsFavorHome(teamMatches),
      goalsOwn: LeaderboardServices.getTotalGoalsOwnHome(teamMatches),
      goalsBalance: LeaderboardServices.getTotalGoalsBalanceHome(teamMatches),
      efficiency: LeaderboardServices.getTotalEfficiencyHome(teamMatches),
    };
  }

  public async getAllHome() {
    const allTeams = await this.teamsService.getAll();
    const allMatches: any = await this.matchesServices.getAll();
    const response = allTeams.map((team) => {
      const teamMatches: IMatch[] = allMatches
        .filter((match: any) => match.homeTeamId === team.id && match.inProgress === false);
      return LeaderboardServices.calculateStatistics(teamMatches, team.teamName);
    });
    return response;
  }
}
