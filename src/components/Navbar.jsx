import React, { useState } from 'react'
import './Navbar.css'

function Navbar({ onOpenPopup }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleCtaClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    onOpenPopup()
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav>
      <div className="nav-logo">Zevs.ai</div>
      <button
        className={`nav-burger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        type="button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`nav-links${menuOpen ? ' nav-links--open' : ''}`}>
        <a href="#need" onClick={handleLinkClick}>Зачем нужен</a>
        <a href="#products" onClick={handleLinkClick}>Продукты</a>
        <a href="#cases" onClick={handleLinkClick}>Кейсы</a>
        <a href="#pricing" onClick={handleLinkClick}>Тарифы</a>
        <a href="#stages" onClick={handleLinkClick}>Этапы</a>
        <a href="#" className="nav-cta" onClick={handleCtaClick}>Обсудить проект →</a>
      </div>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  )
}

export default Navbar
