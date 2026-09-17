interface LogoProps {
  size?: number
  showWordmark?: boolean
  monochrome?: boolean
}

export default function Logo({ size = 40, showWordmark = true, monochrome = false }: LogoProps) {
  const clay = monochrome ? 'currentColor' : '#C4622D'
  const gold = monochrome ? 'currentColor' : '#C49B25'
  const dark = monochrome ? 'currentColor' : '#1A1108'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.3 }}>
      {/* Mark: a circle filling from bottom — ownership progress */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="EasyOwn mark"
      >
        {/* Outer ring */}
        <circle cx="20" cy="20" r="18" stroke={clay} strokeWidth="2" fill="none" />
        {/* Fill — 68% owned, represented as a sector */}
        <path
          d="M20 20 L20 2 A18 18 0 1 1 5.49 29.5 Z"
          fill={clay}
          opacity="0.15"
        />
        {/* Filled arc — 68% */}
        <path
          d="M20 2 A18 18 0 1 1 5.49 29.5"
          stroke={clay}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="20" cy="20" r="4" fill={gold} />
        {/* Progress notch at fill line */}
        <circle cx="5.49" cy="29.5" r="2.5" fill={clay} />
      </svg>

      {showWordmark && (
        <span
          style={{
            fontFamily: 'Fraunces, Georgia, serif',
            fontSize: size * 0.55,
            fontWeight: 700,
            color: dark,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Easy<span style={{ color: clay }}>Own</span>
        </span>
      )}
    </div>
  )
}
