export default interface IMatch {
  id: number
  homeTeamId: number
  homeTeamGoals:number
  awayTeamId: number
  awayTeamGoals: number
  inProgress: boolean
  homeTeam: {
    id: number
    teamName: string
  },
  awayTeam: {
    id: number
    teamName: string
  }
}
