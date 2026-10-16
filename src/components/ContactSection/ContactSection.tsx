import { motion } from 'framer-motion'
import siteConfig from '@/data/siteConfig'
import styles from './ContactSection.module.css'

const { owner, social } = siteConfig

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function ContactSection() {
  return (
    <section id="signature" className={styles.section}>
      <motion.div
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section label */}
        <motion.p className={styles.label} custom={0} variants={fadeUp}>
          05 — THE FINAL SIGNATURE
        </motion.p>

        {/* Heading */}
        <motion.h2 className={styles.heading} custom={1} variants={fadeUp}>
          Let's Build Something
        </motion.h2>
        <motion.p className={styles.subheading} custom={2} variants={fadeUp}>
          Extraordinary
        </motion.p>

        {/* Social links */}
        <motion.div className={styles.links} custom={3} variants={fadeUp}>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkCard}
          >
            <span className={styles.linkIcon}>
              {/* GitHub Mark SVG */}
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </span>
            <span className={styles.linkText}>
              <span className={styles.linkTitle}>GitHub</span>
              <span className={styles.linkSub}>{owner.githubUsername}</span>
            </span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>

          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className={styles.linkCard}
            >
              <span className={styles.linkIcon}>
                {/* Envelope SVG */}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="28" height="28" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4L12 13 2 4" />
                </svg>
              </span>
              <span className={styles.linkText}>
                <span className={styles.linkTitle}>Email</span>
                <span className={styles.linkSub}>{social.email}</span>
              </span>
              <span className={styles.arrow} aria-hidden="true">→</span>
            </a>
          )}
        </motion.div>

        {/* Decorative ornament line */}
        <motion.div
          className={styles.ornament}
          custom={4}
          variants={fadeUp}
          aria-hidden="true"
        />

        {/* Footer */}
        <motion.footer className={styles.footer} custom={5} variants={fadeUp}>
          <p className={styles.copyright}>
            © 2026 KABEER — AUREO: THE PRIVATE COLLECTION
          </p>
          <p className={styles.crafted}>
            Crafted with precision and care.
          </p>
        </motion.footer>
      </motion.div>
    </section>
  )
}
