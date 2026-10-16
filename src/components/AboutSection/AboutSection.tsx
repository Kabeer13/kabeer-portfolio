/**
 * AboutSection — 01 · THE OWNER
 *
 * Kabeer's personal introduction with portrait frame
 * and biography in a two-column layout.
 */

import { motion, useReducedMotion } from 'framer-motion'
import siteConfig from '@/data/siteConfig'
import styles from './AboutSection.module.css'

const { owner } = siteConfig

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const noMotion = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutSection() {
  const prefersReduced = useReducedMotion()
  const variants = prefersReduced ? noMotion : fadeUp

  return (
    <section id="owner" className={styles.section}>
      <div className={styles.container}>
        {/* Section label */}
        <motion.p
          className={styles.sectionLabel}
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={0}
        >
          01 — THE OWNER
        </motion.p>

        {/* Two-column grid */}
        <div className={styles.grid}>
          {/* ── Left: Portrait ── */}
          <motion.div
            className={styles.portraitColumn}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={1}
          >
            {/* Portrait frame with gold corner accents */}
            <div className={styles.portraitFrame}>
              <span className={styles.cornerTopLeft} aria-hidden="true" />
              <span className={styles.cornerTopRight} aria-hidden="true" />
              <span className={styles.cornerBottomLeft} aria-hidden="true" />
              <span className={styles.cornerBottomRight} aria-hidden="true" />
              <img
                className={styles.portraitImage}
                src={owner.portraitPath}
                alt={`Portrait of ${owner.name}`}
                loading="lazy"
              />
            </div>

            {/* Identification plate */}
            <div className={styles.idPlate}>
              <p className={styles.idPlateLabel}>Identification</p>
              <p className={styles.idPlateName}>{owner.name}</p>
              <div className={styles.idPlateDetails}>
                <p className={styles.idPlateDetail}>
                  Location:{' '}
                  <span className={styles.idPlateDetailValue}>
                    {owner.location.toUpperCase()}
                  </span>
                </p>
                <p className={styles.idPlateDetail}>
                  Field:{' '}
                  <span className={styles.idPlateDetailValue}>
                    {owner.degree.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Biography ── */}
          <motion.div
            className={styles.bioColumn}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={2}
          >
            <h2 className={styles.heading}>
              The <span className={styles.headingAccent}>Owner</span>
            </h2>

            <div className={styles.bioText}>
              {owner.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Interests */}
            <div className={styles.interestsBlock}>
              <p className={styles.interestsLabel}>Interests</p>
              <div className={styles.interestsList}>
                {owner.interests.map((interest) => (
                  <span key={interest} className={styles.interestTag}>
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
