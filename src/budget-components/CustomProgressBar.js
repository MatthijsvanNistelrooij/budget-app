import React from "react"

export default function CustomProgressBar({ max, amount }) {
  const width = 150
  const progress = (amount / max) * 100
  const progressWidth = (progress / 100) * width

  console.log(progress)

  return (
    <div
      className="progress-bar"
      style={{
        width: `${width}px`,
        float: "right",
        padding: "5px",
        borderRadius: "25px",
        paddingRight: "160px",
      }}
    >
      <div
        className="progress"
        style={{
          width: `${progressWidth}px`,
          borderRadius: "25px",
          backgroundColor: `${progressWidth < 75 ? "#d92c2f" : "#0f6350"}`,
        }}
      ></div>
    </div>
  )
}
