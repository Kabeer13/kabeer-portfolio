import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import siteConfig from '@/data/siteConfig'
import type { Project } from '@/data/siteConfig'
import ProjectDossier from './ProjectDossier'
import styles from './GarageSection.module.css'

const CATEGORIES = [
  { id: 'all', label: 'All Garages' },
  { id: 'ai', label: 'AI & Vision' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'web', label: 'Web Applications' },
  { id: 'tool', label: 'Cloud & Tools' },
] as const

type CategoryId = (typeof CATEGORIES)[number]['id']

export default function GarageSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all')
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [openBayId, setOpenBayId] = useState<string | null>(null)
  const prefersReduced = useReducedMotion()

  const filteredProjects = useMemo(() => {
    return siteConfig.projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [searchQuery, selectedCategory])

  const handleBayClick = (project: Project) => {
    if (openBayId === project.id) {
      // Toggle shut or open full dossier
      setActiveProject(project)
    } else {
      setOpenBayId(project.id)
      if (prefersReduced) {
        setActiveProject(project)
      } else {
        // After bay door short lift animation, open dossier
        setTimeout(() => {
          setActiveProject(project)
        }, 550)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleBayClick(project)
    }
  }

  return (
    <section id="garage" className={styles.section} aria-label="Architectural Garage Collection">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <p className={styles.sectionTag}>02 — THE GARAGE</p>
          <h2 className={styles.sectionTitle}>The Private Collection</h2>
          <p className={styles.sectionSubtitle}>
            Interactive architectural vaults holding collectible engineering artefacts. Tap any garage bay to lift the shutter.
          </p>
        </div>

        {/* Controls: Search and Category Filters */}
        <div className={styles.controls}>
          <div className={styles.searchWrapper}>
            <span className={styles.searchIcon} aria-hidden="true">
              🔍
            </span>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search garage archive by machine, stack, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search garage collection"
            />
          </div>

          <div className={styles.filters} role="group" aria-label="Filter garage bays by category">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={
                  selectedCategory === category.id
                    ? styles.filterButtonActive
                    : styles.filterButton
                }
                onClick={() => setSelectedCategory(category.id)}
                aria-pressed={selectedCategory === category.id}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className={styles.catalogueMeta}>
          <p className={styles.resultsCount}>
            ARCHITECTURAL BAYS: {filteredProjects.length} OF {siteConfig.projects.length} PREPARED
          </p>
          <span className={styles.systemStatus}>HYDRAULICS // ONLINE</span>
        </div>

        {/* Garage Bay Grid */}
        <div className={styles.projectGrid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                const isOpen = openBayId === project.id
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`${styles.garageBay} ${isOpen ? styles.bayOpen : ''}`}
                    onClick={() => handleBayClick(project)}
                    onKeyDown={(e) => handleKeyDown(e, project)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Garage Bay ${project.number}: ${project.title}. Tap to lift shutter and inspect dossier.`}
                  >
                    {/* Architectural Keystone Header / Heavy Beam */}
                    <div className={styles.bayHeaderBeam}>
                      <div className={styles.chainHoistHanger} aria-hidden="true">
                        <span className={styles.chainLink} />
                        <span className={styles.chainLink} />
                        <span className={styles.chainLink} />
                      </div>

                      <div className={styles.engravedPlate}>
                        <span className={styles.engravedLabel}>BAY</span>
                        <span className={styles.engravedNumber}>{project.number}</span>
                      </div>

                      <div className={styles.chainHoistHanger} aria-hidden="true">
                        <span className={styles.chainLink} />
                        <span className={styles.chainLink} />
                        <span className={styles.chainLink} />
                      </div>
                    </div>

                    {/* Garage Interior & Rolling Shutter Portal */}
                    <div className={styles.garagePortal}>
                      {/* Interior Chamber (Revealed when door lifts or glow activates) */}
                      <div className={styles.chamberInterior}>
                        <div className={styles.interiorSpotlight} aria-hidden="true" />
                        
                        <div className={styles.interiorData}>
                          <div className={styles.interiorBadge}>
                            <span className={styles.specIcon}>⚡</span>
                            {project.category.toUpperCase()} SPECIMEN
                          </div>

                          <h3 className={styles.interiorTitle}>{project.title}</h3>
                          <p className={styles.interiorSubtitle}>{project.subtitle}</p>
                          <p className={styles.interiorDescription}>{project.description}</p>

                          <div className={styles.interiorTechRow}>
                            {project.technologies.map((t) => (
                              <span key={t} className={styles.interiorTechBadge}>{t}</span>
                            ))}
                          </div>

                          <div className={styles.interiorActions}>
                            <span className={styles.dossierPrompt}>
                              CLICK FOR COMPLETE DOSSIER & REPO →
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Mechanical Slotted Black Metal Garage Door */}
                      <div className={`${styles.garageDoor} ${isOpen ? styles.doorLifted : ''}`} aria-hidden="true">
                        {/* Shutter Slats with Antique Gold Rivets */}
                        <div className={styles.slatContainer}>
                          <div className={styles.slat}><span className={styles.rivet} /><span className={styles.rivet} /></div>
                          <div className={styles.slat}><span className={styles.rivet} /><span className={styles.rivet} /></div>
                          <div className={styles.slat}>
                            <div className={styles.doorEmblem}>
                              <span className={styles.doorNumberText}>ARTEFACT {project.number}</span>
                              <span className={styles.doorLockMechanism}>◆ LOCKED ◆</span>
                            </div>
                          </div>
                          <div className={styles.slat}><span className={styles.rivet} /><span className={styles.rivet} /></div>
                          <div className={styles.slat}><span className={styles.rivet} /><span className={styles.rivet} /></div>
                          <div className={styles.slat}>
                            <span className={styles.doorTitlePreview}>{project.title}</span>
                          </div>
                          <div className={styles.slat}><span className={styles.rivet} /><span className={styles.rivet} /></div>
                          <div className={styles.slat}>
                            <span className={styles.doorLiftInstruction}>[ TAP TO LIFT SHUTTER ]</span>
                          </div>
                        </div>

                        {/* Heavy Gold Bottom Lip of Shutter */}
                        <div className={styles.doorBottomLip}>
                          <span className={styles.lipHandle} />
                        </div>
                      </div>
                    </div>

                    {/* Garage Bay Floor & Warning Perimeter */}
                    <div className={styles.bayThreshold}>
                      <span className={styles.warningStripe} />
                      <span className={styles.bayFootprint}>VAULT UNIT {project.number} · LEVEL 01</span>
                      {project.featured && (
                        <span className={styles.flagshipTag}>★ FLAGSHIP</span>
                      )}
                    </div>
                  </motion.div>
                )
              })
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon} aria-hidden="true">
                  ⚙
                </div>
                <p className={styles.emptyText}>
                  No machine found matching your criteria. Reset filters to inspect the full vault.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Dossier Modal */}
      <ProjectDossier
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  )
}
