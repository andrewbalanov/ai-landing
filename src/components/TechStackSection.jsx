import React from 'react'
import './TechStackSection.css'

const items = [
  { icon: '\u{1F916}', title: 'LLM-модели', text: 'ChatGPT, DeepSeek, Claude и другие' },
  { icon: '\u2699\uFE0F', title: 'Автоматизация', text: 'Платформа n8n' },
  { icon: '\u{1F4BB}', title: 'Разработка', text: 'JavaScript/React, Python/PHP' },
  { icon: '\u{1F5C4}\uFE0F', title: 'База данных', text: 'MySQL/PostgreSQL' },
]

function TechStackSection() {
  return (
    <section id="tech-stack" className="tech-section">
      <div className="sec-header">
        <h2 className="sec-h2">Стек используемых технологий</h2>
        <p className="sec-sub">Определим стек технологий конкретно под ваши задачи и инфраструктуру</p>
      </div>
      <div className="tech-stack-grid">
        {items.map((item, i) => (
          <div className="tech-item" key={i}>
            <span className="tech-icon">{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TechStackSection
