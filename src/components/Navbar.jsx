import React from 'react'
import './Navbar.css'

function Navbar({ onOpenPopup }) {
  const handleClick = (e) => {
    e.preventDefault()
    onOpenPopup()
  }

  return (
    <nav>
      <div className="nav-logo">Zevs.ai</div>
      <div className="nav-links">
        <a href="#need">Зачем нужен</a>
        <a href="#products">Продукты</a>
        <a href="#cases">Кейсы</a>
        <a href="#pricing">Тарифы</a>
        <a href="#stages">Этапы</a>
        <a href="#" className="nav-cta" onClick={handleClick}>Обсудить проект →</a>
      </div>
    </nav>
  )
}

export default Navbar
