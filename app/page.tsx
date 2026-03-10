"use client"

import { useState } from "react"
import WinBar from "./components/WinBar"

export default function Home() {

  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")
  const [result, setResult] = useState("")
  const [prob, setProb] = useState(55)

  const runPrediction = async () => {

    const randomProb = Math.floor(Math.random() * 30) + 50
    setProb(randomProb)

    try {

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Predict the winner of ${team1} vs ${team2} and explain why`
        })
      })

      const data = await res.json()
      setResult(data.reply)

    } catch {
      setResult("Prediction engine loading...")
    }
  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e3a8a 0%, #020617 80%)",
        padding: 40,
        fontFamily: "Arial",
        color: "white"
      }}
    >

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <h1 style={{ fontSize: 50 }}>College Edge AI</h1>
        <p style={{ color: "#94a3b8", marginBottom: 40 }}>
          AI-powered college football & basketball analytics
        </p>

        {/* Matchup Input */}

        <div
          style={{
            background: "#020617",
            padding: 30,
            borderRadius: 12,
            marginBottom: 40
          }}
        >

          <h2>Matchup Predictor</h2>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>

            <input
              placeholder="Team 1"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #334155",
                background: "#020617",
                color: "white"
              }}
            />

            <input
              placeholder="Team 2"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 6,
                border: "1px solid #334155",
                background: "#020617",
                color: "white"
              }}
            />

            <button
              onClick={runPrediction}
              style={{
                padding: "10px 18px",
                borderRadius: 6,
                background: "#3b82f6",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}
            >
              Predict
            </button>

          </div>

          <WinBar probability={prob} />

          {result && (
            <p style={{ marginTop: 20, color: "#cbd5e1" }}>
              {result}
            </p>
          )}

        </div>

        {/* Analytics Cards */}

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

      </div>

    </main>
  )
}