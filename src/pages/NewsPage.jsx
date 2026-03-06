import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import newsData from '../data/newsData'
import './NewsPage.css'

const icons = {
  robot: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="8" y="14" width="24" height="18" rx="4" stroke="#fff" strokeWidth="2"/><circle cx="15" cy="23" r="2.5" fill="#fff"/><circle cx="25" cy="23" r="2.5" fill="#fff"/><rect x="17" y="28" width="6" height="2" rx="1" fill="#fff"/><line x1="20" y1="8" x2="20" y2="14" stroke="#fff" strokeWidth="2"/><circle cx="20" cy="7" r="2" fill="#fff"/></svg>
  ),
  support: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M20 6C12.268 6 6 12.268 6 20v4a2 2 0 002 2h2a2 2 0 002-2v-4a2 2 0 00-2-2H8.1C8.6 12.8 13.8 8 20 8s11.4 4.8 11.9 10H30a2 2 0 00-2 2v4a2 2 0 002 2h2a2 2 0 002-2v-4c0-7.732-6.268-14-14-14z" fill="#fff"/><rect x="14" y="28" width="12" height="3" rx="1.5" fill="#fff" opacity=".6"/></svg>
  ),
  chart: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="6" y="22" width="6" height="12" rx="1" fill="#fff" opacity=".6"/><rect x="14" y="16" width="6" height="18" rx="1" fill="#fff" opacity=".8"/><rect x="22" y="10" width="6" height="24" rx="1" fill="#fff"/><rect x="30" y="6" width="6" height="28" rx="1" fill="#fff" opacity=".9"/></svg>
  ),
  trend: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><polyline points="6,30 14,20 22,24 34,8" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="26,8 34,8 34,16" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
}

function NewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const featured = newsData[0]
  const rest = newsData.slice(1)

  return (
    <div className="news-page">
      <div className="news-page-hero">
        <div className="news-page-hero-inner">
          <h1>Новости и аналитика</h1>
          <p>Экспертные материалы о трендах AI-автоматизации, кейсы внедрения и аналитика рынка</p>
        </div>
      </div>

      <div className="news-page-content">
        <Link to={`/news/${featured.slug}`} className="news-featured">
          <div className="news-featured-cover" style={{ background: featured.coverGradient }}>
            <span className="news-featured-category">{featured.category}</span>
            <div className="news-featured-icon">{icons[featured.coverIcon]}</div>
          </div>
          <div className="news-featured-body">
            <span className="news-featured-date">{featured.date}</span>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="news-featured-link">Читать статью →</span>
          </div>
        </Link>

        <div className="news-page-grid">
          {rest.map((item) => (
            <Link to={`/news/${item.slug}`} className="news-page-card" key={item.id}>
              <div className="news-page-card-cover" style={{ background: item.coverGradient }}>
                <span className="news-page-card-category">{item.category}</span>
                <div className="news-page-card-icon">{icons[item.coverIcon]}</div>
              </div>
              <div className="news-page-card-body">
                <span className="news-page-card-date">{item.date}</span>
                <h3>{item.title}</h3>
                <p>{item.excerpt}</p>
                <span className="news-page-card-link">Читать →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewsPage
