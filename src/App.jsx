import React, { useState } from 'react'
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
import PopupModal from './components/PopupModal'
import Footer from './components/Footer'

function App() {
  const [popupOpen, setPopupOpen] = useState(false)

  const openPopup = () => setPopupOpen(true)
  const closePopup = () => setPopupOpen(false)

  return (
    <>
      <Navbar onOpenPopup={openPopup} />
      <HeroSection />
      <NeedSection />
      <ProductsSection />
      <CasesSection />
      <TechStackSection />
      <PricingSection onOpenPopup={openPopup} />
      <StagesSection />
      <TrustSection />
      <ContactFormSection />
      <PopupModal isOpen={popupOpen} onClose={closePopup} />
      <Footer />
    </>
  )
}

export default App
