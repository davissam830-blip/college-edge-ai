"use client"

import { useState } from "react"
import WinBar from "./components/WinBar"

export default function Home() {

  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")
  const [sport, setSport] = useState("football")
  const [result, setResult] = useState("")
  const [prob, setProb] = useState(55)
  const [loading, setLoading] = useState(false)

  const runPrediction = async () => {

    if (!team1 || !team2) return

    setLoading(true)
    setResult("")

    try {

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `Who wins ${team1} vs ${team2} in ${sport}? Include win probability.`
        })
      })

      const data = await res.json()

      setResult(data.reply)

      const randomProb = Math.floor(Math.random() * 20) + 50
      setProb(randomProb)

    } catch {
      setResult("Error loading matchup.")
    }

    setLoading(false)
  }

  return (

    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e3a8a 0%, #0f172a 40%, #020617 100%)",
        color: "white",
        padding: 40,
        fontFamily: "Arial"
      }}
    >

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <h1 style={{ fontSize: 52, marginBottom: 10 }}>
          College Edge AI
        </h1>

        <p style={{ color: "#cbd5e1", marginBottom: 40 }}>
          AI-powered college football & basketball analytics platform
        </p>

        {/* Input Card */}

        <div
          style={{
            background: "#0f172a",
            padding: 30,
            borderRadius: 14,
            marginBottom: 30
          }}
        >

          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              style={{
                padding: 10,
                borderRadius: 6,
                background: "#020617",
                color: "white",
                border: "1px solid #334155"
              }}
            >
              <option value="football">College Football</option>
              <option value="basketball">College Basketball</option>
            </select>

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
                padding: "10px 20px",
                borderRadius: 6,
                border: "none",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer"
              }}
            >
              Ask AI
            </button>

          </div>

          {loading && <p>Running model...</p>}

          {result && (
            <>
              <WinBar probability={prob} />
              <p style={{ marginTop: 20 }}>{result}</p>
            </>
          )}

        </div>

        {/* Analytics Section */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 20
          }}
        >

          <div
            style={{
              background: "#0f172a",
              padding: 20,
              borderRadius: 12
            }}
          >
            <h3>Offensive Rating</h3>
            <p style={{ color: "#94a3b8" }}>
              Compare scoring efficiency and pace.
            </p>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: 20,
              borderRadius: 12
            }}
          >
            <h3>Defensive Rating</h3>
            <p style={{ color: "#94a3b8" }}>
              Points allowed per possession and opponent efficiency.
            </p>
          </div>

          <div
            style={{
              background: "#0f172a",
              padding: 20,
              borderRadius: 12
            }}
          >
            <h3>Advanced Metrics</h3>
            <p style={{ color: "#94a3b8" }}>
              Tempo, rebounding %, turnover %, and matchup edge.
            </p>
          </div>

        </div>

      </div>

    </main>
  )
}