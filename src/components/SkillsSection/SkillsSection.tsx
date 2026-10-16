/**
 * SkillsSection — 03 · THE ENGINEERING
 *
 * Technical skills showcase in a 2×2 card grid
 * with staggered scroll-triggered animations.
 */

import { motion, useReducedMotion } from 'framer-motion'
import siteConfig from '@/data/siteConfig'
import styles from './SkillsSection.module.css'

const { skills } = siteConfig

/* ─── Category Metadata ─── */
const categories: { key: keyof typeof skills; label: string }[] = [
  { key: 'languages', label: 'Languages' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'tools', label: 'Tools' },
  { key: 'interests', label: 'Interests' },
]

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const noMotion = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
}

const noContainer = {
  hidden: {},
  visible: {},
}

export default function SkillsSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="engineering" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <motion.p
          className={styles.sectionLabel}
          variants={prefersReduced ? noMotion : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          03 — THE ENGINEERING
        </motion.p>

        <motion.h2
          className={styles.heading}
          variants={prefersReduced ? noMotion : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          Technical Arsenal
        </motion.h2>

        {/* Ornamental divider */}
        <motion.div
          className={styles.ornament}
          variants={prefersReduced ? noMotion : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          aria-hidden="true"
        >
          <span className={styles.ornamentDot} />
        </motion.div>

        {/* Skills Grid — staggered children */}
        <motion.div
          className={styles.grid}
          variants={prefersReduced ? noContainer : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map(({ key, label }) => (
            <motion.div
              key={key}
              className={styles.card}
              variants={prefersReduced ? noMotion : cardVariants}
            >
              <h3 className={styles.cardTitle}>{label}</h3>
              <ul className={styles.skillList}>
                {skills[key].map((skill) => (
                  <li key={skill} className={styles.skillItem}>
                    <span className={styles.skillDot} aria-hidden="true" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
