import { useState, useCallback, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './IntroOverlay.module.css'

interface IntroOverlayProps {
  onComplete: () => void
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [isDeparting, setIsDeparting] = useState(false)
  const prefersReduced = useReducedMotion()

  const handleIgnite = useCallback(() => {
    if (prefersReduced) {
      onComplete()
      return
    }
    setIsDeparting(true)
    const timer = setTimeout(() => {
      onComplete()
    }, 1100)
    return () => clearTimeout(timer)
  }, [onComplete, prefersReduced])

  const handleSkip = useCallback(() => {
    onComplete()
  }, [onComplete])

  // Handle keyboard shortcut Escape or Space to skip/ignite
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSkip])

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Vault Entry"
    >
      {/* Ambient background glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      {/* Decorative chain borders */}
      <div className={styles.chainBorder} aria-hidden="true" />
      <div className={styles.chainLeft} aria-hidden="true" />
      <div className={styles.chainRight} aria-hidden="true" />

      {/* Main vault entry content */}
      <div className={styles.content}>
        {/* Ornate Gold Emblem */}
        <div
          className={`${styles.emblem} ${isDeparting ? styles.departing : ''}`}
          aria-hidden="true"
        >
          <svg
            className={styles.emblemSvg}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0E9DB" />
                <stop offset="25%" stopColor="#D4B574" />
                <stop offset="50%" stopColor="#C6A15B" />
                <stop offset="75%" stopColor="#A88842" />
                <stop offset="100%" stopColor="#E8D2A2" />
              </linearGradient>
              <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C6A15B" />
                <stop offset="100%" stopColor="#574025" />
              </linearGradient>
            </defs>

            {/* Outer Greek-Key / Ornamental Ring */}
            <circle
              cx="100"
              cy="100"
              r="92"
              stroke="url(#goldGradient)"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.6"
            />
            <circle
              cx="100"
              cy="100"
              r="84"
              stroke="url(#goldGradient)"
              strokeWidth="1"
              opacity="0.4"
            />
            <circle
              cx="100"
              cy="100"
              r="74"
              stroke="url(#goldGradient)"
              strokeWidth="2"
            />
            <circle
              cx="100"
              cy="100"
              r="66"
              stroke="url(#goldDark)"
              strokeWidth="1"
              strokeDasharray="2 4"
              opacity="0.7"
            />

            {/* Symmetrical Baroque Corner Accents / Flares */}
            <g stroke="url(#goldGradient)" strokeWidth="1.2" opacity="0.8">
              {/* Top / Bottom / Left / Right ornamental ticks */}
              <path d="M100 8 L100 22 M100 178 L100 192 M8 100 L22 100 M178 100 L192 100" />
              {/* Diagonal diamond ticks */}
              <path d="M35 35 L45 45 M165 35 L155 45 M35 165 L45 155 M165 165 L155 155" />
              {/* Baroque scrollwork flourishes */}
              <path d="M70 40 Q100 50 130 40" fill="none" />
              <path d="M70 160 Q100 150 130 160" fill="none" />
              <path d="M40 70 Q50 100 40 130" fill="none" />
              <path d="M160 70 Q150 100 160 130" fill="none" />
            </g>

            {/* Central Monogram - Stylized Imperial 'A' with crown flourish */}
            <path
              d="M100 48 L126 130 H112 L106 110 H94 L88 130 H74 L100 48Z"
              fill="url(#goldGradient)"
            />
            {/* Inner crossbar diamond cutout */}
            <path
              d="M100 74 L104 96 H96 L100 74Z"
              fill="#090807"
            />
            {/* Top crown jewel / diamond */}
            <polygon
              points="100,34 104,40 100,46 96,40"
              fill="url(#goldGradient)"
            />
            {/* Left and right micro diamonds */}
            <polygon
              points="60,100 64,103 60,106 56,103"
              fill="url(#goldGradient)"
              opacity="0.8"
            />
            <polygon
              points="140,100 144,103 140,106 136,103"
              fill="url(#goldGradient)"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Separator lines that part upon ignition */}
        <div className={styles.ornamentalLines} aria-hidden="true">
          <div
            className={`${styles.ornamentLeft} ${
              isDeparting ? styles.departing : ''
            }`}
          />
          <div className={styles.ornamentDiamond} />
          <div
            className={`${styles.ornamentRight} ${
              isDeparting ? styles.departing : ''
            }`}
          />
        </div>

        {/* Brand identity titles */}
        <h1 className={styles.title}>AUREO</h1>
        <p className={styles.subtitle}>The Private Collection</p>

        {/* Ignite CTA */}
        <button
          type="button"
          className={styles.igniteButton}
          onClick={handleIgnite}
          disabled={isDeparting}
          aria-label="Ignite Experience and enter the vault"
        >
          <span className={styles.igniteButtonText}>
            {isDeparting ? 'OPENING VAULT...' : 'IGNITE EXPERIENCE'}
          </span>
        </button>
      </div>

      {/* Immediate Skip action */}
      <button
        type="button"
        className={styles.skipIntro}
        onClick={handleSkip}
        aria-label="Skip introduction"
      >
        Skip Intro →
      </button>
    </motion.div>
  )
}
