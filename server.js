import 'dotenv/config'
import express from 'express'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/', express.static(join(__dirname, 'dist')))

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'sales@zevs.ai',
    pass: process.env.SMTP_PASS,
  },
})

function buildEmailHtml({ name, lastName, company, phone, email, employees, task, consent, url }) {
  const fields = [
    { label: 'Имя', value: name },
    { label: 'Фамилия', value: lastName || '—' },
    { label: 'Компания', value: company },
    { label: 'Телефон', value: phone },
    { label: 'Email', value: email ? `<a href="mailto:${email}" style="color: #FF5C35; text-decoration: none;">${email}</a>` : '—' },
    { label: 'Сотрудники', value: employees || '—' },
    { label: 'Задача', value: task || '—' },
    { label: 'Согласие', value: consent ? 'Согласие на обработку персональных данных' : 'Не дано' },
    { label: 'URL', value: `<a href="${url}" style="color: #FF5C35; text-decoration: none;">${url}</a>` },
  ]

  const rows = fields.map(({ label, value }) => `
    <tr>
      <td style="padding: 24px 40px 0;">
        <p style="margin: 0 0 8px; font-weight: 700; font-size: 15px; color: #1a1a1a;">${label}</p>
        <p style="margin: 0 0 24px; font-size: 15px; color: #333;">${value}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0;" />
      </td>
    </tr>
  `).join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background: #f0f0f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f0f0f0; padding: 32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 4px;">
          ${rows}
          <tr>
            <td style="padding: 32px 40px; text-align: center;">
              <p style="margin: 0; font-size: 13px; color: #999;">
                Отправлено с сайта <a href="https://zevs.ai" style="color: #FF5C35; text-decoration: none;">Zevs.ai</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

const sendEmailHandler = async (req, res) => {
  const { name, lastName, company, phone, email, employees, task, consent } = req.body

  if (!name || !company || !phone) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const pageUrl = req.headers.referer || 'https://zevs.ai'

  try {
    await transporter.sendMail({
      from: '"Zevs.ai - Sales" <sales@zevs.ai>',
      to: 'sales@zevs.ai',
      subject: `Новая заявка: Лендинг Zevs.ai — ${company}`,
      html: buildEmailHtml({ name, lastName, company, phone, email, employees, task, consent, url: pageUrl }),
    })
    res.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}

app.post('/api/send-email', sendEmailHandler)

const HEALTH_KEY = process.env.HEALTH_KEY || 'zevs-mon-2026'

const healthHandler = async (req, res) => {
  if (req.query.key !== HEALTH_KEY) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const status = { server: 'ok', smtp: 'ok', timestamp: new Date().toISOString() }
  try {
    await transporter.verify()
  } catch {
    status.smtp = 'error'
  }
  const httpCode = status.smtp === 'ok' ? 200 : 503
  res.status(httpCode).json(status)
}
app.get('/api/health', healthHandler)

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
