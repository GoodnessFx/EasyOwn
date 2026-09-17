import { useState } from 'react'
import { Flame, CheckCircle2, Calendar, ArrowRight, CreditCard } from 'lucide-react'
import type { Page } from '../App'
import FillBar from '../components/FillBar'

interface Props {
  navigate: (p: Page) => void
}

const plans = [
  { id: 1, item: 'MacBook Air M3 — Midnight', amount: 80000, due: 'Oct 3, 2026', daysLeft: 16, streak: 7, pct: 68, target: 100 },
  { id: 2, item: 'Hisense 55" QLED TV', amount: 63000, due: 'Oct 1, 2026', daysLeft: 14, streak: 3, pct: 50, target: 100 },
]

const history = [
  { week: 'Sep 8–14', items: ['MacBook Air', 'Hisense TV'], status: 'done' },
  { week: 'Aug 11–17', items: ['MacBook Air', 'Hisense TV'], status: 'done' },
  { week: 'Jul 14–20', items: ['MacBook Air'], status: 'done' },
  { week: 'Jun 9–15', items: ['MacBook Air'], status: 'done' },
]

export default function Streak({ navigate }: Props) {
  const [paying, setPaying] = useState<number | null>(null)
  const [paid, setPaid] = useState<number[]>([])

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ background: 'rgba(232,98,52,0.12)', borderRadius: 12, padding: 12 }}>
            <Flame size={28} color="#E86234" />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', lineHeight: 1 }}>
              Keep your plan going
            </h1>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', marginTop: 4 }}>
              You're on a <strong style={{ color: '#E86234', fontFamily: 'var(--font-fraunces)' }}>7-week streak</strong>. Every payment fills what's yours faster.
            </p>
          </div>
        </div>
      </div>

      {/* Active plans */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
        {plans.map(plan => {
          const isPaid = paid.includes(plan.id)
          return (
            <div
              key={plan.id}
              style={{
                background: isPaid ? 'rgba(196,98,45,0.06)' : 'var(--card)',
                border: `1px solid ${isPaid ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 16,
                padding: 'clamp(20px, 3vw, 28px)',
                transition: 'border-color 0.2s, background 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: 'var(--foreground)', marginBottom: 4, lineHeight: 1.2 }}>{plan.item}</p>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Flame size={13} color="#E86234" />
                      <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: '#E86234', fontWeight: 600 }}>{plan.streak}wk streak</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={13} color="var(--muted-foreground)" />
                      <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>Due {plan.due}</span>
                    </div>
                  </div>
                </div>
                {isPaid ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(196,98,45,0.1)', borderRadius: 100, padding: '6px 14px' }}>
                    <CheckCircle2 size={16} color="var(--primary)" />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>Paid this period</span>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textAlign: 'right', marginBottom: 2 }}>in {plan.daysLeft} days</p>
                    <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--primary)', textAlign: 'right' }}>₦{plan.amount.toLocaleString()}</p>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 18 }}>
                <FillBar percent={isPaid ? Math.min(plan.pct + 10, 100) : plan.pct} height={7} label="Ownership progress" />
              </div>

              {!isPaid && (
                <button
                  onClick={() => setPaying(plan.id)}
                  style={{
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '12px 24px',
                    borderRadius: 'var(--radius)',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: 14,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    justifyContent: 'center',
                    maxWidth: 320,
                  }}
                >
                  <CreditCard size={16} /> Pay ₦{plan.amount.toLocaleString()} now
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Streak calendar */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(20px, 3vw, 28px)', marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 20, fontWeight: 700, color: 'var(--foreground)', marginBottom: 20 }}>Payment history</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {history.map((h, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i < history.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <CheckCircle2 size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 2 }}>{h.week}</p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)' }}>{h.items.join(' · ')}</p>
              </div>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, fontWeight: 600, color: 'var(--primary)', background: 'rgba(196,98,45,0.1)', borderRadius: 100, padding: '3px 10px' }}>Kept</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grace period note */}
      <div style={{ background: 'var(--muted)', borderRadius: 12, padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 5 }} />
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--foreground)' }}>Missed a payment?</strong> There's a 7-day grace period. Your plan continues — no penalties, no fees. We'll send a gentle reminder before anything changes.
        </p>
      </div>

      {/* Payment modal */}
      {paying !== null && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(26,17,8,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '0 16px', backdropFilter: 'blur(4px)' }}
          onClick={() => setPaying(null)}
        >
          <div
            style={{ background: 'var(--background)', borderRadius: 20, width: '100%', maxWidth: 440, padding: 'clamp(28px, 5vw, 40px)' }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 26, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8 }}>Make a payment</p>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 28 }}>
              {plans.find(p => p.id === paying)?.item}
            </p>

            <div style={{ background: 'var(--card)', borderRadius: 12, padding: '18px 20px', marginBottom: 20 }}>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 4 }}>Amount</p>
              <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 32, fontWeight: 700, color: 'var(--primary)' }}>
                ₦{plans.find(p => p.id === paying)?.amount.toLocaleString()}
              </p>
            </div>

            <div style={{ background: 'var(--card)', borderRadius: 12, padding: '14px 16px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CreditCard size={18} color="var(--muted-foreground)" />
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--foreground)' }}>Paystack</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--muted-foreground)' }}>•••• 4321</span>
            </div>

            <button
              onClick={() => { setPaid(prev => [...prev, paying!]); setPaying(null) }}
              style={{ width: '100%', background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '15px 24px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
            >
              Confirm payment <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
