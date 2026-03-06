import React from 'react'
import './HeroSection.css'

function HeroSection() {
  return (
    <div className="hero-wrap">
      <div className="hero-shapes">
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
        <div className="hero-shape"></div>
      </div>
      <div className="hero-inner">
        <h1 className="hero-h1">
          Разработка и внедрение<br />
          <span className="accent">искусственного интеллекта</span><br />
          для застройщиков
        </h1>

        <p className="hero-sub">
          Снижайте издержки, увеличивайте конверсии и выручку с AI агентами. Поможем определить подходящий вид автоматизации и обучим вашу команду
        </p>

        <div className="hero-cta-row">
          <a href="#contact" className="btn-primary">Обсудить проект →</a>
          <a href="#cases" className="btn-outline">Посмотреть кейсы</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="num">10<span>+</span></div>
            <div className="label">лет в PropTech</div>
          </div>
          <div className="hero-stat">
            <div className="num orange-num"><span>#</span>1</div>
            <div className="label">отраслевые AI агенты</div>
          </div>
          <div className="hero-stat">
            <div className="num">40<span>%</span></div>
            <div className="label">среднее снижение операционных расходов</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
