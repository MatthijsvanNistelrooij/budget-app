import React, { useState, useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import IconSection from "../sections/icon-section"

import { FaTimes, FaCheck, FaChevronUp, FaChevronDown } from "react-icons/fa"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const ExpenseTracker = () => {
  const [myExpenses, setMyExpenses] = useState([])
  const [date, setDate] = useState("")
  const [value, setValue] = useState("")
  const [label, setLabel] = useState("")
  const [graphFilter, setGraphFilter] = useState("")
  const [addItem, setAddItem] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const [addedOptions, setAddedOptions] = useState(() => {
    const storedOptions = localStorage.getItem("addedOptions")
    return storedOptions ? JSON.parse(storedOptions) : []
  })

  const { budgets, getBudgetExpenses } = useBudgets()

  const handleGraphFilterChange = (e) => {
    const selectedOption = e.target.value
    setGraphFilter(selectedOption)
  }

  const budgetTotal = budgets.map((budget) => {
    const amount = getBudgetExpenses(budget.id).reduce(
      (total, expense) => total + expense.amount,
      0
    )
    if (budget.name === "SPENDING") {
      return (
        <p className="budget-expenses">
          Budget:&nbsp;
          {currencyFormatter.format(amount)}
        </p>
      )
    } else {
      return null
    }
  })

  useEffect(() => {
    const storedExpenses = localStorage.getItem("myExpenses")
    if (storedExpenses) {
      setMyExpenses(JSON.parse(storedExpenses))
    }
  }, [])

  const chartData = Object.values(
    myExpenses.reduce((acc, expense) => {
      const { date, value, label } = expense
      if (graphFilter === "" || label === graphFilter) {
        if (acc[date]) {
          acc[date].value += parseFloat(value)
        } else {
          acc[date] = {
            date,
            value: parseFloat(value),
            label,
          }
        }
      }
      return acc
    }, {})
  )

  const yDomain = [0, parseInt(100)]

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const handleValueChange = (e) => {
    setValue(e.target.value)
  }

  const handleLabelChange = (e) => {
    const selectedLabel = e.target.value
    setLabel(selectedLabel)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newExpense = { date, value, label }
    const updatedExpenses = [...myExpenses, newExpense]
    setMyExpenses(updatedExpenses)
    setDate("")
    setValue("")
    setLabel("")
    localStorage.setItem("myExpenses", JSON.stringify(updatedExpenses))
  }

  const handleDelete = (date, index) => {
    const updatedExpenses = [...myExpenses]
    const expensesToDelete = updatedExpenses.filter(
      (expense) => expense.date === date
    )
    if (expensesToDelete.length > index) {
      updatedExpenses.splice(
        updatedExpenses.indexOf(expensesToDelete[index]),
        1
      )
      setMyExpenses(updatedExpenses)
      localStorage.setItem("myExpenses", JSON.stringify(updatedExpenses))
    }
  }

  const renderTooltipContent = (tooltipProps) => {
    const { payload } = tooltipProps
    if (!payload || payload.length === 0) return null

    const { value, date } = payload[0].payload

    return (
      <div className="expense-tooltip">
        <p>{date}</p>
        <p>Total: € {value.toFixed("2")}</p>
      </div>
    )
  }

  const totalExpenses = myExpenses.reduce(
    (total, expense) => total + parseInt(expense.value),
    0
  )

  const groupedExpenses = myExpenses.reduce((groups, expense) => {
    const { date } = expense
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(expense)
    return groups
  }, {})

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    setIsAdded(false)
  }

  const handleAddOption = () => {
    if (inputValue.trim() !== "") {
      setAddedOptions((prevOptions) => [...prevOptions, inputValue.trim()])
      setInputValue("")
      setIsAdded(true)
    }
  }

  useEffect(() => {
    localStorage.setItem("addedOptions", JSON.stringify(addedOptions))
  }, [addedOptions])

  const expenseOption = [
    "AH",
    "MED",
    "SPAR",
    "FOOD",
    "OTHER",
    "CLOTHING",
    "SPAARDOEL",
    ...addedOptions,
  ]

  const handleToggleAddItem = () => {
    setAddItem((prevAddItem) => !prevAddItem)
  }

  return (
    <div>
      <div className="d-flex justify-content-end">
        <h1>{budgetTotal}</h1>
      </div>

      <div className="d-flex justify-content-between">
        <h2>
          Expense Tracker
          {addItem ? (
            <FaChevronUp
              style={{
                color: "gray",
                fontSize: "12px",
                marginLeft: "50px",
                cursor: "pointer",
              }}
              onClick={handleToggleAddItem}
            />
          ) : (
            <FaChevronDown
              style={{
                color: "gray",
                fontSize: "12px",
                marginLeft: "50px",
                cursor: "pointer",
              }}
              onClick={handleToggleAddItem}
            />
          )}
        </h2>
        <h3>Expenses: € {totalExpenses.toFixed("2")}</h3>
      </div>

      {addItem && (
        <Row>
          <Col className="col-3">
            <input
              style={{
                backgroundColor: "#061121",
                border: "5px solid  #0d1d2d",
                borderRadius: "10px 10px 10px 10px",
                color: "white",
              }}
              className="form-control"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Add label"
            />
          </Col>
          <Col className="col-9">
            <button
              className="btn btn-secondary"
              style={{
                backgroundColor: "#0d1d2d",
                border: "5px solid #0d1d2d",
                borderRadius: "0 10px 10px 0",
                marginLeft: "-90px",
                marginRight: "15px",
              }}
              onClick={handleAddOption}
            >
              Add{" "}
              {isAdded && (
                <FaCheck
                  style={{
                    color: "green",
                    marginLeft: "8px",
                    marginTop: "-5px",
                  }}
                />
              )}
            </button>
          </Col>
        </Row>
      )}
      <div className="expense-input mt-2">
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <div className="form-group">
                <select
                  style={{
                    backgroundColor: "#061121",
                    border: "1px solid #061121",
                    color: "gray",
                  }}
                  className="form-control"
                  id="label"
                  value={label}
                  onChange={handleLabelChange}
                  required
                >
                  <option value="" disabled selected>
                    Label{" "}
                  </option>
                  {expenseOption.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <input
                  style={{
                    backgroundColor: "#061121",
                    border: "1px solid  #061121",
                    color: "white",
                  }}
                  type="number"
                  className="form-control"
                  id="value"
                  value={value}
                  onChange={handleValueChange}
                  required
                  placeholder="Amount"
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <input
                  style={{
                    backgroundColor: "#061121",
                    border: "1px solid  #061121",
                    color: "gray",
                  }}
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={handleDateChange}
                  required
                />
              </div>
            </Col>
            <Col className="col-1">
              <button
                type="submit"
                className="btn btn-secondary"
                style={{ backgroundColor: "#0d1d2d", border: "none" }}
              >
                Add
              </button>
            </Col>
          </Row>
        </form>
      </div>

      <div className="expense-graph mt-2">
        <LineChart width={1000} height={400} data={chartData}>
          <XAxis dataKey={chartData.date} />
          <YAxis domain={yDomain} />
          <CartesianGrid strokeDasharray="1 5" />
          <Tooltip content={renderTooltipContent} />
          <Line type="linear" dataKey="value" stroke="#19b29f" />
        </LineChart>

        <form>
          <div className="graph-select mt-2" style={{ float: "right" }}>
            <div className="form-group">
              <select
                style={{
                  backgroundColor: "#061121",
                  border: "1px solid #061121",
                  color: "gray",
                }}
                className="form-control"
                id="label"
                value={graphFilter || "Select Filter"}
                onChange={handleGraphFilterChange}
                required
              >
                <option value="" selected>
                  ALL
                </option>
                {expenseOption.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>

      <div className="p-2 mt-5"></div>
      <Row>
        {Object.keys(groupedExpenses).map((date) => (
          <Col key={date} className="col-4">
            <h5 className="date_h5">{date}</h5>
            <ul>
              {groupedExpenses[date].map((expense, index) => (
                <li className="expense-list-item" key={index}>
                  <span className="expense-item-span"> {expense.label}</span>€{" "}
                  <span className="expense-value-span">
                    {parseFloat(expense.value).toFixed(2)}
                  </span>
                  <IconSection expense={expense} />
                  <FaTimes
                    className="delete_icon"
                    onClick={() => handleDelete(expense.date, index)}
                  />
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default ExpenseTracker
