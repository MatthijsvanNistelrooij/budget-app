// @ts-nocheck
import React from "react"
import { useState } from "react"
import { Container, Stack, Button, Row } from "react-bootstrap"
import BudgetCard from "../components/BudgetCard"
import AddBudgetModal from "../components/AddBudgetModal"
import AddExpenseModal from "../components/AddExpenseModal"
import UncategorizedBudgetCard from "../components/UncategorizedBudgetCard"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import TotalBudgetCard from "../components/TotalBudgetCard"
import ViewExpensesModal from "../components/ViewExpensesModal"

export default function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <TotalBudgetCard />
      <Stack direction="horizontal" gap="2" className="mb-5 mt-5">
        <h1 className="me-auto" style={{ color: "lightgray", textTransform: 'uppercase' }}>
          Budgets
        </h1>

        <Button variant="light" onClick={() => setShowAddBudgetModal(true)}>
          Add Budget
        </Button>
        <Button
          variant="outline-light"
          onClick={() => openAddExpenseModal(true)}
        >
          Add Expense
        </Button>
      </Stack>

      {budgets.map((budget) => {
        const amount = getBudgetExpenses(budget.id).reduce(
          (total, expense) => total + expense.amount,
          0
        )
        return (
          <>
            <Row className="p-0 pb-1">
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                gray
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpensesClick={() =>
                  setViewExpensesModalBudgetId(budget.id)
                }
              />
            </Row>
            <hr />
          </>
        )
      })}
      <Row className="mt-5">
        <UncategorizedBudgetCard
          onAddExpenseClick={openAddExpenseModal}
          onViewExpensesClick={() =>
            setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
      </Row>

      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
        openExpenseModal={() => setAddExpenseModalBudgetId(true)}
      />
    </>
  )
}
