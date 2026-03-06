import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import newsData from '../data/newsData'
import './NewsSection.css'

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

function NewsSection() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scroll = (dir) => {
    if (!scrollRef.current) return
    const cardWidth = scrollRef.current.querySelector('.news-card')?.offsetWidth || 380
    scrollRef.current.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' })
  }

  return (
    <div className={`news-section${visible ? ' news-section--visible' : ''}`} ref={sectionRef}>
      <div className="news-inner">
        <div className="news-header">
          <div>
            <h2>Новости и аналитика Zevs.ai</h2>
            <p className="news-subhead">Тренды AI-автоматизации, кейсы и экспертные материалы</p>
          </div>
          <div className="news-nav">
            <button className="news-arrow" onClick={() => scroll(-1)} aria-label="Назад">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="news-arrow" onClick={() => scroll(1)} aria-label="Вперёд">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
        <div className="news-carousel" ref={scrollRef}>
          {newsData.map((item) => (
            <Link to={`/news/${item.slug}`} className="news-card" key={item.id}>
              <div className="news-card-cover" style={{ background: item.coverGradient }}>
                <span className="news-card-category">{item.category}</span>
                <div className="news-card-icon">{icons[item.coverIcon]}</div>
              </div>
              <div className="news-card-body">
                <h3>{item.title}</h3>
                <span className="news-card-date">{item.date}</span>
                <p>{item.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="news-all-link">
          <Link to="/news">Все новости →</Link>
        </div>
      </div>
    </div>
  )
}

export default NewsSection
