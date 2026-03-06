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
            TITLE: `Zevs.ai \u2014 ${form.company}`,
            NAME: form.name,
            LAST_NAME: form.lastName,
            COMPANY_TITLE: form.company,
            EMAIL: form.email ? [{ VALUE: form.email, VALUE_TYPE: 'WORK' }] : [],
            PHONE: [{ VALUE: form.phone, VALUE_TYPE: 'WORK' }],
            SOURCE_ID: 'WEB',
            COMMENTS: `\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A: \u041B\u0435\u043D\u0434\u0438\u043D\u0433 Zevs.ai\n\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438: ${form.employees || '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E'}\n\u0417\u0430\u0434\u0430\u0447\u0430: ${form.task || '\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E'}`,
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
            <div className="form-perk"><span className="check">{'\u2713'}</span> Бесплатная первая консультация</div>
            <div className="form-perk"><span className="check">{'\u2713'}</span> Анализ процессов и расчёт ROI</div>
            <div className="form-perk"><span className="check">{'\u2713'}</span> Прототип за 1\u20132 недели</div>
            <div className="form-perk"><span className="check">{'\u2713'}</span> NDA по запросу</div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>{status === 'success' ? '\u2713 Заявка отправлена!' : 'Оставить заявку'}</h3>
          {status === 'success' ? (
            <p className="form-success-text">Мы свяжемся с вами в ближайшее время.</p>
          ) : (
            <>
              <div className="form-row">
                <div className="form-field">
                  <label>Имя *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Александр" required disabled={status === 'loading'} />
                </div>
                <div className="form-field">
                  <label>Фамилия *</label>
                  <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Петров" disabled={status === 'loading'} />
                </div>
              </div>
              <div className="form-field">
                <label>Компания *</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder={'ГК \u00abМонолит\u00bb'} required disabled={status === 'loading'} />
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
                  <option>30\u2013100 человек</option>
                  <option>100\u2013300 человек</option>
                  <option>300\u20131000 человек</option>
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
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default ContactFormSection
