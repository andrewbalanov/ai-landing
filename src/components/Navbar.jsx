import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ onOpenPopup }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  const handleCtaClick = (e) => {
    e.preventDefault()
    setMenuOpen(false)
    onOpenPopup()
  }

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  const sectionLink = (hash, label) => {
    if (isLanding) {
      return <a href={`#${hash}`} onClick={handleLinkClick}>{label}</a>
    }
    return <Link to={`/#${hash}`} onClick={handleLinkClick}>{label}</Link>
  }

  return (
    <nav>
      <Link to="/" className="nav-logo" onClick={handleLinkClick}>Zevs.ai</Link>
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
        {sectionLink('need', 'Зачем нужен')}
        {sectionLink('products', 'Продукты')}
        {sectionLink('cases', 'Кейсы')}
        {sectionLink('pricing', 'Тарифы')}
        {sectionLink('stages', 'Этапы')}
        <Link to="/news" className={location.pathname.startsWith('/news') ? 'nav-link-active' : ''} onClick={handleLinkClick}>Новости</Link>
        <a href="#" className="nav-cta" onClick={handleCtaClick}>Обсудить проект →</a>
      </div>
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  )
}

export default Navbar
