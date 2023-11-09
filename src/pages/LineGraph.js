import { Container, Button } from "react-bootstrap"
import React, { useState } from "react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

const data = [
  // 2021
  { index: 0, month: "Jan", value: 960 },
  { index: 1, month: "Feb", value: 960 },
  { index: 2, month: "Mar", value: 960 },
  { index: 3, month: "Apr", value: 960 },
  { index: 4, month: "May", value: 960 },
  { index: 5, month: "Jun", value: 960 },
  { index: 6, month: "Jul", value: 960 },
  { index: 7, month: "Aug", value: 960 },
  { index: 8, month: "Sep", value: 960 },
  { index: 9, month: "Oct", value: 960 },
  { index: 10, month: "Nov", value: 960 },
  { index: 11, month: "Dec", value: 1739 },
  // 2022
  { index: 12, month: "Jan", value: 1759 },
  { index: 13, month: "Feb", value: 1759 },
  { index: 14, month: "Mar", value: 2002 },
  { index: 15, month: "Apr", value: 2002 },
  { index: 16, month: "May", value: 2002 },
  { index: 17, month: "Jun", value: 2002 },
  { index: 18, month: "Jul", value: 2002 },
  { index: 19, month: "Aug", value: 2002 },
  { index: 20, month: "Sep", value: 2002 },
  { index: 21, month: "Oct", value: 2002 },
  { index: 22, month: "Nov", value: 2092 },
  { index: 23, month: "Dec", value: 2092 },
  // 2023
  { index: 24, month: "Jan", value: 2180 },
  { index: 25, month: "Feb", value: 2183 },
  { index: 26, month: "Mar", value: 2183 },
  { index: 27, month: "Apr", value: 2183 },
  { index: 28, month: "May", value: 2183 },
  { index: 29, month: "Jun", value: 2183 },
  { index: 30, month: "Jul", value: 2275 },
  { index: 31, month: "Aug", value: 2275 },
  { index: 32, month: "Sep", value: 2275 },
  { index: 33, month: "Oct", value: 2275 },
  { index: 34, month: "Nov", value: 2275 },
  { index: 35, month: "Dec", value: 2275 },
  // 2024
]

export default function LineGraph() {
  const maxYValue = Math.max(...data.map((item) => item.value))
  const minYValue = Math.min(...data.map((item) => item.value))

  const [previous, setPrevious] = useState(true)

  // Adjusting the y-axis domain to create the desired effect
  const yDomain = [minYValue - 160, maxYValue + 200]

  const getTotal = (startIndex, endIndex) => {
    const total = data
      .slice(startIndex, endIndex + 1)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue.value
      }, 0)

    return total
  }

  const handleToggle = () => {
    setPrevious(!previous)
  }

  const total2021 = getTotal(0, 11).toFixed("2")
  const total2022 = getTotal(12, 23).toFixed("2")
  const total2023 = getTotal(24, 35).toFixed("2")

  return (
    <>
      <Container className="p-4">
        <div className="d-flex justify-content-between mb-5">
          <h1 className="m-0">Finance</h1>
          <Button
            onClick={handleToggle}
            variant="light"
            style={{ float: "right", height: "35px", marginTop: "20px" }}
          >
            {previous ? "Previous" : "Current"}
          </Button>
        </div>
      </Container>
      <LineChart
        width={1100}
        height={400}
        data={
          previous
            ? data.filter((item) => item.index >= 11)
            : data.filter((item) => item.index >= 0)
        }
      >
        <XAxis dataKey="month" />
        <YAxis domain={yDomain} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#19b29f" />
      </LineChart>
      <Container>
        {!previous && (
          <p className="total">
            2021 <span className="totalSpan">TOTAAL</span> {total2021}
          </p>
        )}

        <p className="total">
          2022 <span className="totalSpan">TOTAAL</span> {total2022}
        </p>
        <p className="total">
          2023 <span className="totalSpan">TOTAAL</span> {total2023}
        </p>
      </Container>
    </>
  )
}
