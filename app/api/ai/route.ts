type TeamStats = {
  team: string
  wins: number
  losses: number
  offensiveRating: number
  defensiveRating: number
  pace: number
  ranking: number
}

const cbbTeams: Record<string, TeamStats> = {
  "saint mary's": {
    team: "Saint Mary's",
    wins: 26,
    losses: 8,
    offensiveRating: 114.2,
    defensiveRating: 95.1,
    pace: 63.8,
    ranking: 18,
  },
  "santa clara": {
    team: "Santa Clara",
    wins: 20,
    losses: 13,
    offensiveRating: 111.4,
    defensiveRating: 101.8,
    pace: 68.1,
    ranking: 68,
  },
  duke: {
    team: "Duke",
    wins: 27,
    losses: 7,
    offensiveRating: 118.4,
    defensiveRating: 96.3,
    pace: 67.2,
    ranking: 7,
  },
  unc: {
    team: "UNC",
    wins: 23,
    losses: 11,
    offensiveRating: 116.1,
    defensiveRating: 101.2,
    pace: 71.4,
    ranking: 22,
  },
  kansas: {
    team: "Kansas",
    wins: 22,
    losses: 10,
    offensiveRating: 117.2,
    defensiveRating: 99.4,
    pace: 69.5,
    ranking: 19,
  },
  houston: {
    team: "Houston",
    wins: 29,
    losses: 4,
    offensiveRating: 119.1,
    defensiveRating: 89.8,
    pace: 64.1,
    ranking: 2,
  },
  alabama: {
    team: "Alabama",
    wins: 24,
    losses: 9,
    offensiveRating: 121.0,
    defensiveRating: 100.7,
    pace: 73.2,
    ranking: 11,
  },
  auburn: {
    team: "Auburn",
    wins: 26,
    losses: 7,
    offensiveRating: 118.0,
    defensiveRating: 94.9,
    pace: 69.0,
    ranking: 6,
  },
}

function extractTeams(message: string) {
  if (message.toLowerCase().includes(" vs ")) {
    const [teamA, teamB] = message.split(/ vs /i).map((s) => s.trim())
    return { teamA, teamB }
  }

  if (message.toLowerCase().includes(" or ")) {
    const [teamA, teamB] = message.split(/ or /i).map((s) => s.trim())
    return { teamA, teamB }
  }

  return null
}

function normalizeTeamName(name: string) {
  return name.toLowerCase().trim()
}

function fetchTeamStats(teamName: string): TeamStats | null {
  return cbbTeams[normalizeTeamName(teamName)] ?? null
}

function buildComparison(teamA: TeamStats, teamB: TeamStats) {
  let scoreA = 0
  let scoreB = 0

  if (teamA.offensiveRating > teamB.offensiveRating) scoreA++
  else scoreB++

  if (teamA.defensiveRating < teamB.defensiveRating) scoreA++
  else scoreB++

  if (teamA.wins > teamB.wins) scoreA++
  else scoreB++

  if (teamA.ranking < teamB.ranking) scoreA++
  else scoreB++

  const winner = scoreA >= scoreB ? teamA : teamB
  const loser = winner.team === teamA.team ? teamB : teamA
  const winProb = scoreA === scoreB ? 52 : 58

  return `
Prediction: ${winner.team} wins

${teamA.team}
- Record: ${teamA.wins}-${teamA.losses}
- Off Rating: ${teamA.offensiveRating}
- Def Rating: ${teamA.defensiveRating}
- Pace: ${teamA.pace}
- Ranking: ${teamA.ranking}

${teamB.team}
- Record: ${teamB.wins}-${teamB.losses}
- Off Rating: ${teamB.offensiveRating}
- Def Rating: ${teamB.defensiveRating}
- Pace: ${teamB.pace}
- Ranking: ${teamB.ranking}

Estimated win probability:
${winner.team}: ${winProb}%
${loser.team}: ${100 - winProb}%
  `.trim()
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message) {
      return Response.json({ reply: "Please enter a matchup like Duke vs UNC." }, { status: 400 })
    }

    const parsed = extractTeams(message)

    if (!parsed) {
      return Response.json({
        reply: "Ask a matchup like 'Duke vs UNC' or 'Santa Clara vs Saint Mary's'.",
      })
    }

    const teamA = fetchTeamStats(parsed.teamA)
    const teamB = fetchTeamStats(parsed.teamB)

    if (!teamA || !teamB) {
      return Response.json({
        reply: "I couldn't find one of those teams yet. Add it to the cbbTeams list in route.ts.",
      })
    }

    return Response.json({
      reply: buildComparison(teamA, teamB),
    })
  } catch (error: any) {
    console.error("CBB API ERROR:", error)
    return Response.json(
      { reply: `Error loading college basketball stats: ${error.message || "Unknown error"}` },
      { status: 500 }
    )
  }
}