import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <Link to="/" className="footer-logo">Zevs.ai</Link>
        <div className="footer-links">
          <a href="/#need">Зачем нужен AI</a>
          <a href="/#products">Продукты</a>
          <a href="/#cases">Кейсы</a>
          <a href="/#pricing">Тарифы</a>
          <Link to="/news">Новости</Link>
          <a href="/#contact">Контакты</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
        <div className="footer-copy">&copy; 2026 &middot; Все права защищены</div>
      </div>
    </footer>
  )
}

export default Footer
