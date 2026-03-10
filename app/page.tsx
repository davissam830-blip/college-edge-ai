"use client"

import { useState } from "react"
import { teams } from "./data/teams"
import WinBar from "./components/WinBar"

export default function Home() {

  const [teamA, setTeamA] = useState("")
  const [teamB, setTeamB] = useState("")
  const [probability, setProbability] = useState<number | null>(null)

  const [teamAData, setTeamAData] = useState<any>(null)
  const [teamBData, setTeamBData] = useState<any>(null)

  const predict = () => {

    const a = teams.find(
      (t) => t.name.toLowerCase() === teamA.toLowerCase()
    )

    const b = teams.find(
      (t) => t.name.toLowerCase() === teamB.toLowerCase()
    )

    if (!a || !b) {
      alert("Team not found")
      return
    }

    setTeamAData(a)
    setTeamBData(b)

    const scoreA = a.adjO - b.adjD
    const scoreB = b.adjO - a.adjD

    const prob = 50 + (scoreA - scoreB) * 2
    const finalProb = Math.max(5, Math.min(95, prob))

    setProbability(Math.round(finalProb))
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top,#1e3a8a 0%,#0f172a 60%,#020617 100%)",
        padding: 40,
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <h1 style={{ fontSize: 48 }}>College Edge AI</h1>

        <p style={{ color: "#9ca3af", marginBottom: 40 }}>
          AI-powered college basketball analytics
        </p>

        <div
          style={{
            background: "#020617",
            padding: 30,
            borderRadius: 14
          }}
        >

          <h2>Matchup Predictor</h2>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

            <select
              value={teamA}
              onChange={(e) => setTeamA(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 6,
                background: "#020617",
                color: "white"
              }}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>

            <select
              value={teamB}
              onChange={(e) => setTeamB(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 6,
                background: "#020617",
                color: "white"
              }}
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.name} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>

            <button
              onClick={predict}
              style={{
                background: "#3b82f6",
                border: "none",
                padding: "10px 20px",
                borderRadius: 6,
                color: "white",
                cursor: "pointer"
              }}
            >
              Predict
            </button>

          </div>

          {probability !== null && (
            <div style={{ marginTop: 25 }}>

              <WinBar probability={probability} />

              <p style={{ marginTop: 10 }}>
                Win Probability: {probability}%
              </p>

            </div>
          )}

        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginTop: 40
          }}
        >

          <div style={{ background: "#020617", padding: 20, borderRadius: 10 }}>
            <h3>Offensive Rating</h3>
            <p style={{ color: "#9ca3af" }}>
              {teamAData ? teamAData.adjO : "--"}
            </p>
          </div>

          <div style={{ background: "#020617", padding: 20, borderRadius: 10 }}>
            <h3>Defensive Rating</h3>
            <p style={{ color: "#9ca3af" }}>
              {teamAData ? teamAData.adjD : "--"}
            </p>
          </div>

          <div style={{ background: "#020617", padding: 20, borderRadius: 10 }}>
            <h3>Tempo</h3>
            <p style={{ color: "#9ca3af" }}>
              {teamAData ? teamAData.tempo : "--"}
            </p>
          </div>

        </div>

        <div style={{ marginTop: 40 }}>
          <h3>Today's AI Predictions</h3>

          <p>Duke vs UNC — Duke 61%</p>
          <p>Kansas vs Baylor — Kansas 58%</p>
          <p>UConn vs Marquette — UConn 63%</p>
        </div>

      </div>
    </main>
  )
} 