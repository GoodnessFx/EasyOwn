import { useState } from 'react'
import { Package, Users, Flame, Bell, ChevronRight, TrendingUp, Clock } from 'lucide-react'
import type { Page } from '../App'
import OwnershipRing from '../components/OwnershipRing'
import FillBar from '../components/FillBar'

interface Props {
  navigate: (p: Page) => void
}

const activeItems = [
  { id: 1, name: 'MacBook Air M3 — Midnight', seller: 'TechVault Lagos', paid: 544000, total: 800000, pct: 68, dueDate: 'Oct 3', dueDays: 16, streak: 7 },
  { id: 2, name: 'Hisense 55" QLED TV', seller: 'HomeElite Abuja', paid: 189000, total: 378000, pct: 50, dueDate: 'Oct 1', dueDays: 14, streak: 3 },
]

const recentActivity = [
  { id: 1, label: 'Payment received', item: 'MacBook Air M3', amount: '+₦80,000', time: '2 days ago', type: 'in' },
  { id: 2, label: 'Slot filled', item: 'Hisense Bundle #18', amount: '4/6 slots', time: '5 days ago', type: 'bundle' },
  { id: 3, label: 'Payment received', item: 'MacBook Air M3', amount: '+₦80,000', time: '33 days ago', type: 'in' },
]

export default function Dashboard({ navigate }: Props) {
  const [tab, setTab] = useState<'buying' | 'selling'>('buying')
  const totalPaid = activeItems.reduce((s, i) => s + i.paid, 0)

  return (
    <div
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)',
      }}
    >
      {/* Top greeting */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 32,
          marginBottom: 'clamp(28px, 4vw, 48px)',
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 8 }}>
            Thursday, 17 Sep 2026
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Your ownership<br />
            <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>is growing.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)' }}>
            You've committed <strong style={{ color: 'var(--foreground)', fontFamily: 'var(--font-fraunces)' }}>₦{totalPaid.toLocaleString()}</strong> toward 2 items this month.
          </p>
        </div>

        {/* Stat row */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Total invested', val: '₦733,000', icon: <TrendingUp size={16} color="var(--primary)" /> },
            { label: 'Active plans', val: '2', icon: <Package size={16} color="var(--accent)" /> },
            { label: 'Streak', val: '7 wks', icon: <Flame size={16} color="#E86234" /> },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 120px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '16px 18px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                {stat.icon}
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 500 }}>{stat.label}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1 }}>
                {stat.val}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
        }}
      >
        {/* LEFT: Active plans */}
        <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
          {/* Tab switcher */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: 'var(--muted)', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {(['buying', 'selling'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? 'var(--background)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '7px 20px',
                  borderRadius: 8,
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 14,
                  fontWeight: tab === t ? 600 : 400,
                  color: tab === t ? 'var(--foreground)' : 'var(--muted-foreground)',
                  transition: 'all 0.15s',
                  boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {tab === 'buying' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => navigate('ledger')}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 16,
                    padding: 'clamp(18px, 2.5vw, 28px)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'border-color 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px, 2vw, 20px)', fontWeight: 700, color: 'var(--foreground)', marginBottom: 4 }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>
                        Seller: {item.seller}
                      </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {item.streak > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(232,98,52,0.1)', borderRadius: 100, padding: '4px 10px' }}>
                          <Flame size={12} color="#E86234" />
                          <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, fontWeight: 600, color: '#E86234' }}>
                            {item.streak}wk streak
                          </span>
                        </div>
                      )}
                      <ChevronRight size={18} color="var(--muted-foreground)" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 20 }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Paid</p>
                      <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 18, fontWeight: 700, color: 'var(--foreground)' }}>₦{item.paid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Remaining</p>
                      <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 18, fontWeight: 700, color: 'var(--foreground)' }}>₦{(item.total - item.paid).toLocaleString()}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Next</p>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{item.dueDate}</p>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)' }}>in {item.dueDays} days</p>
                    </div>
                  </div>

                  <FillBar percent={item.pct} height={6} label="Ownership" />
                </button>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: 'var(--card)',
                border: '1px dashed var(--border)',
                borderRadius: 16,
                padding: 40,
                textAlign: 'center',
              }}
            >
              <Package size={40} color="var(--muted-foreground)" style={{ margin: '0 auto 16px' }} />
              <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 20, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>No listings yet</p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 24 }}>
                Create your first listing to start receiving installment payments.
              </p>
              <button
                onClick={() => navigate('seller')}
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '11px 24px',
                  borderRadius: 'var(--radius)',
                  fontFamily: 'var(--font-outfit)',
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Create a listing
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Ownership ring hero + activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Hero ring */}
          <div
            style={{
              background: 'var(--foreground)',
              borderRadius: 20,
              padding: 28,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '68%',
                background: 'linear-gradient(to top, rgba(196,98,45,0.12), transparent)',
                pointerEvents: 'none',
              }}
            />
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, fontWeight: 600, color: 'rgba(246,242,234,0.5)', textTransform: 'uppercase', letterSpacing: '0.07em', alignSelf: 'flex-start' }}>
              Top item
            </p>
            <OwnershipRing percent={68} size={160} label="MacBook Air M3" sublabel="owned" animate />
            <button
              onClick={() => navigate('streak')}
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 22px',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 14,
                fontWeight: 600,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                position: 'relative',
              }}
            >
              <Clock size={15} /> Keep your plan going
            </button>
          </div>

          {/* Recent activity */}
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bell size={15} color="var(--muted-foreground)" />
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>Recent</p>
              </div>
            </div>
            {recentActivity.map((act, i) => (
              <div
                key={act.id}
                style={{
                  padding: '14px 20px',
                  borderBottom: i < recentActivity.length - 1 ? '1px solid var(--border)' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 2 }}>{act.label}</p>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.item}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 14, fontWeight: 700, color: act.type === 'in' ? 'var(--primary)' : 'var(--accent)' }}>{act.amount}</p>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)' }}>{act.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { label: 'Browse items', page: 'listings' as Page, icon: <Package size={16} color="var(--primary)" /> },
              { label: 'Group buy', page: 'bundle' as Page, icon: <Users size={16} color="var(--accent)" /> },
            ].map(l => (
              <button
                key={l.page}
                onClick={() => navigate(l.page)}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)')}
              >
                {l.icon}
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{l.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
