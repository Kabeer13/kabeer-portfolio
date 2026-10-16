import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navigation.module.css'

const NAV_LINKS = [
  { label: 'OWNER', href: '#owner' },
  { label: 'GARAGE', href: '#garage' },
  { label: 'ENGINEERING', href: '#engineering' },
  { label: 'WORKS', href: '#works' },
  { label: 'SIGNATURE', href: '#signature' },
] as const

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  /* Track scroll to toggle backdrop */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll() // initialise
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const scrollToTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setMenuOpen(false)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
      setMenuOpen(false)
    },
    [],
  )

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        {/* Logo */}
        <a href="#" className={styles.logo} onClick={scrollToTop}>
          AUREO
        </a>

        {/* Desktop links */}
        <ul className={styles.desktopLinks}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={styles.navLink}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile) */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.overlay}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <button
              className={styles.close}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            <ul className={styles.mobileLinks}>
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={styles.mobileLink}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
