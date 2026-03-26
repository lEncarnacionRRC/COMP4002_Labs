import { useState, useEffect, useRef } from "react"
import { NavLink } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement | null>(null)
  const hamburgerRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => setIsOpen(prev => !prev)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li><NavLink to="/employees">Employees</NavLink></li>
          <li><NavLink to="/organization">Leadership & Management</NavLink></li>
        </ul>

        <div className="navbar-hamburger" onClick={toggleMenu} ref={hamburgerRef}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-mobile-menu ${isOpen ? "active" : ""}`} ref={menuRef}>
          <li><NavLink to="/employees" onClick={closeMenu}>Employees</NavLink></li>
          <li><NavLink to="/organization" onClick={closeMenu}>Organization</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar