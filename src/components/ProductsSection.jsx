import React, { useEffect, useRef } from 'react'
import './ProductsSection.css'

const products = [
  {
    num: '01 → направление',
    icon: '\u{1F916}',
    title: 'AI-агенты',
    text: 'Автономные агенты, которые выполняют задачи без участия человека: квалифицируют лиды, запускают процессы, отвечают на запросы, контролируют выполнение поручений внутри команды.',
    tags: ['Голосовые звонки', 'Чат-боты', 'Email-агенты', 'CRM-агенты'],
  },
  {
    num: '02 → направление',
    icon: '\u{1F4AC}',
    title: 'Виртуальные ассистенты',
    text: 'Умные помощники для сотрудников и клиентов: отвечают на вопросы по базе знаний, помогают подобрать квартиру, готовят коммерческие предложения и сопровождают сделку от первого касания до ключей.',
    tags: ['База знаний', 'Подбор квартир', 'HR-ассистент', 'Юридические FAQ'],
  },
  {
    num: '03 → направление',
    icon: '\u2699\uFE0F',
    title: 'Автоматизация процессов',
    text: 'Замена ручного труда в повторяющихся операциях: формирование документов, обработка заявок, уведомления подрядчиков, сбор отчётности. Интегрируем с 1С, amoCRM, Битрикс и любыми API.',
    tags: ['1С интеграция', 'amoCRM', 'Документы', 'n8n / Make'],
  },
]

function ProductsSection() {
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

    const els = ref.current?.querySelectorAll('.product-card')
    els?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity .5s ease, transform .5s ease'
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" className="products-section" ref={ref}>
      <div className="sec-header">
        <h2 className="sec-h2">Внедрим готовое или разработаем<br />под ваши задачи бизнеса</h2>
        <p className="sec-sub">Три направления — от коробочных решений до кастомных систем<br />под ваши процессы</p>
      </div>
      <div className="products-grid">
        {products.map((p, i) => (
          <div className="product-card" key={i}>
            <div className="p-num">{p.num}</div>
            <span className="p-icon">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="p-tags">
              {p.tags.map((t, j) => <span className="p-tag" key={j}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductsSection
