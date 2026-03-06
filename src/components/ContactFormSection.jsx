import React, { useState } from 'react'
import './ContactFormSection.css'

const BITRIX_WEBHOOK = 'https://tracebs.bitrix24.ru/rest/2/7det75s26t8s9sz6/'

function ContactFormSection() {
  const [form, setForm] = useState({
    name: '', lastName: '', company: '', phone: '', email: '',
    employees: '', task: '', consent: true,
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.company || !form.phone) return
    setStatus('loading')

    try {
      const bitrixPromise = fetch(`${BITRIX_WEBHOOK}crm.lead.add.json`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            TITLE: `Zevs.ai — ${form.company}`,
            NAME: form.name,
            LAST_NAME: form.lastName,
            COMPANY_TITLE: form.company,
            EMAIL: form.email ? [{ VALUE: form.email, VALUE_TYPE: 'WORK' }] : [],
            PHONE: [{ VALUE: form.phone, VALUE_TYPE: 'WORK' }],
            SOURCE_ID: 'WEB',
            COMMENTS: `Источник: Лендинг Zevs.ai\nСотрудники: ${form.employees || 'Не указано'}\nЗадача: ${form.task || 'Не указано'}`,
          },
        }),
      })

      const emailPromise = fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          lastName: form.lastName,
          company: form.company,
          phone: form.phone,
          email: form.email,
          employees: form.employees,
          task: form.task,
          consent: form.consent,
        }),
      }).catch(err => console.error('Email notification error:', err))

      const [bitrixResponse] = await Promise.all([bitrixPromise, emailPromise])
      const data = await bitrixResponse.json()

      if (data.result) {
        setStatus('success')
      } else {
        console.error('Bitrix24 error:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setStatus('error')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setForm({ name: '', lastName: '', company: '', phone: '', email: '', employees: '', task: '', consent: true })
  }

  return (
    <div id="contact" className="form-wrap">
      <div className="form-shapes">
        <div className="form-shape"></div>
        <div className="form-shape"></div>
        <div className="form-shape"></div>
      </div>
      <div className="form-inner">
        <div className="form-left">
          <h2>Обсудим ваш проект?</h2>
          <p>Оставьте заявку — наш эксперт свяжется с вами в течение рабочего дня, изучит ваши задачи и предложит подходящее решение.</p>
          <div className="form-perks">
            <div className="form-perk"><span className="check">&#10003;</span> Бесплатная первая консультация</div>
            <div className="form-perk"><span className="check">&#10003;</span> Анализ процессов и расчёт ROI</div>
            <div className="form-perk"><span className="check">&#10003;</span> Прототип за 1–2 недели</div>
            <div className="form-perk"><span className="check">&#10003;</span> NDA по запросу</div>
          </div>
        </div>
        <div className="contact-form">
          {status === 'success' ? (
            <div className="contact-success">
              <div className="contact-success-icon">&#10003;</div>
              <h3>Заявка отправлена!</h3>
              <p>Мы свяжемся с вами в ближайшее время, чтобы обсудить ваш проект и предложить подходящее решение.</p>
              <button className="form-submit" type="button" onClick={handleReset}>Отправить ещё одну заявку</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3>Оставить заявку</h3>
              <div className="form-row">
                <div className="form-field">
                  <label>Имя *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Александр" required disabled={status === 'loading'} />
                </div>
                <div className="form-field">
                  <label>Фамилия</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Петров" disabled={status === 'loading'} />
                </div>
              </div>
              <div className="form-field">
                <label>Компания *</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="ГК «Монолит»" required disabled={status === 'loading'} />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Телефон *</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+7 (999) 000-00-00" required disabled={status === 'loading'} />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="a.petrov@monolith.ru" disabled={status === 'loading'} />
                </div>
              </div>
              <div className="form-field">
                <label>Количество сотрудников</label>
                <select name="employees" value={form.employees} onChange={handleChange} disabled={status === 'loading'}>
                  <option value="">Выберите</option>
                  <option>До 30 человек</option>
                  <option>30–100 человек</option>
                  <option>100–300 человек</option>
                  <option>300–1000 человек</option>
                  <option>Более 1000 человек</option>
                </select>
              </div>
              <div className="form-field">
                <label>Опишите вашу задачу</label>
                <textarea name="task" value={form.task} onChange={handleChange} placeholder="Расскажите, что хотите автоматизировать или какую проблему решить..." disabled={status === 'loading'} />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} disabled={status === 'loading'} />
                <label>Соглашаюсь с условиями политики конфиденциальности и обработки персональных данных</label>
              </div>
              {status === 'error' && <p className="form-error">Не удалось отправить заявку. Попробуйте ещё раз.</p>}
              <button className="form-submit" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactFormSection
