import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import type { Page } from '../App'
import Logo from './Logo'

interface NavProps {
  current: Page
  navigate: (p: Page) => void
}

const links: { label: string; page: Page }[] = [
  { label: 'Dashboard', page: 'dashboard' },
  { label: 'Browse', page: 'listings' },
  { label: 'Sell', page: 'seller' },
  { label: 'Ledger', page: 'ledger' },
  { label: 'Bundle', page: 'bundle' },
  { label: 'Explorer', page: 'explorer' },
]

export default function Nav({ current, navigate }: NavProps) {
  const [open, setOpen] = useState(false)

  return (
    <header
      style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--background)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 clamp(16px, 4vw, 40px)',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => navigate('dashboard')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <Logo size={32} />
        </button>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            gap: 4,
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => navigate(l.page)}
              style={{
                background: current === l.page ? 'var(--primary)' : 'none',
                color: current === l.page ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 14px',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 14,
                fontWeight: current === l.page ? 600 : 400,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                if (current !== l.page)
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--foreground)'
              }}
              onMouseLeave={(e) => {
                if (current !== l.page)
                  (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted-foreground)'
              }}
            >
              {l.label}
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px' }} />
          <button
            onClick={() => navigate('streak')}
            style={{
              background: 'none',
              color: current === 'streak' ? 'var(--accent)' : 'var(--muted-foreground)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              padding: '6px 14px',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-outfit)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            My Plan
          </button>
          <button
            onClick={() => navigate('profile')}
            style={{
              background: 'none',
              color: current === 'profile' ? 'var(--primary)' : 'var(--muted-foreground)',
              border: '1px solid var(--border)',
              cursor: 'pointer',
              padding: '6px 14px',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-outfit)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Profile
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden"
          onClick={() => setOpen(!open)}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            padding: 8,
            borderRadius: 'var(--radius)',
            color: 'var(--foreground)',
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--background)',
            padding: '12px clamp(16px, 4vw, 40px)',
          }}
          className="flex md:hidden flex-col gap-1"
        >
          {[...links, { label: 'My Plan', page: 'streak' as Page }, { label: 'Profile', page: 'profile' as Page }, { label: 'Help', page: 'help' as Page }].map((l) => (
            <button
              key={l.page}
              onClick={() => { navigate(l.page); setOpen(false) }}
              style={{
                background: current === l.page ? 'var(--primary)' : 'none',
                color: current === l.page ? 'var(--primary-foreground)' : 'var(--foreground)',
                border: 'none',
                cursor: 'pointer',
                padding: '10px 14px',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 15,
                fontWeight: current === l.page ? 600 : 400,
                textAlign: 'left',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
