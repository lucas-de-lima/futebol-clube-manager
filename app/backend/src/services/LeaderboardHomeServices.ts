import IMatch from '../interfaces/matchInterface';
import MatchesServices from './MatchesServices';
import TeamService from './TeamsServices';

export default class LeaderboardHomeServices {
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
    const value = LeaderboardHomeServices.getTotalGoalsFavorHome(teamMatches)
       - LeaderboardHomeServices.getTotalGoalsOwnHome(teamMatches);
    return value;
  }

  private static getTotalEfficiencyHome(teamMatches: IMatch[]): number {
    const value = (LeaderboardHomeServices.getTotalPointsHome(teamMatches)
    / (LeaderboardHomeServices.getTotalGamesHome(teamMatches) * 3)) * 100;
    return value;
  }

  private static calculateStatistics(teamMatches: IMatch[], teamName: string) {
    return {
      name: teamName,
      totalPoints: LeaderboardHomeServices.getTotalPointsHome(teamMatches),
      totalGames: LeaderboardHomeServices.getTotalGamesHome(teamMatches),
      totalVictories: LeaderboardHomeServices.getTotalVictoriesHome(teamMatches),
      totalDraws: LeaderboardHomeServices.getTotalDrawsHome(teamMatches),
      totalLosses: LeaderboardHomeServices.getTotalLossesHome(teamMatches),
      goalsFavor: LeaderboardHomeServices.getTotalGoalsFavorHome(teamMatches),
      goalsOwn: LeaderboardHomeServices.getTotalGoalsOwnHome(teamMatches),
      goalsBalance: LeaderboardHomeServices.getTotalGoalsBalanceHome(teamMatches),
      efficiency: LeaderboardHomeServices.getTotalEfficiencyHome(teamMatches),
    };
  }

  public async getAllHome() {
    const allTeams = await this.teamsService.getAll();
    const allMatches: any = await this.matchesServices.getAll();
    const response = allTeams.map((team) => {
      const teamMatches: IMatch[] = allMatches
        .filter((match: any) => match.homeTeamId === team.id && match.inProgress === false);
      return LeaderboardHomeServices.calculateStatistics(teamMatches, team.teamName);
    });
    return response.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) { return -1; }
      if (a.totalPoints < b.totalPoints) { return 1; }

      if (a.totalVictories < b.totalVictories) { return 1; }
      if (a.totalVictories > b.totalVictories) { return -1; }

      if (a.goalsBalance > b.goalsBalance) { return -1; }
      if (a.goalsBalance < b.goalsBalance) { return 1; }

      if (a.goalsFavor > b.goalsFavor) { return -1; }
      if (a.goalsFavor < b.goalsFavor) { return 1; }

      return 0;
    });
  }
}
