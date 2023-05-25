import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../contexts/BudgetsContext"

export default function AddExpenseModal({
  show,
  handleClose,
  defaultBudgetId,
}) {
  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()

  const { addExpense, budgets } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addExpense({
      description: descriptionRef?.current.value,
      amount: parseFloat(amountRef?.current.value),
      budgetId: budgetIdRef.current?.value,
    })
    handleClose()
  }

  return (
    <Modal
      centered
      show={show}
      onHide={handleClose}
      style={{
        color: "#061121",
        backgroundColor: "#061121",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Header
          closeButton
          style={{
            color: "#061121",
            backgroundColor: "#E9EFF3",
            border: "none",
          }}
        >
          <Modal.Title style={{ color: "#061121" }}>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#061121", backgroundColor: "#E9EFF3" }}>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              ref={descriptionRef}
              type="text"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              required
              min={0}
              step={0.01}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="budgetId">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#E9EFF3", border: "none" }}>
          <Button
            className="mb-3"
            variant="outline-secondary"
            style={{ color: "#061121", float: "right" }}
            type="submit"
          >
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
