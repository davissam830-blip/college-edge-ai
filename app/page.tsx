"use client"

import { useState } from "react"
import WinBar from "./components/WinBar"
import { teams } from "./data/teams"

export default function Home() {

  const [team1, setTeam1] = useState("Duke")
  const [team2, setTeam2] = useState("UNC")
  const [prob, setProb] = useState(50)
  const [teamA, setTeamA] = useState<any>(null)
  const [teamB, setTeamB] = useState<any>(null)

  const runPrediction = () => {

    const a = teams.find(t => t.name === team1)
    const b = teams.find(t => t.name === team2)

    if (!a || !b) return

    setTeamA(a)
    setTeamB(b)

    const powerA = a.adjO - a.adjD + a.tempo
    const powerB = b.adjO - b.adjD + b.tempo

    const probability =
      Math.max(
        5,
        Math.min(
          95,
          50 + (powerA - powerB) * 1.2
        )
      )

    setProb(probability)

  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#1e3a8a 0%,#020617 80%)",
        color: "white",
        padding: 40,
        fontFamily: "Arial"
      }}
    >

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <h1 style={{ fontSize: 48 }}>
          College Edge AI
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: 40 }}>
          AI-powered college football & basketball analytics
        </p>

        {/* MATCHUP PREDICTOR */}

        <div
          style={{
            background: "#020617",
            padding: 30,
            borderRadius: 12,
            marginBottom: 40
          }}
        >

          <h2>Matchup Predictor</h2>

          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 20
            }}
          >

            {/* TEAM 1 SELECT */}

            <select
              value={team1}
              onChange={(e) =>
                setTeam1(e.target.value)
              }
              style={{
                padding: 10,
                borderRadius: 6,
                background: "#020617",
                color: "white",
                border: "1px solid #334155"
              }}
            >

              {teams.map(team => (

                <option
                  key={team.name}
                  value={team.name}
                >
                  {team.name}
                </option>

              ))}

            </select>

            {/* TEAM 2 SELECT */}

            <select
              value={team2}
              onChange={(e) =>
                setTeam2(e.target.value)
              }
              style={{
                padding: 10,
                borderRadius: 6,
                background: "#020617",
                color: "white",
                border: "1px solid #334155"
              }}
            >

              {teams.map(team => (

                <option
                  key={team.name}
                  value={team.name}
                >
                  {team.name}
                </option>

              ))}

            </select>

            <button
              onClick={runPrediction}
              style={{
                padding: "10px 20px",
                borderRadius: 6,
                border: "none",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer"
              }}
            >
              Predict
            </button>

          </div>

          {/* TEAM LOGOS */}

          {teamA && teamB && (

            <div
              style={{
                display: "flex",
                gap: 20,
                marginTop: 20
              }}
            >

              <img
                src={teamA.logo}
                width={60}
              />

              <img
                src={teamB.logo}
                width={60}
              />

            </div>

          )}

          <WinBar probability={prob} />

        </div>

        {/* ANALYTICS CARDS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20
          }}
        >

          <div
            style={{
              background: "#020617",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Offensive Rating</h3>
            <p style={{ color: "#94a3b8" }}>
              Measures points scored per possession.
            </p>
          </div>

          <div
            style={{
              background: "#020617",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Defensive Rating</h3>
            <p style={{ color: "#94a3b8" }}>
              Points allowed per possession.
            </p>
          </div>

          <div
            style={{
              background: "#020617",
              padding: 20,
              borderRadius: 10
            }}
          >
            <h3>Tempo</h3>
            <p style={{ color: "#94a3b8" }}>
              Possessions per game.
            </p>
          </div>

        </div>

        {/* DAILY PREDICTIONS */}

        <div style={{ marginTop: 60 }}>

          <h2>Today's AI Predictions</h2>

          <ul style={{ marginTop: 20 }}>

            <li>Duke vs UNC — Duke 61%</li>
            <li>Kansas vs Baylor — Kansas 58%</li>
            <li>UConn vs Marquette — UConn 63%</li>

          </ul>

        </div>

      </div>

    </main>

  )

}