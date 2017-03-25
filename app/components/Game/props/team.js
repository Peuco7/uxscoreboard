
import { shortenTeamName } from 'helpers/utils'

//  mlb home + away team props --> Team component
export const mlbTeamProps = (game, side, league) => {
  const isAllStar = game.game_type === 'A'
  return {
    name: shortenTeamName(game[`${side}_team_name`]),
    code: game[`${side}_file_code`].toLowerCase(),
    filetype: isAllStar ? 'png' : 'svg',
    ws: game[`${side}_win`],
    ls: game[`${side}_loss`],
    score: game.linescore.r[side],
    league
  }
}

//  nba home + away team props --> Team component
export const nbaTeamProps = (game, side, league) => {
  if (game.id === '0031600001') {
    console.log('hi')
    // return {
    //   name: shortenTeamName(game[side].nickname),
    //   code: game[side].abbreviation.toLowerCase(),
    //   league
    // }
  }
  const side2 = side === 'home' ? 'hTeam' : 'vTeam'
  const inGame = game.period.current
  return {
    name: shortenTeamName(game[side].nickname),
    code: game[side].abbreviation.toLowerCase(),
    ws: game[side2].win,
    ls: game[side2].loss,
    score: inGame ? game[side].score : null,
    league
  }
}

//  nhl home + away team props --> Team component
export const nhlTeamProps = (game, side, league) => {
  const inGame = game.status.codedGameState > '2'
  const isAllStar = game.gameType === 'A'
  return {
    name: shortenTeamName(game.teams[side].team.teamName),
    code: game.teams[side].team.abbreviation.toLowerCase(),
    ws: isAllStar ? null : String(game.teams[side].leagueRecord.wins),
    ls: isAllStar ? null : String(game.teams[side].leagueRecord.losses),
    ts: isAllStar ? null : String(game.teams[side].leagueRecord.ot),
    score: inGame ? String(game.teams[side].score) : null,
    league
  }
}