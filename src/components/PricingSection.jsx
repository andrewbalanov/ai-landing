import React, { useEffect, useRef } from 'react'
import './PricingSection.css'

const plans = [
  {
    num: '01 / Тариф',
    name: 'Lite',
    sub: 'Для небольших компаний\nдо 5 пользователей',
    price: 'По запросу',
    note: 'Фиксированная стоимость проекта',
    features: [
      '1 AI-агент под ваши задачи',
      'Интеграция с 1 CRM или мессенджером',
      'Настройка за 2 недели',
      'Обучение команды (1 сессия)',
      'Поддержка 1 месяц',
    ],
    btnClass: 'plan-btn-dark',
    btnText: 'Оставить заявку →',
  },
  {
    num: '02 / Тариф',
    name: 'Standard',
    sub: 'От 5 пользователей\nдля растущих команд',
    price: 'По запросу',
    note: 'Проект + ежемесячная поддержка',
    features: [
      'До 3 AI-агентов',
      'Интеграции с CRM, 1С, мессенджерами',
      'Кастомизация под ваши процессы',
      'Обучение команды (3 сессии)',
      'Поддержка 3 месяца',
      'Аналитика и дашборд',
    ],
    btnClass: 'plan-btn-accent',
    btnText: 'Оставить заявку →',
    badge: 'Рекомендуем',
  },
  {
    num: '03 / Тариф',
    name: 'Enterprise',
    sub: 'От 20 пользователей\nдля крупных застройщиков',
    price: 'Индивидуально',
    note: 'Полная разработка под ваш бизнес',
    features: [
      'Неограниченное число агентов',
      'Полная интеграция с ИТ-ландшафтом',
      'Dedicated команда разработки',
      'SLA и приоритетная поддержка',
      'On-premise деплой при необходимости',
      'Обучение и сертификация сотрудников',
    ],
    btnClass: 'plan-btn-dark',
    btnText: 'Обсудить →',
  },
]

function PricingSection({ onOpenPopup }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1'
          e.target.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.08 })

    const els = ref.current?.querySelectorAll('.plan-card')
    els?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity .5s ease, transform .5s ease'
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleClick = (e) => {
    e.stopPropagation()
    onOpenPopup()
  }

  return (
    <section id="pricing" className="pricing-section" ref={ref}>
      <div className="sec-header">
        <h2 className="sec-h2">Выбирайте удобную модель работы</h2>
        <p className="sec-sub">Три варианта под любой масштаб бизнеса — от небольших девелоперов до крупных холдингов</p>
      </div>
      <div className="pricing-grid">
        {plans.map((p, i) => (
          <div className="plan-card" key={i}>
            {p.badge && <div className="plan-badge">{p.badge}</div>}
            <div className="plan-content">
              <div>
                <div className="plan-name">{p.num}</div>
                <h3>{p.name}</h3>
                <p className="plan-sub">{p.sub.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}</p>
                <div className="plan-price">{p.price}</div>
                <div className="plan-price-note">{p.note}</div>
                <hr className="plan-divider" />
                <ul className="plan-features">
                  {p.features.map((f, j) => (
                    <li key={j}><span className="check">&#10003;</span> {f}</li>
                  ))}
                </ul>
              </div>
              <button className={`plan-btn ${p.btnClass}`} type="button" onClick={handleClick}>{p.btnText}</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PricingSection
