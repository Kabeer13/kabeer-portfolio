import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroOverlay from './components/IntroOverlay/IntroOverlay'
import Navigation from './components/Navigation/Navigation'
import HeroSection from './components/HeroSection/HeroSection'
import AboutSection from './components/AboutSection/AboutSection'
import GarageSection from './components/GarageSection/GarageSection'
import SkillsSection from './components/SkillsSection/SkillsSection'
import SelectedWorks from './components/SelectedWorks/SelectedWorks'
import ContactSection from './components/ContactSection/ContactSection'
import GoldOrnament from './components/GoldOrnament/GoldOrnament'
import GoldChainFrame from './components/GoldChainFrame/GoldChainFrame'
import styles from './App.module.css'

function App() {
  const [introComplete, setIntroComplete] = useState(() => {
    try {
      return sessionStorage.getItem('aureo-intro-seen') === 'true'
    } catch {
      return false
    }
  })

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
    try {
      sessionStorage.setItem('aureo-intro-seen', 'true')
    } catch {
      // sessionStorage unavailable
    }
  }, [])

  return (
    <div className={styles.app}>
      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroOverlay key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      {introComplete && (
        <>
          <GoldChainFrame />
          <Navigation />
          <main>
            <HeroSection />
            <GoldOrnament variant="section-divider" />
            <AboutSection />
            <GoldOrnament variant="section-divider" />
            <GarageSection />
            <GoldOrnament variant="section-divider" />
            <SkillsSection />
            <GoldOrnament variant="section-divider" />
            <SelectedWorks />
            <GoldOrnament variant="section-divider" />
            <ContactSection />
          </main>
        </>
      )}
    </div>
  )
}

export default App
