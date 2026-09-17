import { useState, useEffect } from 'react'
import { ArrowRight, ChevronDown, Shield, Users, Eye } from 'lucide-react'
import type { Page } from '../App'
import Logo from '../components/Logo'
import OwnershipRing from '../components/OwnershipRing'
import FillBar from '../components/FillBar'

interface Props {
  navigate: (p: Page) => void
}

export default function Landing({ navigate }: Props) {
  const [heroPercent, setHeroPercent] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    // animate logo fill on load
    const timeout = setTimeout(() => {
      let p = 0
      const interval = setInterval(() => {
        p += 1.2
        setHeroPercent(Math.min(p, 68))
        if (p >= 68) clearInterval(interval)
      }, 20)
    }, 400)
    return () => clearTimeout(timeout)
  }, [])

  const C = 'var(--primary)'
  const G = 'var(--accent)'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {/* NAV */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 clamp(20px, 5vw, 60px)',
          height: 64,
          borderBottom: '1px solid var(--border)',
          background: 'rgba(246,242,234,0.92)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Logo size={36} />
        <nav className="hidden md:flex" style={{ gap: 32, alignItems: 'center' }}>
          {[
            { label: 'How it works', id: 'how' },
            { label: 'Group Buy', id: 'group' },
            { label: 'Verify', page: 'explorer' as Page },
          ].map((l) => (
            <button
              key={l.label}
              onClick={() => l.page ? navigate(l.page) : document.getElementById(l.id!)?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted-foreground)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 15,
                fontWeight: 500,
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted-foreground)')}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => navigate('dashboard')}
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              cursor: 'pointer',
              padding: '9px 22px',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-outfit)',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get started <ArrowRight size={15} />
          </button>
        </nav>
        {/* Mobile */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: 8,
            cursor: 'pointer',
            color: 'var(--foreground)',
          }}
        >
          <ChevronDown size={18} style={{ transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </header>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            zIndex: 49,
            background: 'var(--background)',
            borderBottom: '1px solid var(--border)',
            padding: '12px clamp(20px, 5vw, 60px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <button onClick={() => { navigate('dashboard'); setMenuOpen(false) }} style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '10px 16px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 600, textAlign: 'left' }}>
            Get started
          </button>
          <button onClick={() => { navigate('explorer'); setMenuOpen(false) }} style={{ background: 'none', color: 'var(--foreground)', border: 'none', cursor: 'pointer', padding: '10px 16px', fontFamily: 'var(--font-outfit)', fontSize: 15, textAlign: 'left' }}>
            Verify a transaction
          </button>
        </div>
      )}

      {/* HERO */}
      <section
        style={{
          paddingTop: 'clamp(100px, 16vh, 160px)',
          paddingBottom: 'clamp(60px, 10vh, 120px)',
          paddingLeft: 'clamp(20px, 5vw, 60px)',
          paddingRight: 'clamp(20px, 5vw, 60px)',
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        {/* Text */}
        <div style={{ maxWidth: 560 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 100,
              padding: '5px 14px',
              marginBottom: 28,
            }}
          >
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)' }} />
            <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Built for Nigeria
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(42px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.0,
              color: 'var(--foreground)',
              letterSpacing: '-0.03em',
              marginBottom: 24,
            }}
          >
            Own it.<br />
            <span style={{ color: C }}>Fully.</span><br />
            <span style={{ color: 'var(--muted-foreground)', fontStyle: 'italic', fontWeight: 600 }}>No shame.</span>
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: 'clamp(16px, 2vw, 18px)',
              color: 'var(--muted-foreground)',
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 440,
            }}
          >
            Pay in installments toward an item you're already claiming as yours.
            You and the seller watch the same ownership fill — no hidden
            numbers, no surprises.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('dashboard')}
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                cursor: 'pointer',
                padding: 'clamp(12px, 2vw, 15px) clamp(24px, 3vw, 32px)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 16,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                transition: 'opacity 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Start owning <ArrowRight size={17} />
            </button>
            <button
              onClick={() => navigate('explorer')}
              style={{
                background: 'none',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
                cursor: 'pointer',
                padding: 'clamp(12px, 2vw, 15px) clamp(24px, 3vw, 32px)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 16,
                fontWeight: 500,
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)')}
            >
              Verify a payment
            </button>
          </div>
        </div>

        {/* Hero ownership ring */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 24,
              padding: 'clamp(32px, 5vw, 56px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              maxWidth: 440,
            }}
          >
            {/* Decorative fill block behind ring */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: `${heroPercent}%`,
                background: 'linear-gradient(to top, rgba(196,98,45,0.06), transparent)',
                transition: 'height 0.05s',
              }}
            />

            <OwnershipRing percent={heroPercent} size={180} animate={false} label="owned so far" sublabel="MacBook Air M3" />

            <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>Paid so far</span>
                <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 16, fontWeight: 700, color: 'var(--foreground)' }}>₦544,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>Remaining</span>
                <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 16, fontWeight: 700, color: 'var(--foreground)' }}>₦256,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>Next payment</span>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>Oct 3, 2026</span>
              </div>
            </div>

            {/* Ownership confirmed badge */}
            <div
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'var(--accent)',
                color: 'var(--accent-foreground)',
                padding: '4px 10px',
                borderRadius: 100,
                fontFamily: 'var(--font-outfit)',
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Live
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        style={{
          padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 60px)',
          borderTop: '1px solid var(--border)',
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <div style={{ marginBottom: 'clamp(40px, 6vh, 64px)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
            How ownership works
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--foreground)',
              lineHeight: 1.1,
            }}
          >
            Three ideas that change everything
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {[
            {
              number: '01',
              icon: <ArrowRight size={22} color={C} />,
              title: 'Pay in installments toward ownership',
              body: 'Pick an item. Commit to it. Pay in weekly or monthly installments. Every payment fills your ownership — visibly. You and the seller see the exact same number.',
              fill: 45,
            },
            {
              number: '02',
              icon: <Eye size={22} color={C} />,
              title: 'One ledger, shared by both sides',
              body: 'No separate seller view and buyer view. No hidden "balance owed" tracker. One clean record, identical for everyone with access. Tamper-evident. Permanently verifiable.',
              fill: 72,
            },
            {
              number: '03',
              icon: <Users size={22} color={C} />,
              title: 'Pool with strangers through Group Buy',
              body: 'Six slots for one bundle. Each person fills their slot. Nobody needs to know the others. If the bundle expires unfilled, every contributor gets a full refund.',
              fill: 3,
            },
          ].map((card) => (
            <div
              key={card.number}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 'clamp(24px, 3vw, 36px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: `${card.fill}%`,
                  background: 'linear-gradient(90deg, rgba(196,98,45,0.06), transparent)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ background: 'rgba(196,98,45,0.1)', borderRadius: 10, padding: 10 }}>
                    {card.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 42, fontWeight: 800, color: 'var(--muted)', lineHeight: 1 }}>
                    {card.number}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, color: 'var(--foreground)', marginBottom: 12, lineHeight: 1.2 }}>
                  {card.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  {card.body}
                </p>
                <div style={{ marginTop: 20 }}>
                  <FillBar percent={card.fill} height={4} showLabel={false} animate={true} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROUP BUY */}
      <section
        id="group"
        style={{
          padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 60px)',
          borderTop: '1px solid var(--border)',
          background: 'var(--foreground)',
          color: 'var(--background)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: G, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
              Group Buy
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-fraunces)',
                fontSize: 'clamp(32px, 4vw, 52px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 24,
                color: 'var(--background)',
              }}
            >
              Six strangers.<br />One bundle.<br />
              <span style={{ color: G }}>Everyone wins.</span>
            </h2>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, lineHeight: 1.7, color: 'rgba(246,242,234,0.7)', marginBottom: 32 }}>
              A seller lists a bundle of six identical items at a group rate.
              Strangers fill slots independently. If all six fill before the
              deadline, everyone gets their item. If not, every naira comes
              back. No group chat required.
            </p>
            <button
              onClick={() => navigate('bundle')}
              style={{
                background: G,
                color: 'var(--foreground)',
                border: 'none',
                cursor: 'pointer',
                padding: '13px 28px',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 15,
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              See live bundles <ArrowRight size={16} />
            </button>
          </div>

          {/* Bundle slot visual */}
          <div
            style={{
              background: 'rgba(246,242,234,0.06)',
              border: '1px solid rgba(246,242,234,0.12)',
              borderRadius: 20,
              padding: 'clamp(24px, 3vw, 36px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(246,242,234,0.5)', marginBottom: 4 }}>Hisense 55" QLED Bundle</p>
                <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700 }}>₦189,000 / slot</p>
              </div>
              <div style={{ background: G, color: 'var(--foreground)', padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-outfit)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                4 days left
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 24 }}>
              {[true, true, true, true, false, false].map((filled, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 12,
                    padding: '18px 12px',
                    textAlign: 'center',
                    background: filled ? 'rgba(196,155,37,0.18)' : 'rgba(246,242,234,0.05)',
                    border: `1px solid ${filled ? G : 'rgba(246,242,234,0.1)'}`,
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: filled ? G : 'rgba(246,242,234,0.3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                    Slot {i + 1}
                  </div>
                  <div style={{ fontFamily: 'var(--font-fraunces)', fontSize: 16, fontWeight: 700, color: filled ? G : 'rgba(246,242,234,0.2)' }}>
                    {filled ? 'Filled' : 'Open'}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(246,242,234,0.06)', borderRadius: 10, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'rgba(246,242,234,0.5)' }}>Bundle fill</span>
                <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 16, fontWeight: 700, color: G }}>4 / 6</span>
              </div>
              <div style={{ height: 6, background: 'rgba(246,242,234,0.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '66.6%', background: G, borderRadius: 3 }} />
              </div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'rgba(246,242,234,0.4)', marginTop: 10 }}>
                2 slots remain. Unfilled by deadline? Full refund for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFY */}
      <section
        style={{
          padding: 'clamp(60px, 10vh, 120px) clamp(20px, 5vw, 60px)',
          borderTop: '1px solid var(--border)',
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ background: 'rgba(196,98,45,0.1)', borderRadius: 12, padding: 14, display: 'inline-block', marginBottom: 24 }}>
            <Shield size={28} color={C} />
          </div>
          <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 20, color: 'var(--foreground)' }}>
            Every payment can be verified. By anyone.
          </h2>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 28 }}>
            Share a receipt, show a QR code. Anyone — a parent, a partner, a market inspector — can confirm a payment is real and unchanged. No login. No account. Plain English only.
          </p>
          <button
            onClick={() => navigate('explorer')}
            style={{
              background: 'none',
              color: 'var(--primary)',
              border: '1.5px solid var(--primary)',
              cursor: 'pointer',
              padding: '12px 26px',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-outfit)',
              fontSize: 15,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            Open Transaction Explorer <ArrowRight size={15} />
          </button>
        </div>

        {/* Verified card */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: 'clamp(24px, 3vw, 36px)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
            <div style={{ background: 'rgba(196,98,45,0.1)', borderRadius: 10, padding: 12 }}>
              <Shield size={22} color={C} />
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Verified</p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>This record has not been changed since it was created</p>
            </div>
          </div>

          {[
            { label: 'Item', value: 'Samsung Galaxy S25 Ultra' },
            { label: 'Amount', value: '₦85,000' },
            { label: 'Date', value: 'Sep 14, 2026 — 11:43 AM' },
            { label: 'Status', value: 'Confirmed & locked' },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)' }}>{row.label}</span>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)' }}>{row.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: 'clamp(40px, 6vw, 60px) clamp(20px, 5vw, 60px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 20,
          maxWidth: 1280,
          margin: '0 auto',
        }}
      >
        <Logo size={32} />
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {['Help', 'Privacy', 'Terms', 'Contact'].map(l => (
            <button
              key={l}
              onClick={() => l === 'Help' ? navigate('help') : undefined}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)' }}
            >
              {l}
            </button>
          ))}
        </div>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>
          © 2026 EasyOwn. Made in Nigeria.
        </p>
      </footer>
    </div>
  )
}
