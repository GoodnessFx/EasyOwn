import { useEffect, useRef, useState } from 'react'

interface OwnershipRingProps {
  percent: number
  size?: number
  strokeWidth?: number
  label?: string
  sublabel?: string
  animate?: boolean
}

export default function OwnershipRing({
  percent,
  size = 200,
  strokeWidth = 14,
  label,
  sublabel,
  animate = true,
}: OwnershipRingProps) {
  const [displayed, setDisplayed] = useState(animate ? 0 : percent)
  const ref = useRef<SVGSVGElement>(null)
  const started = useRef(false)

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const gap = circumference * (1 - displayed / 100)

  useEffect(() => {
    if (!animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start: number | null = null
          const duration = 1400
          const step = (ts: number) => {
            if (!start) start = ts
            const t = Math.min((ts - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 4)
            setDisplayed(eased * percent)
            if (t < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [animate, percent])

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={strokeWidth}
        />
        {/* Fill arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--primary)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={gap}
          strokeLinecap="round"
          style={{ transition: animate ? 'none' : 'stroke-dashoffset 0.4s ease' }}
        />
        {/* Gold accent at fill end */}
        {displayed > 2 && (
          <circle
            cx={size / 2 + radius * Math.cos((2 * Math.PI * displayed) / 100 - Math.PI / 2)}
            cy={size / 2 + radius * Math.sin((2 * Math.PI * displayed) / 100 - Math.PI / 2)}
            r={strokeWidth / 2 + 1}
            fill="var(--accent)"
          />
        )}
      </svg>

      {/* Center content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontSize: size * 0.22,
            fontWeight: 700,
            color: 'var(--primary)',
            lineHeight: 1,
          }}
        >
          {Math.round(displayed)}%
        </span>
        {label && (
          <span
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: size * 0.075,
              color: 'var(--muted-foreground)',
              fontWeight: 500,
              textAlign: 'center',
              padding: '0 12px',
            }}
          >
            {label}
          </span>
        )}
        {sublabel && (
          <span
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: size * 0.065,
              color: 'var(--accent)',
              fontWeight: 600,
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  )
}
