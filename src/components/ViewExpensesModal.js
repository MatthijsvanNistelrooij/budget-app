import { Modal, Button, Stack, Container } from "react-bootstrap"
import { useState } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import AddExpenseModal from "../components/AddExpenseModal"

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const [showAddExpenseModal, setShowExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets()

  const expenses = getBudgetExpenses(budgetId)

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? {
          name: "Uncategorized",
          id: UNCATEGORIZED_BUDGET_ID,
        }
      : budgets.find((b) => b.id === budgetId)

  return (
    <>
      <Modal
        centered
        show={budgetId != null}
        onHide={handleClose}
        style={{
          color: "#061121",
          backgroundColor: "#061121",
          border: "none",
        }}
      >
        <Modal.Body
          style={{ color: "white", backgroundColor: "#061121", border: "none" }}
        >
          <Stack direction="horizontal" gap="5" className="mb-3">
            <span style={{ width: "80%", fontSize: "2.5rem" }}>
              {budget?.name}
            </span>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                style={{ float: "right" }}
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget)
                  handleClose()
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
          <br />
          <Stack direction="vertical" gap="3">
            {expenses.map((expense) => (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-6">{expense.description}</div>
                <div className="me-auto fs-6">
                  {currencyFormatter.format(expense.amount)}
                </div>
                <Button
                  onClick={() => deleteExpense(expense)}
                  size="sm"
                  variant="outline-danger"
                >
                  &times;
                </Button>
              </Stack>
            ))}
          </Stack>
        </Modal.Body>
      </Modal>
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowExpenseModal(false)}
      />
    </>
  )
}
