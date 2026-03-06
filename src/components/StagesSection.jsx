import React, { useEffect, useRef } from 'react'
import './StagesSection.css'

const stages = [
  { icon: '\u{1F50D}', num: 'Шаг 01', title: 'Анализ', text: 'Изучаем ваш бизнес, процессы и потребности для точного определения задач AI. Формируем техническое задание и roadmap.' },
  { icon: '\u{1F9E9}', num: 'Шаг 02', title: 'Прототип', text: 'Создаём рабочую версию решения для быстрой проверки концепции. Вы видите результат уже через 1\u20132 недели.' },
  { icon: '\u2699\uFE0F', num: 'Шаг 03', title: 'Разработка', text: 'Реализуем полную версию решения с интеграцией в ваши системы. Тестируем на реальных данных, итерируем.' },
  { icon: '\u{1F680}', num: 'Шаг 04', title: 'Запуск', text: 'Внедряем решение, обучаем сотрудников и обеспечиваем поддержку. Контролируем метрики первые 30 дней.' },
]

function StagesSection() {
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

    const els = ref.current?.querySelectorAll('.stage-item')
    els?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity .5s ease, transform .5s ease'
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div id="stages" className="stages-section">
      <section ref={ref}>
        <div className="sec-header">
          <h2 className="sec-h2">Этапы внедрения</h2>
          <p className="sec-sub">Прозрачный процесс от первой встречи до запуска в продакшн</p>
        </div>
        <div className="stages-track">
          {stages.map((s, i) => (
            <div className="stage-item" key={i}>
              <div className="stage-dot">{s.icon}</div>
              <div className="stage-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default StagesSection
