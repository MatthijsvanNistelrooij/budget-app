import React, { useState, useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import { Row, Col } from "react-bootstrap"

const Dropzone = () => {
  const [draggingItem, setDraggingItem] = useState(null)
  const [list, setList] = useState(() => {
    const storedItems = localStorage.getItem("dropzoneItems")
    return storedItems ? JSON.parse(storedItems) : []
  })
  const [newItemText, setNewItemText] = useState("")
  const [dropdownValue, setDropdownValue] = useState("")
  const [dropdownColor, setDropdownColor] = useState("")

  useEffect(() => {
    localStorage.setItem("dropzoneItems", JSON.stringify(list))
  }, [list])

  const handleDragStart = (event, item) => {
    setDraggingItem(item)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDrop = (event, dropIndex) => {
    event.preventDefault()

    const draggedItemIndex = list.findIndex(
      (item) => item.id === draggingItem.id
    )
    const updatedList = [...list]
    updatedList.splice(draggedItemIndex, 1)
    updatedList.splice(dropIndex, 0, draggingItem)

    setList(updatedList)
    setDraggingItem(null)
  }

  const handleInputChange = (event) => {
    setNewItemText(event.target.value)
  }

  const handleDropdownChange = (event) => {
    const selectedOption = event.target.value
    setDropdownValue(selectedOption)

    const selectedColor = dropdownOptions.find(
      (option) => option.value === selectedOption
    )?.color
    setDropdownColor(selectedColor || "")
  }

  const handleAddItem = () => {
    if (newItemText.trim() !== "" && dropdownValue !== "") {
      const newItem = {
        id: Date.now(),
        text: newItemText,
        value: dropdownValue,
        color: dropdownColor,
      }

      setList([...list, newItem])
      setNewItemText("")
      setDropdownValue("")
      setDropdownColor("")
    }
  }

  const handleDeleteItem = (itemId) => {
    const updatedList = list.filter((item) => item.id !== itemId)
    setList(updatedList)
  }

  const dropdownOptions = [
    { label: "CHORE", value: "CHORE", color: "#245746" },
    { label: "PEOPLE", value: "PEOPLE", color: "#243e57" },
    { label: "CARE", value: "CARE", color: "#58570c" },
  ]

  return (
    <>
      <h2 className="mt-2 mb-4">Dropzone</h2>
      <div className="input-group mb-3 mt-5">
        <input
          style={{
            backgroundColor: "transparent",
            border: "5px solid #0d1d2d",
            color: "white",
          }}
          type="text"
          className="form-control"
          value={newItemText}
          onChange={handleInputChange}
          placeholder="Enter item text"
        />
        <select
          style={{
            backgroundColor: "#061121",
            border: "5px solid #0d1d2d",
            color: "gray",
          }}
          className="form-select"
          value={dropdownValue}
          onChange={handleDropdownChange}
        >
          <option value="">Select a label</option>
          {dropdownOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          className="btn btn-secondary"
          onClick={handleAddItem}
          style={{ backgroundColor: "#0d1d2d", border: "none" }}
        >
          Add Item
        </button>
      </div>
      {list.length > 0 ? (
        <div className="dropzone mt-1">
          {list.map((item, index) => (
            <div
              className={`draggable${
                draggingItem && draggingItem.id === item.id
                  ? " drag-transition"
                  : ""
              }`}
              key={item.id}
              draggable
              onDragStart={(event) => handleDragStart(event, item)}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, index)}
              onDragEnter={(event) => event.preventDefault()}
              style={{
                backgroundColor: item.color,
                transition: "transform 0.3s ease-in-out",
                transform:
                  draggingItem && draggingItem.id === item.id
                    ? "translate(10px, 10px)"
                    : "none",
              }}
            >
              <Row>
                <Col className="col-1">
                  <p className="small_span">{item.value}</p>
                </Col>
                <Col>
                  <b>{item.text.toUpperCase()} </b>
                </Col>
                <Col className="col-1">
                  <FaTimes
                    onClick={() => handleDeleteItem(item.id)}
                    className="delete_icon"
                  />
                </Col>
              </Row>
            </div>
          ))}
        </div>
      ) : (
        <div className="dropzone mt-1">
          <h5 style={{ color: "#fff", fontSize: "12px" }}>
            Add items to get started...
          </h5>
        </div>
      )}
    </>
  )
}

export default Dropzone
