import React from "react"
import { Col, Button } from "react-bootstrap"
import { currencyFormatter } from "../utils"
import CustomProgressBar from "./CustomProgressBar"

export default function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  hideButtons,
  onViewExpensesClick,
}) {
  const classNames = []
  if (amount > max) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <>
      <Col
        style={{
          color: "lightgray",
          border: "none",
          fontSize: "18px",
          marginTop: "5px",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {name}
      </Col>
      <Col
        className="col-2"
        style={{
          color: "white",
          border: "none",
          fontSize: "22px",
          marginTop: "1px",
          fontWeight: "bold",
          marginRight: "60px",
        }}
      >
        {currencyFormatter.format(amount)}
      </Col>
      {max && (
        <>
          <Col className="col-1">
            {(amount / max) * 100 < 50 ? (
              <span
                className="text ms-1"
                style={{
                  color: "#d92c2f",
                  fontSize: "11px",
                }}
              >
                {((amount / max).toFixed(2) * 100).toFixed(2)} %
              </span>
            ) : (
              <span
                className="text ms-1"
                style={{ color: "#19b29f", fontSize: "11px" }}
              >
                {((amount / max).toFixed(2) * 100).toFixed(2)} %
              </span>
            )}
          </Col>
          <Col>
            <span
              className="text ms-1"
              style={{ color: "gray", fontSize: "11px" }}
            >
              {currencyFormatter.format(max)}
            </span>
          </Col>
        </>
      )}
      {max && (
        <Col
          style={{
            width: "30%",
            border: "none",
            marginTop: "10px",
            float: "right",
          }}
        >
          <CustomProgressBar min={0} max={max} amount={amount} />
        </Col>
      )}

      {!hideButtons && (
        <>
          <Col style={{ width: "5%", border: "none" }}>
            <Button
              variant="outline-light"
              className="m-1 btn-sm"
              onClick={onAddExpenseClick}
              style={{ float: "right" }}
            >
              Add
            </Button>
            <Button
              className="m-1 btn-sm"
              style={{
                color: "white",
                border: "1px solid white",
                float: "right",
              }}
              onClick={onViewExpensesClick}
              variant="outline-secondary"
            >
              View
            </Button>
          </Col>
        </>
      )}
    </>
  )
}
