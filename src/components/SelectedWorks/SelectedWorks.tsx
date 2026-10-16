import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import siteConfig from '@/data/siteConfig'
import type { Project } from '@/data/siteConfig'
import styles from './SelectedWorks.module.css'

const featuredProjects = siteConfig.projects.filter((p) => p.featured)

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article className={styles.workCard} variants={itemVariants}>
      <div className={styles.workHeader}>
        <span className={styles.workNumber}>{project.number}</span>
        <span className={styles.workYear}>{project.year}</span>
      </div>

      <div className={styles.workContent}>
        <div className={styles.workMeta}>
          <span className={styles.workLabel}>SELECTED WORK {String(index + 1).padStart(2, '0')}</span>
          <div className={styles.categoryBadge}>{project.category.toUpperCase()}</div>
        </div>

        <h3 className={styles.workTitle}>{project.title}</h3>
        <p className={styles.workSubtitle}>{project.subtitle}</p>

        <div className={styles.ornamentalLine} aria-hidden="true" />

        <p className={styles.workDescription}>{project.description}</p>

        <div className={styles.workDetails}>
          <div className={styles.detailBlock}>
            <h4 className={styles.detailLabel}>THE PROBLEM</h4>
            <p className={styles.detailText}>{project.problem}</p>
          </div>
          <div className={styles.detailBlock}>
            <h4 className={styles.detailLabel}>THE APPROACH</h4>
            <p className={styles.detailText}>{project.approach}</p>
          </div>
        </div>

        <div className={styles.techRow}>
          <span className={styles.techLabel}>TECH STACK</span>
          <div className={styles.techTags}>
            {project.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.workActions}>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
          >
            <span>View Repository</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionLink}
            >
              <span>Live Demo</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function SelectedWorks() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="works" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>04 — SELECTED WORKS</span>
          <h2 className={styles.sectionTitle}>Featured Engineering</h2>
          <p className={styles.sectionSubtitle}>
            Detailed examinations of select artefacts from the collection.
          </p>
        </div>

        <motion.div
          className={styles.worksGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {featuredProjects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
