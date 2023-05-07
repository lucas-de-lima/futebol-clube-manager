import IMatch from '../interfaces/matchInterface';
import MatchesServices from './MatchesServices';
import TeamService from './TeamsServices';

export default class LeaderboardServices {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamsService = new TeamService(),

  ) {}

  private static getTotalPoints(teamMatches: IMatch[], id: number): number {
    const value = LeaderboardServices.getTotalVictories(teamMatches, id)
     * 3 + LeaderboardServices.getTotalDraws(teamMatches);

    return value;
  }

  private static getTotalGames(teamMatches: IMatch[]): number {
    const value = teamMatches.length;
    return value;
  }

  private static getTotalVictories(teamMatches: IMatch[], id: number): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.awayTeamId === id && cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 1;
      }
      if (cur.homeTeamId === id && cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalDraws(teamMatches: IMatch[]): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.homeTeamGoals === cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalLosses(teamMatches: IMatch[], id: number): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.awayTeamId === id && cur.homeTeamGoals > cur.awayTeamGoals) {
        return acc + 1;
      }
      if (cur.homeTeamId === id && cur.homeTeamGoals < cur.awayTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return value;
  }

  private static getTotalGoalsFavor(teamMatches: IMatch[], id: number): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.awayTeamId === id) {
        return acc + cur.awayTeamGoals;
      }
      if (cur.homeTeamId === id) {
        return acc + cur.homeTeamGoals;
      }
      return acc;
    }, 0);
    return value;
  }

  private static getTotalGoalsOwn(teamMatches: IMatch[], id: number): number {
    const value = teamMatches.reduce((acc, cur) => {
      if (cur.awayTeamId === id) {
        return acc + cur.homeTeamGoals;
      }
      if (cur.homeTeamId === id) {
        return acc + cur.awayTeamGoals;
      }
      return acc;
    }, 0);
    return value;
  }

  private static getTotalGoalsBalance(teamMatches: IMatch[], id: number): number {
    const value = LeaderboardServices.getTotalGoalsFavor(teamMatches, id)
       - LeaderboardServices.getTotalGoalsOwn(teamMatches, id);
    return value;
  }

  private static getTotalEfficiency(teamMatches: IMatch[], id: number): number {
    const value = (LeaderboardServices.getTotalPoints(teamMatches, id)
    / (LeaderboardServices.getTotalGames(teamMatches) * 3)) * 100;
    return value;
  }

  private static calculateStatistics(teamMatches: IMatch[], teamName: string, id: number) {
    return {
      name: teamName,
      totalPoints: LeaderboardServices.getTotalPoints(teamMatches, id),
      totalGames: LeaderboardServices.getTotalGames(teamMatches),
      totalVictories: LeaderboardServices.getTotalVictories(teamMatches, id),
      totalDraws: LeaderboardServices.getTotalDraws(teamMatches),
      totalLosses: LeaderboardServices.getTotalLosses(teamMatches, id),
      goalsFavor: LeaderboardServices.getTotalGoalsFavor(teamMatches, id),
      goalsOwn: LeaderboardServices.getTotalGoalsOwn(teamMatches, id),
      goalsBalance: LeaderboardServices.getTotalGoalsBalance(teamMatches, id),
      efficiency: LeaderboardServices.getTotalEfficiency(teamMatches, id),
    };
  }

  private static sortParameters(a: any, b: any) {
    if (a.totalPoints > b.totalPoints) { return -1; }
    if (a.totalPoints < b.totalPoints) { return 1; }
    if (a.totalVictories < b.totalVictories) { return 1; }
    if (a.totalVictories > b.totalVictories) { return -1; }
    if (a.goalsBalance > b.goalsBalance) { return -1; }
    if (a.goalsBalance < b.goalsBalance) { return 1; }
    if (a.goalsFavor > b.goalsFavor) { return -1; }
    if (a.goalsFavor < b.goalsFavor) { return 1; }
    return 0;
  }

  public async getAll() {
    const allTeams = await this.teamsService.getAll();
    const allMatches: any = await this.matchesServices.getAll();
    const response = allTeams.map((team) => {
      const teamMatches: IMatch[] = allMatches
        .filter((match: any) => (match.awayTeamId === team.id || match.homeTeamId === team.id)
         && match.inProgress === false);
      return LeaderboardServices.calculateStatistics(teamMatches, team.teamName, team.id);
    });
    return response.sort(LeaderboardServices.sortParameters);
  }
}
