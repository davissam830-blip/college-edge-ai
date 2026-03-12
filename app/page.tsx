"use client"

import { useState } from "react"
import { teams } from "./data/teams"
import WinBar from "./components/WinBar"

export default function Home() {

const [teamA, setTeamA] = useState("")
const [teamB, setTeamB] = useState("")
const [probability, setProbability] = useState<number | null>(null)

const teamAData = teams.find(
t => t.name.toLowerCase() === teamA.toLowerCase()
)

const teamBData = teams.find(
t => t.name.toLowerCase() === teamB.toLowerCase()
)

function predict() {

if (!teamAData || !teamBData) {
alert("Team not found")
return
}

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

<input
placeholder="Team 1 (ex: Duke)"
value={teamA}
onChange={e => setTeamA(e.target.value)}
style={{
padding:10,
borderRadius:6,
border:"none",
marginRight:10
}}
/>

<input
placeholder="Team 2 (ex: North Carolina)"
value={teamB}
onChange={e => setTeamB(e.target.value)}
style={{
padding:10,
borderRadius:6,
border:"none",
marginRight:10
}}
/>

<button
onClick={predict}
style={{
background:"#3b82f6",
border:"none",
padding:"10px 20px",
borderRadius:6,
color:"white",
cursor:"pointer"
}}

>

Predict </button>

{probability !== null && (
<> <WinBar probability={probability}/>

<p style={{marginTop:10}}>Win Probability: {probability}%</p>
</>
)}

</div>

{/* TEAM ANALYTICS */}

{teamAData && teamBData && (

<div style={{
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:40,
marginTop:40,
maxWidth:900
}}>

{/* TEAM A */}

<div style={{
background:"#020c24",
padding:25,
borderRadius:10
}}>

<div style={{display:"flex",alignItems:"center",gap:10}}>
<img src={teamAData.logo} width={40}/>
<h3>{teamAData.name}</h3>
</div>

<p>Offensive Rating: {teamAData.adjO}</p>
<p>Defensive Rating: {teamAData.adjD}</p>
<p>Tempo: {teamAData.tempo}</p>

</div>

{/* TEAM B */}

<div style={{
background:"#020c24",
padding:25,
borderRadius:10
}}>

<div style={{display:"flex",alignItems:"center",gap:10}}>
<img src={teamBData.logo} width={40}/>
<h3>{teamBData.name}</h3>
</div>

<p>Offensive Rating: {teamBData.adjO}</p>
<p>Defensive Rating: {teamBData.adjD}</p>
<p>Tempo: {teamBData.tempo}</p>

</div>

</div>

)}

</main>

)

}
