"use client"

import { useState } from "react"
import WinBar from "./components/WinBar"

export default function Home() {
  const [matchup, setMatchup] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runPrediction = async () => {
    try {
      setLoading(true)

      const res = await fetch("/api/compare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sport: "basketball",
          matchup,
        }),
      })

      const data = await res.json()

      setResult(data.reply)
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
          "radial-gradient(circle at top,#1e3a8a 0%,#0f172a 40%,#020617 100%)",
        color: "white",
        padding: 40,
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, marginBottom: 10 }}>College Edge AI</h1>

        <p style={{ color: "#cbd5e1", marginBottom: 30 }}>
          AI-powered college football and basketball analytics platform
        </p>

        <div
          style={{
            background: "#0f172a",
            padding: 24,
            borderRadius: 16,
            marginBottom: 24,
          }}
        >
          <h2>Ask the AI</h2>

          <input
            value={matchup}
            onChange={(e) => setMatchup(e.target.value)}
            placeholder="Example: Duke vs UNC"
            style={{
              width: "100%",
              padding: 12,
              marginTop: 12,
              borderRadius: 8,
              border: "none",
            }}
          />

          <button
            onClick={runPrediction}
            style={{
              marginTop: 12,
              padding: "10px 18px",
              borderRadius: 8,
              border: "none",
              background: "#3b82f6",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Run Prediction
          </button>

          <div style={{ marginTop: 20 }}>
            {loading ? "Analyzing matchup..." : result}
          </div>
        </div>

        <div
          style={{
            background: "#0f172a",
            padding: 24,
            borderRadius: 16,
          }}
        >
          <h2>Example Win Probability</h2>

          <WinBar teamA="Duke" teamB="UNC" probA={58} />
        </div>
      </div>
    </main>
  )
}