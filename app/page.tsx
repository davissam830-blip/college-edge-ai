"use client"

import { useState } from "react"
import { teams } from "./data/teams"
import WinBar from "./components/WinBar"

export default function Home() {

const [teamA, setTeamA] = useState("North Carolina")
const [teamB, setTeamB] = useState("Kansas")
const [probability, setProbability] = useState<number | null>(null)

const teamAData = teams.find(t => t.name === teamA)
const teamBData = teams.find(t => t.name === teamB)

const predict = () => {

if (!teamAData || !teamBData) return

const scoreA = teamAData.adjO - teamBData.adjD
const scoreB = teamBData.adjO - teamAData.adjD

const prob = 50 + (scoreA - scoreB) * 2
const finalProb = Math.max(5, Math.min(95, prob))

setProbability(Math.round(finalProb))

}

return (

<main style={{
background:"#0d1c3d",
minHeight:"100vh",
padding:"60px",
color:"white",
fontFamily:"Arial"
}}>

<h1 style={{fontSize:48}}>College Edge AI</h1>
<p style={{opacity:.7}}>AI-powered college basketball analytics</p>

{/* MATCHUP BOX */}

<div style={{
background:"#020c24",
padding:30,
borderRadius:12,
marginTop:40,
maxWidth:900
}}>

<h3>Matchup Predictor</h3>

<select value={teamA} onChange={e=>setTeamA(e.target.value)}>
{teams.map(t=>(
<option key={t.name}>{t.name}</option>
))}
</select>

<select
value={teamB}
onChange={e=>setTeamB(e.target.value)}
style={{marginLeft:10}}
>
{teams.map(t=>(
<option key={t.name}>{t.name}</option>
))}
</select>

<button
onClick={predict}
style={{
marginLeft:15,
background:"#3b82f6",
border:"none",
padding:"10px 20px",
borderRadius:6,
color:"white",
cursor:"pointer"
}}
>
Predict
</button>

{probability !== null && (
<>
<WinBar probability={probability} />
<p style={{marginTop:10}}>
Win Probability: {probability}%
</p>
</>
)}

</div>

{/* TEAM DISPLAY */}

{teamAData && teamBData && (

<div style={{
display:"flex",
alignItems:"center",
gap:30,
marginTop:30
}}>

<div style={{display:"flex",alignItems:"center",gap:10}}>
<img src={teamAData.logo} width={50}/>
<b>{teamAData.name}</b>
</div>

<span style={{opacity:.7}}>vs</span>

<div style={{display:"flex",alignItems:"center",gap:10}}>
<img src={teamBData.logo} width={50}/>
<b>{teamBData.name}</b>
</div>

</div>

)}

{/* ANALYTICS */}

{teamAData && teamBData && (

<div style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:20,
marginTop:30,
maxWidth:900
}}>

<div style={{
background:"#020c24",
padding:20,
borderRadius:10
}}>
<h4>{teamAData.name} Offensive Rating</h4>
<p>{teamAData.adjO}</p>
</div>

<div style={{
background:"#020c24",
padding:20,
borderRadius:10
}}>
<h4>{teamBData.name} Defensive Rating</h4>
<p>{teamBData.adjD}</p>
</div>

<div style={{
background:"#020c24",
padding:20,
borderRadius:10
}}>
<h4>Game Tempo</h4>
<p>{Math.round((teamAData.tempo + teamBData.tempo)/2)}</p>
</div>

</div>

)}

{/* AI PICKS */}

<div style={{marginTop:40}}>

<h3>Today's AI Predictions</h3>

<p>Duke vs UNC — Duke 61%</p>
<p>Kansas vs Baylor — Kansas 58%</p>
<p>UConn vs Marquette — UConn 63%</p>

</div>

</main>

)

} 