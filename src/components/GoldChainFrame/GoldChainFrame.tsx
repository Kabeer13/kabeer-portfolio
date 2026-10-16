import styles from './GoldChainFrame.module.css'

export default function GoldChainFrame() {
  return (
    <div className={styles.frameContainer} aria-hidden="true">
      {/* SVG Definitions for Exact Versace Greca Chain Links & Metallic Shading */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="grecaGoldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF5DC" />
            <stop offset="20%" stopColor="#DFBF7A" />
            <stop offset="45%" stopColor="#C6A15B" />
            <stop offset="70%" stopColor="#876A28" />
            <stop offset="100%" stopColor="#3D2E10" />
          </linearGradient>

          <linearGradient id="grecaGoldHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#574025" />
            <stop offset="50%" stopColor="#FFF9E6" />
            <stop offset="100%" stopColor="#574025" />
          </linearGradient>

          {/* 
            Vertical Repeating Greca Chain Unit:
            Features the distinctive interlocking link flanked by continuous stepped Greek Key (Greca) frets
            Width: 20px, Height: 36px
          */}
          <pattern
            id="versaceGrecaPatternV"
            width="20"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            {/* Outer Link Outline */}
            <rect
              x="2"
              y="2"
              width="16"
              height="24"
              rx="4"
              fill="#090807"
              stroke="url(#grecaGoldMetal)"
              strokeWidth="1.8"
            />
            {/* Inner Metallic Highlight Bevel */}
            <rect
              x="3.5"
              y="3.5"
              width="13"
              height="21"
              rx="2.5"
              fill="none"
              stroke="#FFF"
              strokeWidth="0.5"
              opacity="0.35"
            />
            {/* Exact Classical Greek Key (Greca) Meander Inscribed Inside Link */}
            <path
              d="M5 8 H15 V14 H9 V11 H12"
              fill="none"
              stroke="url(#grecaGoldMetal)"
              strokeWidth="1.3"
              strokeLinecap="square"
            />
            {/* Interlocking Link Connector */}
            <rect
              x="5"
              y="20"
              width="10"
              height="14"
              rx="3"
              fill="#090807"
              stroke="url(#grecaGoldMetal)"
              strokeWidth="1.6"
            />
            <path
              d="M7 23 H13 V27 H10"
              fill="none"
              stroke="url(#grecaGoldMetal)"
              strokeWidth="1"
              strokeLinecap="square"
            />
          </pattern>
        </defs>
      </svg>

      {/* Left Lateral Greca Chain Border */}
      <div className={`${styles.leftChain} ${styles.shimmering}`}>
        <svg width="20" height="100%">
          <rect width="20" height="100%" fill="url(#versaceGrecaPatternV)" />
        </svg>
      </div>

      {/* Right Lateral Greca Chain Border */}
      <div className={`${styles.rightChain} ${styles.shimmering}`}>
        <svg width="20" height="100%">
          <rect width="20" height="100%" fill="url(#versaceGrecaPatternV)" />
        </svg>
      </div>
    </div>
  )
}
