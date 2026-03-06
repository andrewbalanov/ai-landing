import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import NeedSection from './components/NeedSection'
import ProductsSection from './components/ProductsSection'
import CasesSection from './components/CasesSection'
import TechStackSection from './components/TechStackSection'
import PricingSection from './components/PricingSection'
import StagesSection from './components/StagesSection'
import TrustSection from './components/TrustSection'
import ContactFormSection from './components/ContactFormSection'
import NewsSection from './components/NewsSection'
import PopupModal from './components/PopupModal'
import Footer from './components/Footer'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'

function LandingPage({ onOpenPopup }) {
  return (
    <>
      <HeroSection />
      <NeedSection />
      <ProductsSection />
      <CasesSection />
      <TechStackSection />
      <PricingSection onOpenPopup={onOpenPopup} />
      <StagesSection />
      <TrustSection />
      <NewsSection />
      <ContactFormSection />
    </>
  )
}

function ScrollToHash() {
  const { hash, pathname } = useLocation()
  useEffect(() => {
    if (hash && pathname === '/') {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    }
  }, [hash, pathname])
  return null
}

function App() {
  const [popupOpen, setPopupOpen] = useState(false)

  const openPopup = () => setPopupOpen(true)
  const closePopup = () => setPopupOpen(false)

  return (
    <>
      <ScrollToHash />
      <Navbar onOpenPopup={openPopup} />
      <Routes>
        <Route path="/" element={<LandingPage onOpenPopup={openPopup} />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsArticlePage />} />
      </Routes>
      <PopupModal isOpen={popupOpen} onClose={closePopup} />
      <Footer />
    </>
  )
}

export default App
