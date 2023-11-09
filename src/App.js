import React from "react"
import Navbar from "./Navbar"
import LineGraph from "./pages/LineGraph"
import Home from "./pages/Home"
import Budgets from "./pages/Budgets"
import CalanderPage from "./pages/CalanderPage"
import Dropzone from "./pages/Dropzone"
import { Route, Routes } from "react-router-dom"
import ExpenseTracker from "./pages/ExpenseTracker"

export default function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/linegraph" element={<LineGraph />} />
          <Route path="/calander" element={<CalanderPage />} />
          <Route path="/drag_and_drop" element={<Dropzone />} />
          <Route path="/expense_tracker" element={<ExpenseTracker />} />
        </Routes>
      </div>
    </>
  )
}
