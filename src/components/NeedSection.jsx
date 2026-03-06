import React, { useEffect, useRef } from 'react'
import './NeedSection.css'

const cards = [
  {
    num: '01 / ситуация',
    icon: '\u{1F4DE}',
    title: 'Менеджеры тонут в звонках и теряют лиды',
    text: 'Отдел продаж не справляется с потоком обращений: клиенты ждут ответа часами, горячие лиды остывают, а менеджеры вместо продаж занимаются рутинной квалификацией. AI-агент отвечает мгновенно 24/7 и передаёт только готовых покупателей.',
  },
  {
    num: '02 / ситуация',
    icon: '\u{1F4CB}',
    title: 'Документооборот замедляет стройку и согласования',
    text: 'Инженеры тратят дни на подготовку и согласование актов, смет, журналов. Один пропущенный документ — штраф или задержка сдачи. AI автоматически формирует, проверяет и маршрутизирует документы без участия человека.',
  },
  {
    num: '03 / ситуация',
    icon: '\u{1F4C9}',
    title: 'Нет аналитики: решения принимаются вслепую',
    text: 'Руководство не видит реальную картину: сколько квартир продано, какова маржа на объекте, где перерасход. BI-дашборды стоят дорого и долго. AI-агент собирает данные из всех систем и даёт ответы в чате за секунды.',
  },
]

function NeedSection() {
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

    const els = ref.current?.querySelectorAll('.need-card')
    els?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity .5s ease, transform .5s ease'
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div id="need" className="need-section">
      <section ref={ref}>
        <div className="sec-header">
          <h2 className="sec-h2">Вам нужен AI-агент, если</h2>
          <p className="sec-sub">Три характерные ситуации, при которых AI-агенты для застройщика —<br />уже не опция, а необходимость</p>
        </div>
        <div className="need-grid">
          {cards.map((c, i) => (
            <div className="need-card" key={i}>
              <div className="need-num">{c.num}</div>
              <div className="need-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default NeedSection
