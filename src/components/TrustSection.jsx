import React, { useEffect, useRef } from 'react'
import './TrustSection.css'

const facts = [
  { icon: '\u{1F3E2}', text: 'Основатели Trace \u2013 интеграторы CRM-систем' },
  { icon: '\u{1F4CA}', text: 'Основатели EstateCRM \u2013 цифровой экосистемы для девелоперов' },
  { icon: '\u{1F5D3}\uFE0F', text: '10 лет опыта в PropTech и рынке недвижимости' },
  { icon: '\u{1F91D}', text: 'Партнеры крупнейших застройщиков России из ТОП-50' },
]

function TrustSection() {
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

    const els = ref.current?.querySelectorAll('.trust-fact')
    els?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity .5s ease, transform .5s ease'
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="trust" className="trust-section" ref={ref}>
      <div className="trust-wrap">
        <div className="trust-left">
          <h2>Нам можно доверять</h2>
          <p>Мы 10+ лет работаем в PropTech и создаем продукты, которыми пользуются десятки девелоперов в России и СНГ.</p>
          <p>Мы — основатели компаний <strong>Trace</strong> и <strong>EstateCRM</strong>: знаем изнутри, как устроен бизнес застройщика, и строим AI-решения с этим знанием.</p>
          <div className="trust-facts">
            {facts.map((f, i) => (
              <div className="trust-fact" key={i}>
                <span className="icon">{f.icon}</span>
                <span className="text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="trust-right">
          <h3>Наша миссия</h3>
          <p>Цифровизация рынка недвижимости — сделать работу застройщиков проще, эффективнее и прозрачнее с помощью современных AI-технологий.</p>
          <div className="trust-image">
            <img src="/trust-visual.svg" alt="AI-технологии Zevs.ai" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrustSection
