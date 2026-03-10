"use client"

import { useState } from "react"

export default function Home() {
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    try {
      setLoading(true)
      setResponse("")

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      setResponse(data.reply || "No response returned.")
    } catch (error) {
      setResponse("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e3a8a 0%, #0f172a 35%, #020617 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#93c5fd",
              fontSize: "14px",
              marginBottom: "18px",
            }}
          >
            College Football + College Basketball Analytics
          </div>

          <h1
            style={{
              fontSize: "56px",
              margin: "0 0 14px 0",
              fontWeight: "bold",
              letterSpacing: "-1px",
            }}
          >
            College Edge AI
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              fontSize: "20px",
              lineHeight: 1.6,
              color: "#cbd5e1",
            }}
          >
            AI-powered college football and college basketball analytics,
            predictions, and matchup insights built for fans, bettors, and
            sports content creators.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 0.9fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.82)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "24px",
              padding: "28px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "10px",
                fontSize: "28px",
              }}
            >
              Ask the model
            </h2>

            <p
              style={{
                marginTop: 0,
                color: "#94a3b8",
                lineHeight: 1.6,
                marginBottom: "22px",
              }}
            >
              Try matchups like <strong>Duke vs UNC</strong>,{" "}
              <strong>Georgia vs Alabama</strong>, or{" "}
              <strong>Santa Clara vs Saint Mary&apos;s</strong>.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter a matchup..."
                style={{
                  flex: 1,
                  minWidth: "260px",
                  padding: "16px 18px",
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.05)",
                  color: "white",
                  fontSize: "16px",
                  outline: "none",
                }}
              />

              <button
                onClick={sendMessage}
                style={{
                  padding: "16px 24px",
                  borderRadius: "16px",
                  border: "none",
                  background: "linear-gradient(135deg, #60a5fa, #2563eb)",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(37,99,235,0.35)",
                }}
              >
                Ask AI
              </button>
            </div>

            <div
              style={{
                borderRadius: "20px",
                padding: "22px",
                background: "rgba(2, 6, 23, 0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: "180px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: "12px",
                }}
              >
                AI Answer
              </div>

              <p
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: 1.7,
                  color: "#e2e8f0",
                  margin: 0,
                  fontSize: "16px",
                }}
              >
                {loading
                  ? "Loading..."
                  : response || "Your matchup breakdown will appear here."}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            <div
              style={{
                background: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "22px",
                padding: "22px",
                boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  color: "#93c5fd",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Coverage
              </div>
              <h3 style={{ margin: "0 0 10px 0", fontSize: "22px" }}>
                Football + Basketball
              </h3>
              <p style={{ margin: 0, color: "#cbd5e1", lineHeight: 1.6 }}>
                Compare teams, evaluate matchups, and build prediction-style
                insights across major college sports.
              </p>
            </div>

            <div
              style={{
                background: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "22px",
                padding: "22px",
                boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  color: "#93c5fd",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Features
              </div>
              <ul
                style={{
                  paddingLeft: "18px",
                  margin: 0,
                  color: "#cbd5e1",
                  lineHeight: 1.9,
                }}
              >
                <li>Matchup breakdowns</li>
                <li>Win probability ideas</li>
                <li>Team comparison analytics</li>
                <li>Content creator talking points</li>
              </ul>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(15,23,42,0.88))",
                border: "1px solid rgba(96,165,250,0.25)",
                borderRadius: "22px",
                padding: "22px",
                boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  textTransform: "uppercase",
                  color: "#bfdbfe",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Sample prompts
              </div>
              <div style={{ color: "#e2e8f0", lineHeight: 1.8 }}>
                <div>• Georgia vs Alabama</div>
                <div>• Duke vs UNC</div>
                <div>• Kansas vs Houston</div>
                <div>• Santa Clara vs Saint Mary&apos;s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}