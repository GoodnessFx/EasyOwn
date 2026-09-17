import { useEffect, useRef, useState } from 'react'

interface FillBarProps {
  percent: number
  label?: string
  height?: number
  showLabel?: boolean
  color?: string
  animate?: boolean
}

export default function FillBar({
  percent,
  label,
  height = 8,
  showLabel = true,
  color = 'var(--primary)',
  animate = true,
}: FillBarProps) {
  const [displayed, setDisplayed] = useState(animate ? 0 : percent)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (!animate) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let start: number | null = null
          const duration = 1200
          const step = (timestamp: number) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setDisplayed(eased * percent)
            if (progress < 1) requestAnimationFrame(step)
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
    <div ref={ref}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {label && (
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)', fontFamily: 'var(--font-outfit)' }}>
              {label}
            </span>
          )}
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color,
              fontFamily: 'var(--font-fraunces)',
            }}
          >
            {Math.round(displayed)}%
          </span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          background: 'var(--muted)',
          borderRadius: height / 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${displayed}%`,
            background: color,
            borderRadius: height / 2,
            transition: animate ? 'none' : 'width 0.4s ease',
            position: 'relative',
          }}
        >
          {/* Shimmer */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              width: 24,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3))',
              borderRadius: height / 2,
            }}
          />
        </div>
      </div>
    </div>
  )
}
