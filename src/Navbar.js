import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        HOME
      </Link>
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/linegraph">Finance</CustomLink>
        <CustomLink to="/drag_and_drop">Dropzone</CustomLink>
        <CustomLink to="/calander">Calander</CustomLink>
        <CustomLink to="/budgets">Budgets</CustomLink>
        <CustomLink to="/expense_tracker">ExpenseTracker</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
