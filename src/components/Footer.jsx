import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo">Zevs.ai</div>
        <div className="footer-links">
          <a href="#need">Зачем нужен AI</a>
          <a href="#products">Продукты</a>
          <a href="#cases">Кейсы</a>
          <a href="#pricing">Тарифы</a>
          <a href="#contact">Контакты</a>
          <a href="#">Политика конфиденциальности</a>
        </div>
        <div className="footer-copy">&copy; 2026 &middot; Все права защищены</div>
      </div>
    </footer>
  )
}

export default Footer
