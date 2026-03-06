import React, { useState, useEffect } from 'react'
import './PopupModal.css'

const BITRIX_WEBHOOK = 'https://tracebs.bitrix24.ru/rest/2/7det75s26t8s9sz6/'

function PopupModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: '', lastName: '', company: '', phone: '', email: '',
    task: '', consent: true,
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') handleClose() }
    if (isOpen) document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleClose = () => {
    setStatus('idle')
    setErrorMsg('')
    setForm({ name: '', lastName: '', company: '', phone: '', email: '', task: '', consent: true })
    onClose()
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose()
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
            TITLE: `Zevs.ai (popup) — ${form.company}`,
            NAME: form.name,
            LAST_NAME: form.lastName,
            COMPANY_TITLE: form.company,
            EMAIL: form.email ? [{ VALUE: form.email, VALUE_TYPE: 'WORK' }] : [],
            PHONE: [{ VALUE: form.phone, VALUE_TYPE: 'WORK' }],
            SOURCE_ID: 'WEB',
            COMMENTS: `Источник: Лендинг Zevs.ai (popup)\nЗадача: ${form.task || 'Не указано'}`,
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
        setErrorMsg(
          data.error === 'insufficient_scope'
            ? 'Ошибка настройки CRM. Свяжитесь с нами по телефону.'
            : 'Не удалось отправить заявку. Попробуйте ещё раз.'
        )
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err)
      setErrorMsg('Ошибка сети. Проверьте подключение и попробуйте ещё раз.')
      setStatus('error')
    }
  }

  return (
    <div className="popup-overlay active" onClick={handleOverlayClick}>
      <div className="popup">
        <button className="popup-close" onClick={handleClose} type="button">&times;</button>
        {status === 'success' ? (
          <div className="popup-success">
            <div className="popup-success-icon">&#10003;</div>
            <h3>Заявка отправлена!</h3>
            <p>Мы свяжемся с вами в ближайшее время, чтобы обсудить ваш проект и предложить подходящее решение.</p>
            <button className="form-submit" type="button" onClick={handleClose}>Закрыть</button>
          </div>
        ) : (
          <>
            <h3>Обсудим ваш проект?</h3>
            <p className="popup-sub">Оставьте заявку — мы свяжемся в течение рабочего дня</p>
            <form onSubmit={handleSubmit}>
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
                <label>Опишите вашу задачу</label>
                <textarea name="task" value={form.task} onChange={handleChange} placeholder="Расскажите, что хотите автоматизировать..." disabled={status === 'loading'} />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} disabled={status === 'loading'} />
                <label>Соглашаюсь с политикой конфиденциальности</label>
              </div>
              {status === 'error' && <p className="popup-error">{errorMsg}</p>}
              <button className="form-submit" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку →'}
              </button>
              <div className="popup-perks">
                <div className="popup-perk"><span className="check">&#10003;</span> Бесплатная консультация</div>
                <div className="popup-perk"><span className="check">&#10003;</span> Прототип за 1–2 недели</div>
                <div className="popup-perk"><span className="check">&#10003;</span> NDA по запросу</div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default PopupModal
