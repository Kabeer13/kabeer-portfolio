/*
 * AUREO — The Private Collection
 * Centralised content configuration
 * 
 * Edit this file to update all text, links, and project data.
 * No other files need to change for content updates.
 */

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  problem: string
  approach: string
  technologies: string[]
  category: 'web' | 'data' | 'mobile' | 'ai' | 'tool' | 'other'
  githubUrl: string
  liveUrl?: string
  featured: boolean
  year: string
}

export interface SiteConfig {
  owner: {
    name: string
    title: string
    github: string
    githubUsername: string
    email: string
    location: string
    university: string
    degree: string
    bio: string[]
    interests: string[]
    portraitPath: string
  }
  projects: Project[]
  skills: {
    languages: string[]
    frameworks: string[]
    tools: string[]
    interests: string[]
  }
  social: {
    github: string
    email: string
    linkedin?: string
  }
}

const siteConfig: SiteConfig = {
  owner: {
    name: 'KABEER',
    title: 'Developer & Engineer',
    github: 'https://github.com/Kabeer13',
    githubUsername: 'Kabeer13',
    email: 'kabeerbilal13@gmail.com', // Add your email
    location: 'Bombay',
    university: 'NMIMS', // Add your university name
    degree: 'Data Science',
    bio: [
      'I build things that work — from full-stack web applications to machine learning pipelines and mobile apps.',
      'I\'m drawn to projects that sit at the intersection of engineering precision and real-world impact. Whether it\'s a number plate recognition system or an Android fitness tracker, I care about the craft behind the code.',
      'Currently studying Data Science and sharpening my skills across Python, Java, React, and cloud deployment.',
    ],
    interests: [
      'Software Engineering',
      'Machine Learning',
      'Full-Stack Development',
      'Mobile Development',
      'Data Science',
      'Cloud Computing',
    ],
    portraitPath: `${import.meta.env.BASE_URL}images/kabeer-portrait.jpg`,
  },

  projects: [
    {
      id: 'plate-lookup',
      number: '001',
      title: 'PlateLookup',
      subtitle: 'Intelligent Number Plate Recognition',
      description:
        'A real-time number plate recognition system built with computer vision and machine learning. Identifies and processes vehicle registration plates from images and video feeds with high accuracy.',
      problem:
        'Manual number plate reading is slow and error-prone. Automated recognition enables security, parking management, and traffic enforcement at scale.',
      approach:
        'Built using Python with OpenCV for image processing and a trained ML model for character recognition. Deployed as a Streamlit web application for easy access and demonstration.',
      technologies: ['Python', 'OpenCV', 'Machine Learning', 'Streamlit', 'NumPy'],
      category: 'ai',
      githubUrl: 'https://github.com/Kabeer13/PlateLookup',
      featured: true,
      year: '2026',
    },
    {
      id: 'mtwo-fitness',
      number: '002',
      title: 'M-TWO',
      subtitle: 'Android Fitness Companion',
      description:
        'A native Android fitness tracking application built with Kotlin. Features workout logging, progress tracking, and a clean material design interface for daily fitness management.',
      problem:
        'Many fitness apps are bloated with features most people never use. M-TWO focuses on what matters — tracking workouts simply and effectively.',
      approach:
        'Developed natively in Kotlin using Android Studio with modern Android architecture components. Implements local data persistence and Material Design guidelines for a polished user experience.',
      technologies: ['Kotlin', 'Android Studio', 'Material Design', 'SQLite'],
      category: 'mobile',
      githubUrl: 'https://github.com/Kabeer13/mtwo',
      featured: true,
      year: '2026',
    },
    {
      id: 'deployment-app',
      number: '003',
      title: 'Deployment Pipeline',
      subtitle: 'Cloud Application Deployment',
      description:
        'A web application deployment system built with Python. Handles application packaging, configuration, and deployment to cloud infrastructure.',
      problem:
        'Setting up reliable deployment workflows from scratch requires extensive configuration and scripting.',
      approach:
        'Python-based deployment system using Flask for the web interface, with integration to cloud services for hosting and continuous deployment.',
      technologies: ['Python', 'Flask', 'Cloud Deployment', 'Streamlit'],
      category: 'tool',
      githubUrl: 'https://github.com/Kabeer13/Deployment',
      featured: false,
      year: '2026',
    },
    {
      id: 'kbc-quiz',
      number: '004',
      title: 'KBC',
      subtitle: 'Interactive Quiz Engine',
      description:
        'An interactive quiz application inspired by the popular game show format. Features timed questions, lifelines, and progressive difficulty scaling.',
      problem:
        'Building engaging educational quiz experiences that feel like real game shows.',
      approach:
        'Built with Python featuring a rich interactive interface, question management system, and scoring mechanics that capture the excitement of a live quiz show.',
      technologies: ['Python', 'Streamlit', 'Game Logic'],
      category: 'web',
      githubUrl: 'https://github.com/Kabeer13/kbc',
      featured: false,
      year: '2026',
    },
    {
      id: 'render-app',
      number: '005',
      title: 'Render',
      subtitle: 'Web Application Framework',
      description:
        'A web application built with Flask, featuring server-side rendering, API endpoints, and database integration for dynamic content management.',
      problem:
        'Creating maintainable web applications with clean architecture and proper deployment practices.',
      approach:
        'Flask-based web application following MVC patterns with proper route handling, template rendering, and database integration. Deployed for production use.',
      technologies: ['Python', 'Flask', 'HTML/CSS', 'SQLite', 'Deployment'],
      category: 'web',
      githubUrl: 'https://github.com/Kabeer13/render',
      featured: false,
      year: '2026',
    },
  ],

  skills: {
    languages: ['Python', 'Java', 'Kotlin', 'JavaScript', 'TypeScript', 'HTML/CSS', 'SQL'],
    frameworks: ['React', 'Flask', 'Streamlit', 'Android SDK', 'OpenCV', 'NumPy', 'Pandas'],
    tools: ['Git', 'GitHub', 'VS Code', 'Android Studio', 'Docker', 'Vite', 'Figma'],
    interests: [
      'Machine Learning & Computer Vision',
      'Mobile App Development',
      'Full-Stack Web Engineering',
      'Cloud Infrastructure',
      'UI/UX Design',
      'Open Source',
    ],
  },

  social: {
    github: 'https://github.com/Kabeer13',
    email: '', // Add your email
  },
}

export default siteConfig
