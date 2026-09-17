import { useState } from 'react'
import { Clock, RefreshCw, Users, ArrowRight, AlertTriangle } from 'lucide-react'
import type { Page } from '../App'
import FillBar from '../components/FillBar'

interface Props {
  navigate: (p: Page) => void
}

const bundles = [
  {
    id: 1, name: 'Hisense 55" QLED TV', slots: 6, filled: 4, price: 189000, deadline: '2026-09-21',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&h=300&fit=crop&auto=format',
    slotBuyers: ['Adaeze O.', 'Emeka K.', 'Fatima B.', 'Chidi A.', null, null],
  },
  {
    id: 2, name: 'Sony PS5 Disc Edition + 2 Controllers', slots: 3, filled: 1, price: 650000, deadline: '2026-09-28',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&h=300&fit=crop&auto=format',
    slotBuyers: ['Nkechi P.', null, null],
  },
  {
    id: 3, name: 'Samsung Family Hub Refrigerator', slots: 4, filled: 4, price: 420000, deadline: '2026-09-19',
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=300&fit=crop&auto=format',
    slotBuyers: ['Obinna C.', 'Amara I.', 'Dele F.', 'Bisi O.'],
  },
]

function daysLeft(deadline: string) {
  const d = new Date(deadline)
  const now = new Date()
  return Math.max(0, Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
}

export default function BundleFill({ navigate }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const selected = bundles.find(b => b.id === selectedId)

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: 8 }}>
          Live bundles
        </h1>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)' }}>
          Slots fill independently. If a bundle expires unfilled, everyone gets a full refund.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginBottom: 32 }}>
        {bundles.map(bundle => {
          const days = daysLeft(bundle.deadline)
          const pct = Math.round((bundle.filled / bundle.slots) * 100)
          const full = bundle.filled === bundle.slots

          return (
            <div
              key={bundle.id}
              style={{
                background: 'var(--card)',
                border: `1px solid ${full ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 18,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.15s, border-color 0.15s',
              }}
              onClick={() => setSelectedId(bundle.id)}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'}
            >
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <img src={bundle.image} alt={bundle.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {full && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(196,98,45,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>Fully filled</span>
                  </div>
                )}
                {days <= 2 && !full && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: '#E86234', color: '#fff', padding: '4px 10px', borderRadius: 100, fontFamily: 'var(--font-outfit)', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <AlertTriangle size={10} /> {days}d left
                  </div>
                )}
              </div>

              <div style={{ padding: '18px 20px 22px' }}>
                <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 17, fontWeight: 700, color: 'var(--foreground)', marginBottom: 12, lineHeight: 1.2 }}>{bundle.name}</p>

                {/* Slot dots */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                  {bundle.slotBuyers.map((buyer, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1, height: 28, borderRadius: 6,
                        background: buyer ? 'var(--primary)' : 'var(--muted)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background 0.2s',
                      }}
                      title={buyer ?? 'Open slot'}
                    >
                      {buyer && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }} />}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Users size={13} color="var(--muted-foreground)" />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>
                      {bundle.filled}/{bundle.slots} slots filled
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={13} color={days <= 2 ? '#E86234' : 'var(--muted-foreground)'} />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: days <= 2 ? '#E86234' : 'var(--muted-foreground)', fontWeight: days <= 2 ? 600 : 400 }}>
                      {days} day{days !== 1 ? 's' : ''} left
                    </span>
                  </div>
                </div>

                <FillBar percent={pct} height={5} showLabel={false} color={full ? 'var(--primary)' : 'var(--accent)'} />

                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 20, fontWeight: 700, color: 'var(--foreground)' }}>₦{bundle.price.toLocaleString()}<span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 400, color: 'var(--muted-foreground)' }}>/slot</span></p>
                  {!full && (
                    <button style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '8px 16px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                      Join <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Refund guarantee panel */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: 'clamp(20px, 3vw, 32px)',
          display: 'flex',
          gap: 20,
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ background: 'rgba(196,155,37,0.12)', borderRadius: 12, padding: 14, flexShrink: 0 }}>
          <RefreshCw size={24} color="var(--accent)" />
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 18, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>
            Unfilled bundle? Full refund. No questions.
          </p>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
            If a bundle reaches its deadline without all slots filled, every contributor receives 100% of their payment back via Paystack within 24 hours. You don't need to ask for it.
          </p>
        </div>
      </div>

      {/* Bundle detail modal */}
      {selected && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(26,17,8,0.6)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}
          onClick={() => setSelectedId(null)}
        >
          <div
            style={{ background: 'var(--background)', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 600, maxHeight: '90vh', overflow: 'auto', padding: 'clamp(24px, 4vw, 40px)' }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 24, fontWeight: 700, color: 'var(--foreground)', marginBottom: 6 }}>{selected.name}</p>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 24 }}>{selected.filled} of {selected.slots} slots filled · {daysLeft(selected.deadline)} days until deadline</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
              {selected.slotBuyers.map((buyer, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 12, padding: '16px 14px', textAlign: 'center',
                    background: buyer ? 'var(--primary)' : 'var(--card)',
                    border: `1px solid ${buyer ? 'var(--primary)' : 'var(--border)'}`,
                  }}
                >
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, fontWeight: 700, color: buyer ? 'rgba(250,248,242,0.7)' : 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                    Slot {i + 1}
                  </p>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: buyer ? 'var(--primary-foreground)' : 'var(--muted-foreground)' }}>
                    {buyer ?? 'Open'}
                  </p>
                </div>
              ))}
            </div>

            {selected.filled < selected.slots && (
              <button
                style={{ width: '100%', background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '15px 24px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 16, fontWeight: 700, marginBottom: 12 }}
                onClick={() => setSelectedId(null)}
              >
                Claim a slot — ₦{selected.price.toLocaleString()}
              </button>
            )}
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', textAlign: 'center', lineHeight: 1.5 }}>
              If the bundle expires unfilled, your full payment comes back. No request needed.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
