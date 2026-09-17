import { useState } from 'react'
import { Search, Shield, CheckCircle2, ChevronDown, ChevronUp, QrCode, AlertCircle } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

const MOCK_RECORDS: Record<string, {
  item: string; amount: string; date: string; status: string;
  buyer: string; seller: string; ref: string; verificationCode: string; recordId: string;
}> = {
  'EO-20260914-0081': {
    item: 'MacBook Air M3 — Midnight',
    amount: '₦80,000',
    date: 'Sep 14, 2026 — 11:43 AM',
    status: 'Confirmed & locked',
    buyer: 'A.O. (verified buyer)',
    seller: 'TechVault Lagos',
    ref: 'EO-20260914-0081',
    verificationCode: 'EO-VC-8a3f9c12e7b4',
    recordId: 'REC-0000081',
  },
  'EO-20260814-0059': {
    item: 'MacBook Air M3 — Midnight',
    amount: '₦80,000',
    date: 'Aug 14, 2026 — 10:12 AM',
    status: 'Confirmed & locked',
    buyer: 'A.O. (verified buyer)',
    seller: 'TechVault Lagos',
    ref: 'EO-20260814-0059',
    verificationCode: 'EO-VC-2d7a4b8e1f93',
    recordId: 'REC-0000059',
  },
}

type State = 'idle' | 'found' | 'notfound'

export default function Explorer({ navigate }: Props) {
  const [query, setQuery] = useState('')
  const [state, setState] = useState<State>('idle')
  const [result, setResult] = useState<typeof MOCK_RECORDS[string] | null>(null)
  const [techExpanded, setTechExpanded] = useState(false)

  const search = () => {
    const trimmed = query.trim().toUpperCase()
    const key = Object.keys(MOCK_RECORDS).find(k => k.toUpperCase() === trimmed)
    if (key) {
      setResult(MOCK_RECORDS[key])
      setState('found')
    } else {
      setResult(null)
      setState('notfound')
    }
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(196,98,45,0.1)', borderRadius: '50%', width: 64, height: 64, marginBottom: 20 }}>
          <Shield size={30} color="var(--primary)" />
        </div>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: 12, lineHeight: 1.1 }}>
          Transaction Explorer
        </h1>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
          Enter a transaction reference to verify a payment is real and unchanged. No login required.
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 36 }}>
        <label style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 10 }}>
          Transaction reference
        </label>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px', position: 'relative' }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && search()}
              placeholder="e.g. EO-20260914-0081"
              style={{
                width: '100%',
                padding: '14px 14px 14px 44px',
                borderRadius: 'var(--radius)',
                border: '1.5px solid var(--border)',
                background: 'var(--card)',
                fontFamily: 'var(--font-dm-mono)',
                fontSize: 15,
                color: 'var(--foreground)',
                outline: 'none',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <Search size={16} color="var(--muted-foreground)" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button
            onClick={search}
            style={{
              background: 'var(--primary)',
              color: 'var(--primary-foreground)',
              border: 'none',
              cursor: 'pointer',
              padding: '14px 28px',
              borderRadius: 'var(--radius)',
              fontFamily: 'var(--font-outfit)',
              fontSize: 15,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Verify
          </button>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12, flexWrap: 'wrap' }}>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--card)', border: '1px solid var(--border)', cursor: 'pointer', padding: '8px 14px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}
          >
            <QrCode size={14} /> Scan QR code
          </button>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', alignSelf: 'center' }}>
            Try: <button onClick={() => { setQuery('EO-20260914-0081'); setTimeout(search, 50) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontFamily: 'var(--font-dm-mono)', fontSize: 13, padding: 0 }}>EO-20260914-0081</button>
          </p>
        </div>
      </div>

      {/* Result */}
      {state === 'found' && result && (
        <div>
          {/* Verified badge */}
          <div
            style={{
              background: 'rgba(196,98,45,0.08)',
              border: '1.5px solid rgba(196,98,45,0.3)',
              borderRadius: 16,
              padding: 'clamp(20px, 3vw, 28px)',
              marginBottom: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(196,98,45,0.12)', borderRadius: 12, padding: 12, flexShrink: 0 }}>
                <CheckCircle2 size={28} color="var(--primary)" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Verified</p>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                  This record has not been changed since it was created. This payment is confirmed and locked.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
              {[
                { label: 'Item', val: result.item },
                { label: 'Amount', val: result.amount },
                { label: 'Date', val: result.date },
                { label: 'Status', val: result.status },
                { label: 'Buyer', val: result.buyer },
                { label: 'Seller', val: result.seller },
              ].map(row => (
                <div key={row.label} style={{ background: 'var(--background)', borderRadius: 10, padding: '14px 14px' }}>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 5 }}>{row.label}</p>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1.3 }}>{row.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical details (collapsed by default) */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <button
              onClick={() => setTechExpanded(!techExpanded)}
              style={{
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 18px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)',
              }}
            >
              <span>Technical details (for reviewers)</span>
              {techExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
            {techExpanded && (
              <div style={{ borderTop: '1px solid var(--border)', padding: '16px 18px' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 14, lineHeight: 1.5 }}>
                  The following identifiers allow an auditor or reviewer to independently confirm this record's integrity. These are reference codes — not technical addresses.
                </p>
                {[
                  { label: 'Verification code', val: result.verificationCode },
                  { label: 'Record ID', val: result.recordId },
                  { label: 'Transaction reference', val: result.ref },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>{row.label}</span>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: 'var(--foreground)', background: 'var(--background)', padding: '3px 8px', borderRadius: 4 }}>{row.val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {state === 'notfound' && (
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: 'clamp(28px, 4vw, 40px)',
            textAlign: 'center',
          }}
        >
          <div style={{ background: 'rgba(232,98,52,0.1)', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <AlertCircle size={26} color="#E86234" />
          </div>
          <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8 }}>No record found</p>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.6, maxWidth: 380, margin: '0 auto 20px' }}>
            No payment matching that reference exists in our system. Check the reference number and try again. If you received this reference from a seller, ask them to share the exact text from their ledger screen.
          </p>
          <button onClick={() => { setQuery(''); setState('idle') }} style={{ background: 'none', border: '1px solid var(--border)', cursor: 'pointer', padding: '10px 22px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
            Try another reference
          </button>
        </div>
      )}

      {state === 'idle' && (
        <div
          style={{
            background: 'var(--card)',
            border: '1px dashed var(--border)',
            borderRadius: 16,
            padding: 'clamp(32px, 5vw, 56px)',
            textAlign: 'center',
          }}
        >
          <Shield size={40} color="var(--muted-foreground)" style={{ margin: '0 auto 16px', opacity: 0.4 }} />
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
            Enter a transaction reference or scan a QR code from a receipt.<br />No account needed.
          </p>
        </div>
      )}
    </div>
  )
}
