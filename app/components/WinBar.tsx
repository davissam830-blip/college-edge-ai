export default function WinBar({ probability }: { probability: number }) {

  return (
    <div
      style={{
        marginTop: 20,
        background: "#1e293b",
        borderRadius: 10,
        overflow: "hidden",
        height: 26
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

      <div
        style={{
          position: "relative",
          top: -22,
          textAlign: "center",
          fontSize: 14
        }}
      >
        Win Probability: {probability}%
      </div>
    </div>
  )
}