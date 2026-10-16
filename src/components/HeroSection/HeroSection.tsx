import { useState, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isHighlighted, setIsHighlighted] = useState(false)
  const emblemRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const rect = emblemRef.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    setRotation({
      x: -deltaY * 14,
      y: deltaX * 14,
    })
  }

  const handlePointerLeave = () => {
    setRotation({ x: 0, y: 0 })
    setIsHighlighted(false)
  }

  const handlePointerDown = () => {
    setIsHighlighted((prev) => !prev)
  }

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.querySelector('#garage')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="vault" className={styles.hero} aria-label="Aureo Hero Vault">
      {/* Ambient architectural lighting */}
      <div className={styles.ambientLighting} aria-hidden="true" />
      <div className={styles.architecturalLines} aria-hidden="true" />

      {/* Top Meta Bar */}
      <div className={styles.topBar}>
        <motion.div
          className={styles.archiveBadge}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={styles.archiveTag}>00 // THE VAULT</span>
          <span className={styles.archiveSub}>AUREO ARCHIVE · EDITION NO. 13</span>
        </motion.div>

        <motion.div
          className={styles.specSheet}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className={styles.specItem}>LAT 33.8688° S · LONG 151.2093° E</span>
          <span className={styles.specItem}>CURATION: AUTOMOTIVE & ALGORITHMIC SYSTEMS</span>
        </motion.div>
      </div>

      {/* Centerpiece: Antique-Gold Classical Face Emblem & Dominant KABEER */}
      <div className={styles.centerpiece}>
        {/* Interactive Classical Face Emblem (Original baroque jewellery artwork) */}
        <motion.div
          ref={emblemRef}
          className={styles.emblemContainer}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          style={{
            transform: prefersReduced
              ? 'none'
              : `perspective(600px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHighlighted ? 1.05 : 1})`,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          role="img"
          aria-label="Interactive antique-gold classical baroque face emblem"
          title="Interactive Baroque Emblem — Touch or move pointer"
        >
          <svg
            className={styles.emblemSvg}
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="antiqueGoldFace" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2D6" />
                <stop offset="20%" stopColor="#E2C17D" />
                <stop offset="50%" stopColor="#C6A15B" />
                <stop offset="80%" stopColor="#8A6E30" />
                <stop offset="100%" stopColor="#4A3816" />
              </linearGradient>

              <radialGradient id="emblemCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F5DEAA" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#C6A15B" stopOpacity="0.1" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>

              <filter id="goldHighlightGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#E8D2A2" floodOpacity={isHighlighted ? "0.8" : "0.35"} />
              </filter>
            </defs>

            {/* Ambient Background Aura */}
            <circle cx="120" cy="120" r="110" fill="url(#emblemCoreGlow)" />

            {/* Layer 1: Outer Radiating Sunburst / Baroque Laurel Rays */}
            <g stroke="url(#antiqueGoldFace)" strokeWidth="1.2" opacity="0.6">
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="120"
                  y1="12"
                  x2="120"
                  y2="24"
                  transform={`rotate(${deg} 120 120)`}
                />
              ))}
            </g>

            {/* Layer 2: Beaded Luxury Halo Ring */}
            <circle
              cx="120"
              cy="120"
              r="96"
              stroke="url(#antiqueGoldFace)"
              strokeWidth="2"
              strokeDasharray="3 5"
              opacity="0.8"
            />
            <circle
              cx="120"
              cy="120"
              r="88"
              stroke="url(#antiqueGoldFace)"
              strokeWidth="1.2"
              opacity="0.9"
            />

            {/* Layer 3: Symmetrical Acanthus Volutes / Baroque Crown */}
            <path
              d="M78 52 C90 40, 105 45, 120 38 C135 45, 150 40, 162 52 C154 62, 142 58, 120 62 C98 58, 86 62, 78 52 Z"
              fill="url(#antiqueGoldFace)"
              opacity="0.85"
            />
            {/* Crown center jewel */}
            <polygon points="120,32 125,40 120,48 115,40" fill="#FFF4D4" filter="url(#goldHighlightGlow)" />

            {/* Layer 4: Baroque Scrolling Hair Tresses (Left & Right Volutes) */}
            <g stroke="url(#antiqueGoldFace)" strokeWidth="2.5" fill="none" strokeLinecap="round">
              {/* Left flowing tresses */}
              <path d="M72 85 C55 100, 52 125, 62 145 C68 156, 75 162, 72 174 C70 182, 60 188, 55 180" />
              <path d="M80 102 C68 118, 68 138, 76 156 C80 166, 82 176, 78 184" opacity="0.75" />
              {/* Right flowing tresses */}
              <path d="M168 85 C185 100, 188 125, 178 145 C172 156, 165 162, 168 174 C170 182, 180 188, 185 180" />
              <path d="M160 102 C172 118, 172 138, 164 156 C160 166, 158 176, 162 184" opacity="0.75" />
            </g>

            {/* Layer 5: Classical Sculpted Human Face (Stoic Classical Hero Mask) */}
            <g id="classicalMask">
              {/* Jawline & Head Contour */}
              <path
                d="M84 88 C84 75, 156 75, 156 88 C156 125, 146 160, 120 176 C94 160, 84 125, 84 88 Z"
                fill="#12100D"
                stroke="url(#antiqueGoldFace)"
                strokeWidth="2"
              />

              {/* Brow Arch (Noble Roman / Hellenistic Profile) */}
              <path
                d="M92 104 C98 98, 110 99, 116 103 M148 104 C142 98, 130 99, 124 103"
                stroke="url(#antiqueGoldFace)"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Almond Eyes (Classical Sculpture Closed / Stoic Look) */}
              <ellipse cx="104" cy="111" rx="7" ry="3.5" fill="none" stroke="url(#antiqueGoldFace)" strokeWidth="1.5" />
              <ellipse cx="136" cy="111" rx="7" ry="3.5" fill="none" stroke="url(#antiqueGoldFace)" strokeWidth="1.5" />
              <circle cx="104" cy="111" r="1.8" fill="url(#antiqueGoldFace)" />
              <circle cx="136" cy="111" r="1.8" fill="url(#antiqueGoldFace)" />

              {/* Aquiline Nose Ridge */}
              <path
                d="M120 102 L120 132 L115 137 H125"
                stroke="url(#antiqueGoldFace)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Sculpted Lips & Philtrum */}
              <path
                d="M112 149 C116 146, 124 146, 128 149 C124 153, 116 153, 112 149 Z"
                fill="url(#antiqueGoldFace)"
                opacity="0.9"
              />
              <path
                d="M114 154 C117 156, 123 156, 126 154"
                stroke="url(#antiqueGoldFace)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Chin cleft highlight */}
              <circle cx="120" cy="166" r="1.5" fill="url(#antiqueGoldFace)" opacity="0.7" />
            </g>

            {/* Layer 6: Symmetrical Pendant Base / Acanthus Leaves */}
            <path
              d="M98 184 C108 194, 132 194, 142 184 C132 205, 108 205, 98 184 Z"
              fill="url(#antiqueGoldFace)"
              opacity="0.8"
            />
            {/* Teardrop pearl finial */}
            <polygon points="120,200 124,208 120,216 116,208" fill="#FFF4D4" filter="url(#goldHighlightGlow)" />
          </svg>
        </motion.div>

        {/* DOMINANT KABEER TYPOGRAPHY */}
        <motion.h1
          className={styles.nameHeading}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          KABEER
        </motion.h1>

        {/* Editorial Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          Developer · Engineer · Computational Systems
        </motion.p>

        <motion.span
          className={styles.curatorNote}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          THE PRIVATE COLLECTION — SYDNEY
        </motion.span>
      </div>

      {/* Bottom Explore Anchor */}
      <div className={styles.bottomBar}>
        <motion.a
          href="#garage"
          className={styles.exploreCta}
          onClick={handleScrollClick}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          aria-label="Scroll to explore private collection"
        >
          <span className={styles.exploreText}>INSPECT THE COLLECTION</span>
          <div className={styles.chevron} aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  )
}
