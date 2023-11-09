import React from "react"
import {
  FaSmoking,
  FaCanadianMapleLeaf,
  FaShoppingCart,
  FaPiggyBank,
  FaTree,
  FaShoppingBasket,
  FaHamburger,
  FaTshirt,
} from "react-icons/fa"

const IconSection = ({ expense }) => {
  return (
    <span className="expense-icon-style">
      {expense.label === "MED" && (
        <FaCanadianMapleLeaf
          style={{
            marginLeft: "10px",
            color: "#309f4c ",
            marginBottom: "4px",
          }}
        />
      )}
      {expense.label === "AH" && (
        <FaShoppingCart
          style={{
            marginLeft: "10px",
            color: "#30839f",
            marginBottom: "4px",
          }}
        />
      )}
      {expense.label === "CLOTHING" && (
        <FaTshirt
          style={{
            marginLeft: "10px",
            color: "#00cccc",
            marginBottom: "4px",
          }}
        />
      )}
      {expense.label === "FOOD" && (
        <FaHamburger
          style={{
            marginLeft: "10px",
            color: "#66cc00",
            marginBottom: "4px",
          }}
        />
      )}
      {expense.label === "Spaardoel" && (
        <FaPiggyBank
          style={{
            marginLeft: "10px",
            color: "#c66544",
            marginBottom: "4px",
          }}
        />
      )}
      {expense.label === "SPAR" && (
        <FaTree
          style={{
            marginLeft: "10px",
            color: "darkgreen",
            fontSize: "15px",
            marginBottom: "4px",
          }}
        />
      )}
      {expense.label === "OTHER" && (
        <FaShoppingBasket
          style={{
            marginLeft: "10px",
            color: "#cccc00",
            marginBottom: "4px",
          }}
        />
      )}
      {["8.50", "8.5", "8,5", "8,50"].includes(expense.value) && (
        <FaSmoking
          style={{
            marginLeft: "10px",
            color: "#9f4c30",
            marginBottom: "4px",
          }}
        />
      )}
    </span>
  )
}

export default IconSection
