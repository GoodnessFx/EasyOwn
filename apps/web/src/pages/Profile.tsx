import { useState, type ReactNode } from 'react'
import { User, Bell, CreditCard, HelpCircle, Star, Shield, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

type Tab = 'account' | 'payments' | 'notifications' | 'seller' | 'howto'

export default function Profile({ navigate }: Props) {
  const [tab, setTab] = useState<Tab>('account')
  const [notifications, setNotifications] = useState({
    paymentReminder: true,
    bundleFill: true,
    sellerUpdate: false,
    weeklyDigest: true,
  })

  const tabs: { key: Tab; label: string; icon: ReactNode }[] = [
    { key: 'account', label: 'Account', icon: <User size={16} /> },
    { key: 'payments', label: 'Payments', icon: <CreditCard size={16} /> },
    { key: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { key: 'seller', label: 'Seller stats', icon: <Star size={16} /> },
    { key: 'howto', label: 'How EasyOwn works', icon: <HelpCircle size={16} /> },
  ]

  const Toggle = ({ on, onChange }: { on: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: on ? 'var(--primary)' : 'var(--muted)',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.2s', flexShrink: 0,
      }}
      aria-pressed={on}
    >
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  )

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 36, flexWrap: 'wrap' }}>
        <div
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 28, fontWeight: 700, color: '#fff' }}>A</span>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--foreground)', letterSpacing: '-0.02em', marginBottom: 4 }}>
            Adaeze Okonkwo
          </h1>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)' }}>adaeze@email.com · Member since Jan 2026</p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(196,98,45,0.08)', borderRadius: 100, padding: '8px 16px' }}>
          <Shield size={16} color="var(--primary)" />
          <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>Verified buyer</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 24, alignItems: 'start' }}>
        {/* Sidebar nav */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            overflow: 'hidden',
            minWidth: 180,
          }}
        >
          {tabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                width: '100%',
                background: tab === t.key ? 'rgba(196,98,45,0.08)' : 'none',
                border: 'none',
                borderLeft: tab === t.key ? '2.5px solid var(--primary)' : '2.5px solid transparent',
                cursor: 'pointer',
                padding: '13px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: tab === t.key ? 'var(--primary)' : 'var(--muted-foreground)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 14,
                fontWeight: tab === t.key ? 600 : 400,
                textAlign: 'left',
                borderBottom: i < tabs.length - 1 ? '1px solid var(--border)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 14, padding: 'clamp(20px, 3vw, 32px)', minWidth: 0 }}>
          {tab === 'account' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Account info</h2>
              {[
                { label: 'Full name', val: 'Adaeze Okonkwo' },
                { label: 'Email', val: 'adaeze@email.com' },
                { label: 'Phone', val: '+234 801 234 5678' },
                { label: 'BVN verified', val: 'Yes' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border)', gap: 16 }}>
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)' }}>{row.label}</span>
                  <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>{row.val}</span>
                </div>
              ))}
              <button style={{ marginTop: 24, background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '10px 20px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>Edit info</button>
            </div>
          )}

          {tab === 'payments' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Payment methods</h2>
              {[
                { last4: '4321', brand: 'Mastercard', expiry: '08/28', primary: true },
                { last4: '7890', brand: 'Verve', expiry: '12/27', primary: false },
              ].map(card => (
                <div key={card.last4} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
                  <div style={{ background: 'var(--muted)', borderRadius: 8, padding: '10px 14px', fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: 'var(--foreground)' }}>
                    •••• {card.last4}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>{card.brand} ending {card.last4}</p>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)' }}>Expires {card.expiry}</p>
                  </div>
                  {card.primary && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(196,98,45,0.1)', borderRadius: 100, padding: '4px 10px' }}>
                      <CheckCircle2 size={12} color="var(--primary)" />
                      <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, fontWeight: 600, color: 'var(--primary)' }}>Primary</span>
                    </div>
                  )}
                </div>
              ))}
              <button style={{ marginTop: 20, background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '10px 20px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600 }}>Add a card</button>
            </div>
          )}

          {tab === 'notifications' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Notification preferences</h2>
              {[
                { key: 'paymentReminder' as const, label: 'Upcoming payment reminder', desc: '3 days before each payment is due' },
                { key: 'bundleFill' as const, label: 'Bundle slot filled', desc: 'When a slot is taken in your bundles' },
                { key: 'sellerUpdate' as const, label: 'Seller updates', desc: 'When a seller you follow lists something new' },
                { key: 'weeklyDigest' as const, label: 'Weekly digest', desc: 'A summary of your ownership progress each week' },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)', gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 2 }}>{item.label}</p>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)' }}>{item.desc}</p>
                  </div>
                  <Toggle on={notifications[item.key]} onChange={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))} />
                </div>
              ))}
            </div>
          )}

          {tab === 'seller' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Seller reliability</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 28 }}>
                {[
                  { label: 'Reliability score', val: '4.9', icon: <Star size={18} color="var(--accent)" fill="var(--accent)" /> },
                  { label: 'Deliveries', val: '47', icon: <CheckCircle2 size={18} color="var(--primary)" /> },
                  { label: 'Disputes', val: '0', icon: <Shield size={18} color="var(--primary)" /> },
                  { label: 'Active listings', val: '3', icon: <ChevronRight size={18} color="var(--muted-foreground)" /> },
                ].map(stat => (
                  <div key={stat.label} style={{ background: 'var(--background)', borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>{stat.icon}</div>
                    <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 26, fontWeight: 700, color: 'var(--foreground)', marginBottom: 4 }}>{stat.val}</p>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)' }}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--background)', borderRadius: 12, padding: '16px 18px' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  Reliability score is calculated from your delivery completion rate, dispute record, and response time. Buyers see this score before committing to any listing.
                </p>
              </div>
            </div>
          )}

          {tab === 'howto' && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>How EasyOwn works</h2>
              {[
                { title: 'Installments', body: 'You commit to an item and pay in installments over an agreed period. Each payment fills your ownership percentage — you and the seller always see the same number.' },
                { title: 'The shared ledger', body: 'Every payment creates a permanent, tamper-evident record. There is no separate view for buyers and sellers — one ledger, identical for everyone with access.' },
                { title: 'Group buy', body: 'A bundle lists multiple identical items as slots. Strangers fill slots independently without needing to know each other. If the bundle expires with empty slots, every contributor gets a full refund.' },
                { title: 'Missed payments', body: 'If you miss a payment, there is a 7-day grace period. No penalty. No fee. We send a gentle reminder. After 7 days, we discuss options — your ownership percentage is never taken away.' },
                { title: 'Seller reliability', body: 'Every seller has a public reliability score based on completed deliveries and dispute history. You see this before you commit to anything.' },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 24, paddingBottom: 24, borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                  <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 17, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8 }}>{item.title}</p>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              ))}
              <button onClick={() => navigate('help')} style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '10px 22px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600 }}>
                Full help & documentation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
