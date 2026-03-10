export default function WinBar({ probability }: { probability: number }) {
  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          background: "#1e293b",
          borderRadius: 10,
          overflow: "hidden",
          height: 28
        }}
      >
        <div
          style={{
            width: `${probability}%`,
            background: "#3b82f6",
            height: "100%",
            transition: "width 0.5s"
          }}
        />
      </div>

      <p style={{ marginTop: 6, color: "#cbd5e1" }}>
        Win Probability: {probability}%
      </p>
    </div>
  )
}