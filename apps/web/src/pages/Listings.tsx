import { useState } from 'react'
import { Search, Star, AlertCircle, Package, SlidersHorizontal, X } from 'lucide-react'
import type { Page } from '../App'
import FillBar from '../components/FillBar'

interface Props {
  navigate: (p: Page) => void
}

const items = [
  { id: 1, name: 'iPhone 16 Pro Max — Desert Titanium', category: 'Electronics', seller: 'GadgetHub PH', price: 1200000, installments: 6, pct: 0, reliability: 4.9, deliveries: 312, disputes: 1, image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop&auto=format', type: 'item' },
  { id: 2, name: 'MacBook Air M3 — Starlight', category: 'Electronics', seller: 'TechVault Lagos', price: 800000, installments: 8, pct: 0, reliability: 4.8, deliveries: 198, disputes: 2, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&auto=format', type: 'item' },
  { id: 3, name: 'Hisense 55" QLED TV Bundle', category: 'Appliances', seller: 'HomeElite Abuja', price: 189000, installments: 4, pct: 66, reliability: 4.7, deliveries: 87, disputes: 0, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop&auto=format', type: 'bundle', slots: 6, filled: 4 },
  { id: 4, name: 'Samsung Galaxy S25 Ultra', category: 'Electronics', seller: 'PhonePoint Ikeja', price: 950000, installments: 6, pct: 0, reliability: 4.6, deliveries: 245, disputes: 3, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&auto=format', type: 'item' },
  { id: 5, name: 'Sony PS5 + 2 Controllers Bundle', category: 'Gaming', seller: 'GameZone VI', price: 650000, installments: 5, pct: 33, reliability: 4.9, deliveries: 56, disputes: 0, image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop&auto=format', type: 'bundle', slots: 3, filled: 1 },
  { id: 6, name: 'LG Side-by-Side Refrigerator', category: 'Appliances', seller: 'ApplianceKing', price: 480000, installments: 8, pct: 0, reliability: 4.5, deliveries: 134, disputes: 4, image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&h=300&fit=crop&auto=format', type: 'item' },
]

const categories = ['All', 'Electronics', 'Appliances', 'Gaming']

export default function Listings({ navigate }: Props) {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('All')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = items.filter(i =>
    (cat === 'All' || i.category === cat) &&
    i.name.toLowerCase().includes(query.toLowerCase())
  )

  const selected = items.find(i => i.id === selectedId)

  const ReliabilityDot = ({ score }: { score: number }) => {
    const color = score >= 4.8 ? 'var(--primary)' : score >= 4.5 ? 'var(--accent)' : '#E86234'
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: color }} />
        <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, fontWeight: 600, color }}>
          {score} reliability
        </span>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: 6 }}>
          Browse listings
        </h1>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)' }}>
          Seller reliability score is shown before you commit to anything.
        </p>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px', position: 'relative', minWidth: 200 }}>
          <Search size={16} color="var(--muted-foreground)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search items or sellers…"
            style={{
              width: '100%',
              padding: '11px 14px 11px 40px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              fontFamily: 'var(--font-outfit)',
              fontSize: 14,
              color: 'var(--foreground)',
              outline: 'none',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                background: cat === c ? 'var(--primary)' : 'var(--card)',
                color: cat === c ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                border: `1px solid ${cat === c ? 'var(--primary)' : 'var(--border)'}`,
                cursor: 'pointer',
                padding: '10px 16px',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 14,
                fontWeight: cat === c ? 600 : 400,
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            cursor: 'pointer',
            padding: '10px 14px',
            borderRadius: 'var(--radius)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--muted-foreground)',
            fontFamily: 'var(--font-outfit)',
            fontSize: 14,
          }}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
          <Package size={48} color="var(--muted-foreground)" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>Nothing matches</p>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)' }}>Try a different search or category filter.</p>
          <button onClick={() => { setQuery(''); setCat('All') }} style={{ marginTop: 20, background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '10px 22px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600 }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filtered.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                cursor: 'pointer',
                textAlign: 'left',
                overflow: 'hidden',
                transition: 'transform 0.15s, border-color 0.15s',
                padding: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
              }}
            >
              <div style={{ height: 180, overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {item.type === 'bundle' && (
                  <div style={{ position: 'absolute', top: 10, left: 10, background: 'var(--accent)', color: 'var(--accent-foreground)', padding: '4px 10px', borderRadius: 100, fontFamily: 'var(--font-outfit)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Bundle {item.filled}/{(item as any).slots}
                  </div>
                )}
              </div>
              <div style={{ padding: '18px 18px 20px' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{item.category}</p>
                <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 17, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.2, marginBottom: 10 }}>{item.name}</p>

                <ReliabilityDot score={item.reliability} />
                {item.disputes > 2 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 6 }}>
                    <AlertCircle size={12} color="#E86234" />
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: '#E86234' }}>{item.disputes} disputes on record</span>
                  </div>
                )}

                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', marginBottom: 2 }}>
                      {item.type === 'bundle' ? 'per slot' : 'total price'}
                    </p>
                    <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 20, fontWeight: 700, color: 'var(--foreground)' }}>
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>
                    {item.installments} payments
                  </p>
                </div>

                {item.type === 'bundle' && (
                  <div style={{ marginTop: 12 }}>
                    <FillBar percent={item.pct} height={4} showLabel={false} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Item detail modal */}
      {selected && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(26,17,8,0.6)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            zIndex: 100,
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setSelectedId(null)}
        >
          <div
            style={{
              background: 'var(--background)',
              borderRadius: '20px 20px 0 0',
              width: '100%',
              maxWidth: 640,
              maxHeight: '90vh',
              overflow: 'auto',
              padding: 'clamp(24px, 4vw, 40px)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{selected.category}</p>
                <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.2 }}>{selected.name}</h2>
              </div>
              <button onClick={() => setSelectedId(null)} style={{ background: 'var(--muted)', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 'var(--radius)', color: 'var(--foreground)', flexShrink: 0, marginLeft: 12 }}>
                <X size={18} />
              </button>
            </div>

            <img src={selected.image} alt={selected.name} style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 24 }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              {[
                { label: 'Total price', val: `₦${selected.price.toLocaleString()}` },
                { label: 'Monthly payments', val: `${selected.installments} payments` },
                { label: 'Per payment', val: `₦${Math.round(selected.price / selected.installments).toLocaleString()}` },
                { label: 'Seller', val: selected.seller },
              ].map(row => (
                <div key={row.label} style={{ background: 'var(--card)', borderRadius: 10, padding: '14px 16px' }}>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{row.label}</p>
                  <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 17, fontWeight: 700, color: 'var(--foreground)' }}>{row.val}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'var(--card)', borderRadius: 12, padding: '16px 18px', marginBottom: 24, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Star size={14} color="var(--accent)" fill="var(--accent)" />
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{selected.reliability} rating</span>
              </div>
              <div style={{ width: 1, background: 'var(--border)' }} />
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>{selected.deliveries} deliveries completed</span>
              <div style={{ width: 1, background: 'var(--border)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {selected.disputes > 2 ? <AlertCircle size={13} color="#E86234" /> : null}
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: selected.disputes > 2 ? '#E86234' : 'var(--muted-foreground)' }}>
                  {selected.disputes} dispute{selected.disputes !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <button
              onClick={() => { setSelectedId(null); navigate('ledger') }}
              style={{
                width: '100%',
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                border: 'none',
                cursor: 'pointer',
                padding: '15px 24px',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-outfit)',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              Select a plan and start owning
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
