import React, { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import newsData from '../data/newsData'
import './NewsArticlePage.css'

function NewsArticlePage() {
  const { slug } = useParams()
  const article = newsData.find((n) => n.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!article) return <Navigate to="/news" replace />

  const otherArticles = newsData.filter((n) => n.id !== article.id).slice(0, 3)

  return (
    <div className="article-page">
      <div className="article-hero" style={{ background: article.coverGradient }}>
        <div className="article-hero-inner">
          <Link to="/news" className="article-back">← Все новости</Link>
          <div className="article-meta-row">
            <span className="article-category">{article.category}</span>
            <span className="article-date-hero">{article.date}</span>
          </div>
          <h1>{article.title}</h1>
        </div>
      </div>

      <div className="article-body-wrap">
        <article className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <div className="article-related">
        <div className="article-related-inner">
          <h2>Читайте также</h2>
          <div className="article-related-grid">
            {otherArticles.map((item) => (
              <Link to={`/news/${item.slug}`} className="article-related-card" key={item.id}>
                <div className="article-related-cover" style={{ background: item.coverGradient }}>
                  <span className="article-related-cat">{item.category}</span>
                </div>
                <div className="article-related-body">
                  <span className="article-related-date">{item.date}</span>
                  <h3>{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsArticlePage
