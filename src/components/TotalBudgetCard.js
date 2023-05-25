import React from "react"
import BudgetCard from "./BudgetCard"
import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import { Col, Row } from "react-bootstrap"

export default function TotalBudgetCard() {
  const { expenses, budgets } = useBudgets()
  const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const max = budgets.reduce((total, budget) => total + budget.max, 0)

  if (max === 0) return null

  return (
    <>
      <Row>
        <BudgetCard
          amount={amount}
          name="Totaal"
          gray
          max={max}
          hideButtons
          onAddExpenseClick={undefined}
          onViewExpensesClick={undefined}
        />
      </Row>
    </>
  )
}
