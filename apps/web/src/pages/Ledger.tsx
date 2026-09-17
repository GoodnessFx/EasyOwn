import { useState } from 'react'
import { Shield, Download, ChevronDown, ChevronUp, CheckCircle2, Clock } from 'lucide-react'
import type { Page } from '../App'
import OwnershipRing from '../components/OwnershipRing'
import FillBar from '../components/FillBar'

interface Props {
  navigate: (p: Page) => void
}

const payments = [
  { id: 1, date: 'Sep 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260914-0081' },
  { id: 2, date: 'Aug 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260814-0059' },
  { id: 3, date: 'Jul 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260714-0043' },
  { id: 4, date: 'Jun 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260614-0031' },
  { id: 5, date: 'May 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260514-0018' },
  { id: 6, date: 'Apr 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260414-0009' },
  { id: 7, date: 'Mar 14, 2026', amount: 80000, pct: 10, status: 'confirmed', ref: 'EO-20260314-0002' },
]

export default function Ledger({ navigate }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const totalPaid = payments.filter(p => p.status === 'confirmed').reduce((s, p) => s + p.amount, 0)
  const pct = Math.round((totalPaid / 800000) * 100)

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 8 }}>Shared ledger — identical view for buyer and seller</p>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: 4 }}>
          MacBook Air M3 — Midnight
        </h1>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)' }}>Seller: TechVault Lagos &nbsp;·&nbsp; Started: Mar 14, 2026</p>
      </div>

      {/* Top summary */}
      <div
        style={{
          background: 'var(--foreground)',
          borderRadius: 20,
          padding: 'clamp(24px, 4vw, 40px)',
          marginBottom: 28,
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${pct}%`, background: 'linear-gradient(to top, rgba(196,98,45,0.12), transparent)' }} />
        <OwnershipRing percent={pct} size={180} label="ownership" sublabel={`${pct}% yours`} animate />
        <div style={{ flex: 1, minWidth: 220 }}>
          {[
            { label: 'Total item value', val: '₦800,000' },
            { label: 'You have paid', val: `₦${totalPaid.toLocaleString()}` },
            { label: 'Remaining to own', val: `₦${(800000 - totalPaid).toLocaleString()}` },
            { label: 'Payments made', val: `${payments.filter(p => p.status === 'confirmed').length} of 10` },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 14, borderBottom: '1px solid rgba(246,242,234,0.1)', gap: 16 }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(246,242,234,0.55)' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 18, fontWeight: 700, color: 'var(--background)' }}>{row.val}</span>
            </div>
          ))}
          <div style={{ marginTop: 4 }}>
            <FillBar percent={pct} height={6} showLabel={false} animate color="var(--primary)" />
          </div>
        </div>
      </div>

      {/* Verified notice */}
      <div
        style={{
          background: 'rgba(196,98,45,0.07)',
          border: '1px solid rgba(196,98,45,0.2)',
          borderRadius: 12,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 28,
        }}
      >
        <Shield size={18} color="var(--primary)" />
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--foreground)', lineHeight: 1.5, flex: 1 }}>
          This ledger is tamper-evident. Every record here has been independently verifiable since the moment it was created.{' '}
          <button onClick={() => navigate('explorer')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, padding: 0 }}>
            Verify a payment →
          </button>
        </p>
      </div>

      {/* Payment history */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)' }}>Payment history</h2>
        <button
          style={{ background: 'var(--card)', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px 14px', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted-foreground)', fontFamily: 'var(--font-outfit)', fontSize: 13 }}
        >
          <Download size={14} /> Export
        </button>
      </div>

      <div style={{ border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
        {payments.map((p, i) => (
          <div key={p.id}>
            <button
              onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
              style={{
                width: '100%',
                background: expandedId === p.id ? 'var(--card)' : 'var(--background)',
                border: 'none',
                cursor: 'pointer',
                padding: 'clamp(14px, 2vw, 20px) clamp(16px, 3vw, 24px)',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                borderBottom: i < payments.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'left',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ background: 'rgba(196,98,45,0.1)', borderRadius: 10, padding: 10, flexShrink: 0 }}>
                <CheckCircle2 size={18} color="var(--primary)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 2 }}>Payment {payments.length - i} of 10</p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>{p.date}</p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 18, fontWeight: 700, color: 'var(--foreground)', marginBottom: 2 }}>₦{p.amount.toLocaleString()}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} />
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--primary)', fontWeight: 600 }}>Confirmed</span>
                </div>
              </div>
              <div style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}>
                {expandedId === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {expandedId === p.id && (
              <div style={{ padding: 'clamp(16px, 2vw, 24px)', borderBottom: i < payments.length - 1 ? '1px solid var(--border)' : 'none', background: 'var(--card)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
                  {[
                    { label: 'Reference', val: p.ref },
                    { label: 'Ownership after', val: `${(i + 1) * 10}%` },
                    { label: 'Method', val: 'Paystack' },
                    { label: 'Status', val: 'Confirmed & locked' },
                  ].map(row => (
                    <div key={row.label}>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{row.label}</p>
                      <p style={{ fontFamily: row.label === 'Reference' ? 'var(--font-dm-mono)' : 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{row.val}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate('explorer')}
                  style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px 16px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Shield size={14} /> Verify this payment
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Upcoming */}
        {[8, 9, 10].map(n => (
          <div key={n} style={{ padding: 'clamp(14px, 2vw, 20px) clamp(16px, 3vw, 24px)', display: 'flex', alignItems: 'center', gap: 16, borderTop: '1px solid var(--border)', opacity: 0.5 }}>
            <div style={{ background: 'var(--muted)', borderRadius: 10, padding: 10, flexShrink: 0 }}>
              <Clock size={18} color="var(--muted-foreground)" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 2 }}>Payment {n} of 10</p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>Upcoming</p>
            </div>
            <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 18, fontWeight: 700, color: 'var(--muted-foreground)' }}>₦80,000</p>
          </div>
        ))}
      </div>
    </div>
  )
}
