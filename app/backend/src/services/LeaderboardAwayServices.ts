import IMatch from '../interfaces/matchInterface';
import MatchesServices from './MatchesServices';
import TeamService from './TeamsServices';

export default class LeaderboardAwayServices {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamsService = new TeamService(),

  ) {}

  private static getTotalPointsAway(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }
      if (cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 3;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalGamesAway(teamMatches: IMatch[]): number {
    const value = teamMatches.length;
    return value;
  }

  private static getTotalVictoriesAway(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalDrawsAway(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalLossesAway(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalGoalsFavorAway(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    return value;
  }

  private static getTotalGoalsOwnAway(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    return value;
  }

  private static getTotalGoalsBalanceAway(teamMatches: IMatch[]): number {
    const value = LeaderboardAwayServices.getTotalGoalsFavorAway(teamMatches)
       - LeaderboardAwayServices.getTotalGoalsOwnAway(teamMatches);
    return value;
  }

  private static getTotalEfficiencyAway(teamMatches: IMatch[]): number {
    const value = (LeaderboardAwayServices.getTotalPointsAway(teamMatches)
    / (LeaderboardAwayServices.getTotalGamesAway(teamMatches) * 3)) * 100;
    return value;
  }

  private static calculateStatistics(teamMatches: IMatch[], teamName: string) {
    return {
      name: teamName,
      totalPoints: LeaderboardAwayServices.getTotalPointsAway(teamMatches),
      totalGames: LeaderboardAwayServices.getTotalGamesAway(teamMatches),
      totalVictories: LeaderboardAwayServices.getTotalVictoriesAway(teamMatches),
      totalDraws: LeaderboardAwayServices.getTotalDrawsAway(teamMatches),
      totalLosses: LeaderboardAwayServices.getTotalLossesAway(teamMatches),
      goalsFavor: LeaderboardAwayServices.getTotalGoalsFavorAway(teamMatches),
      goalsOwn: LeaderboardAwayServices.getTotalGoalsOwnAway(teamMatches),
      goalsBalance: LeaderboardAwayServices.getTotalGoalsBalanceAway(teamMatches),
      efficiency: LeaderboardAwayServices.getTotalEfficiencyAway(teamMatches),
    };
  }

  public async getAllAway() {
    const allTeams = await this.teamsService.getAll();
    const allMatches: any = await this.matchesServices.getAll();
    const response = allTeams.map((team) => {
      const teamMatches: IMatch[] = allMatches
        .filter((match: any) => match.awayTeamId === team.id && match.inProgress === false);
      return LeaderboardAwayServices.calculateStatistics(teamMatches, team.teamName);
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
