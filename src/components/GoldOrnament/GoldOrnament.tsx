import styles from './GoldOrnament.module.css'

interface GoldOrnamentProps {
  variant: 'corner-frame' | 'horizontal-line' | 'section-divider' | 'chain-border'
  className?: string
}

export default function GoldOrnament({ variant, className = '' }: GoldOrnamentProps) {
  const combinedClass = `${styles[variant]} ${className}`.trim()

  switch (variant) {
    case 'corner-frame':
      return (
        <div className={combinedClass} aria-hidden="true">
          <span className={styles.corner} data-position="top-left" />
          <span className={styles.corner} data-position="top-right" />
          <span className={styles.corner} data-position="bottom-left" />
          <span className={styles.corner} data-position="bottom-right" />
        </div>
      )

    case 'horizontal-line':
      return (
        <div className={combinedClass} aria-hidden="true">
          <div className={styles.line} />
          <div className={styles.diamond} />
        </div>
      )

    case 'section-divider':
    case 'chain-border':
      return (
        <div className={combinedClass} aria-hidden="true">
          <svg
            className={styles.chainDividerSvg}
            viewBox="0 0 900 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grecaGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C6A15B" stopOpacity="0" />
                <stop offset="20%" stopColor="#C6A15B" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#FFF2D6" stopOpacity="0.95" />
                <stop offset="80%" stopColor="#C6A15B" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="grecaShade" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF4D4" />
                <stop offset="50%" stopColor="#C6A15B" />
                <stop offset="100%" stopColor="#574025" />
              </linearGradient>

              {/* Exact Horizontal Versace Greca (Greek Key) Interlocking Unit */}
              <g id="versaceGrecaUnit">
                {/* Outer Link */}
                <rect
                  x="0"
                  y="10"
                  width="30"
                  height="22"
                  rx="3"
                  fill="#0B0A08"
                  stroke="url(#grecaShade)"
                  strokeWidth="1.8"
                />
                {/* Inscribed Classic Greca Fret */}
                <path
                  d="M6 24 H24 V15 H12 V19 H18"
                  fill="none"
                  stroke="url(#grecaShade)"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
                {/* Specular link connector */}
                <line x1="28" y1="21" x2="34" y2="21" stroke="#FFF5DC" strokeWidth="2.5" />
              </g>
            </defs>

            {/* Left Fine Hairline & Stepped Taper */}
            <line x1="20" y1="21" x2="230" y2="21" stroke="url(#grecaGold)" strokeWidth="1" />
            <polygon points="90,21 94,17 98,21 94,25" fill="#C6A15B" opacity="0.6" />
            <polygon points="170,21 175,16 180,21 175,26" fill="#C6A15B" opacity="0.8" />

            {/* Left Greca Ribbon (4 Units) */}
            <g transform="translate(230, 0)">
              <use href="#versaceGrecaUnit" x="0" />
              <use href="#versaceGrecaUnit" x="34" />
              <use href="#versaceGrecaUnit" x="68" />
              <use href="#versaceGrecaUnit" x="102" />
              <use href="#versaceGrecaUnit" x="136" />
            </g>

            {/* Centerpiece Baroque Medallion with Greek Key Ring */}
            <g transform="translate(450, 21)">
              {/* Outer halo */}
              <circle cx="0" cy="0" r="18" stroke="url(#grecaShade)" strokeWidth="1.4" opacity="0.85" />
              <circle cx="0" cy="0" r="15" stroke="url(#grecaShade)" strokeWidth="0.9" strokeDasharray="2 3" opacity="0.7" />
              <circle cx="0" cy="0" r="12" fill="#090807" stroke="url(#grecaShade)" strokeWidth="1.2" />
              
              {/* Center Diamond Rosette */}
              <polygon points="0,-7 7,0 0,7 -7,0" fill="url(#grecaShade)" />
              <circle cx="0" cy="0" r="2" fill="#FFF" />
              
              {/* Cardinal Ticks */}
              <line x1="0" y1="-18" x2="0" y2="-13" stroke="#FFF2D6" strokeWidth="1.2" />
              <line x1="0" y1="13" x2="0" y2="18" stroke="#FFF2D6" strokeWidth="1.2" />
              <line x1="-18" y1="0" x2="-13" y2="0" stroke="#FFF2D6" strokeWidth="1.2" />
              <line x1="13" y1="0" x2="18" y2="0" stroke="#FFF2D6" strokeWidth="1.2" />
            </g>

            {/* Right Greca Ribbon (4 Units) */}
            <g transform="translate(485, 0)">
              <use href="#versaceGrecaUnit" x="0" />
              <use href="#versaceGrecaUnit" x="34" />
              <use href="#versaceGrecaUnit" x="68" />
              <use href="#versaceGrecaUnit" x="102" />
              <use href="#versaceGrecaUnit" x="136" />
            </g>

            {/* Right Fine Hairline & Stepped Taper */}
            <line x1="670" y1="21" x2="880" y2="21" stroke="url(#grecaGold)" strokeWidth="1" />
            <polygon points="720,21 725,16 730,21 725,26" fill="#C6A15B" opacity="0.8" />
            <polygon points="800,21 804,17 808,21 804,25" fill="#C6A15B" opacity="0.6" />
          </svg>
        </div>
      )

    default:
      return null
  }
}
