import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/data/siteConfig'
import styles from './ProjectDossier.module.css'

interface ProjectDossierProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDossier({ project, onClose }: ProjectDossierProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (project) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [project, onClose])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      const originalStyle = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
      return () => {
        document.body.style.overflow = originalStyle
      }
    }
  }, [project])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose],
  )

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-title"
        >
          <motion.div
            className={styles.panel}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Close project dossier"
            >
              ✕
            </button>

            <div className={styles.content}>
              {/* Massive background watermark of project number */}
              <div className={styles.watermark} aria-hidden="true">
                {project.number}
              </div>

              {/* Header meta */}
              <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <span className={styles.category}>{project.category.toUpperCase()}</span>
                  {project.featured && (
                    <span className={styles.featuredBadge}>
                      <span className={styles.featuredStar}>★</span>
                      FLAGSHIP SPEC
                    </span>
                  )}
                </div>

                <p className={styles.projectNumber}>ARTEFACT // {project.number}</p>
                <h2 id="dossier-title" className={styles.title}>
                  {project.title}
                </h2>
                <p className={styles.subtitle}>{project.subtitle}</p>
                <p className={styles.year}>COMMISSIONED: {project.year}</p>
              </div>

              <div className={styles.separator} aria-hidden="true" />

              {/* Description */}
              <div className={styles.section}>
                <h3 className={styles.sectionLabel}>Executive Briefing</h3>
                <p className={styles.descriptionText}>{project.description}</p>
              </div>

              {/* Problem Statement */}
              <div className={styles.section}>
                <h3 className={styles.sectionLabel}>The Problem</h3>
                <p className={styles.problemText}>{project.problem}</p>
              </div>

              {/* Technical Approach */}
              <div className={styles.section}>
                <h3 className={styles.sectionLabel}>The Engineering Approach</h3>
                <p className={styles.approachText}>{project.approach}</p>
              </div>

              {/* Tech Stack */}
              <div className={styles.section}>
                <h3 className={styles.sectionLabel}>Metallurgy & Tech Stack</h3>
                <div className={styles.techGrid}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.separator} aria-hidden="true" />

              {/* External Links */}
              <div className={styles.linksRow}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkButton}
                >
                  Inspect Repository →
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.linkButtonSecondary}
                  >
                    Launch Live Demo ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
