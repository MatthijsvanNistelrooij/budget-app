import { Form, Modal, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"
import React from "react"

export default function AddBudgetModal({ show, handleClose }) {
  const nameRef = useRef()
  const maxRef = useRef()
  const { addBudget } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()
    addBudget({
      // @ts-ignore
      name: nameRef.current?.value,
      // @ts-ignore
      max: parseFloat(maxRef.current?.value),
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
          <Modal.Title style={{ color: "#061121" }}>Add Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#061121", backgroundColor: "#E9EFF3" }}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="spending">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            ></Form.Control>
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
