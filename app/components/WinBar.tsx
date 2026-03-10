export default function WinBar({
  teamA,
  teamB,
  probA,
}: {
  teamA: string
  teamB: string
  probA: number
}) {
  const probB = 100 - probA

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span>{teamA}</span>
        <span>{probA}%</span>
      </div>

      <div
        style={{
          height: 12,
          background: "#1e293b",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${probA}%`,
            height: "100%",
            background: "#3b82f6",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        <span>{teamB}</span>
        <span>{probB}%</span>
      </div>
    </div>
  )
}