import { useState } from 'react'
import { Upload, Plus, Minus, Package, Users, ChevronRight, CheckCircle2 } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

type Mode = 'choose' | 'item' | 'bundle' | 'success'

export default function SellerFlow({ navigate }: Props) {
  const [mode, setMode] = useState<Mode>('choose')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '', description: '', price: '', installments: '6',
    category: 'Electronics',
  })
  const [bundleForm, setBundleForm] = useState({
    name: '', price: '', slots: '6', deadline: '',
  })

  const categories = ['Electronics', 'Appliances', 'Gaming', 'Fashion', 'Furniture', 'Other']

  const Field = ({ label, name, value, onChange, placeholder, type = 'text' }: { label: string; name: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 14px',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          background: 'var(--card)',
          fontFamily: 'var(--font-outfit)',
          fontSize: 15,
          color: 'var(--foreground)',
          outline: 'none',
        }}
        onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
        onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      />
    </div>
  )

  if (mode === 'success') {
    return (
      <div style={{ maxWidth: 520, margin: '80px auto', padding: '0 clamp(16px, 4vw, 40px)', textAlign: 'center' }}>
        <div style={{ background: 'rgba(196,98,45,0.1)', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={40} color="var(--primary)" />
        </div>
        <h2 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 32, fontWeight: 700, color: 'var(--foreground)', marginBottom: 12, letterSpacing: '-0.02em' }}>Listing published</h2>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.6, marginBottom: 32 }}>
          Buyers can now find your listing. You'll receive a notification when someone commits to it.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('listings')} style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '12px 28px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 600 }}>
            View listings
          </button>
          <button onClick={() => { setMode('choose'); setStep(1) }} style={{ background: 'var(--card)', color: 'var(--foreground)', border: '1px solid var(--border)', cursor: 'pointer', padding: '12px 28px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 500 }}>
            Create another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', marginBottom: 8 }}>
          Create a listing
        </h1>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)' }}>
          Set the terms. Buyers fill their ownership — you track it together.
        </p>
      </div>

      {mode === 'choose' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { type: 'item' as Mode, icon: <Package size={28} color="var(--primary)" />, title: 'Single item', desc: 'One buyer commits to owning one item through installments. Both of you see the same ownership fill.' },
            { type: 'bundle' as Mode, icon: <Users size={28} color="var(--accent)" />, title: 'Group bundle', desc: 'List multiple slots for one product type. Strangers fill slots independently. Deadline triggers delivery or full refund.' },
          ].map(opt => (
            <button
              key={opt.type}
              onClick={() => { setMode(opt.type); setStep(1) }}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '28px 24px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)' }}
            >
              <div style={{ marginBottom: 16 }}>{opt.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 10 }}>{opt.title}</h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{opt.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 20, color: 'var(--primary)' }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600 }}>Get started</span>
                <ChevronRight size={16} />
              </div>
            </button>
          ))}
        </div>
      )}

      {mode === 'item' && (
        <div>
          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, alignItems: 'center' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: s <= step ? 'var(--primary)' : 'var(--muted)',
                  color: s <= step ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                  fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 700,
                }}>
                  {s < step ? <CheckCircle2 size={16} /> : s}
                </div>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: s === step ? 'var(--foreground)' : 'var(--muted-foreground)', fontWeight: s === step ? 600 : 400 }}>
                  {['Item details', 'Pricing', 'Photos'][s - 1]}
                </span>
                {s < 3 && <div style={{ width: 32, height: 1, background: 'var(--border)' }} />}
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)' }}>
            {step === 1 && (
              <>
                <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Item details</h3>
                <Field label="Item name" name="name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="e.g. iPhone 16 Pro Max — Desert Titanium" />
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>Category</label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {categories.map(c => (
                      <button
                        key={c}
                        onClick={() => setForm(f => ({ ...f, category: c }))}
                        style={{
                          background: form.category === c ? 'var(--primary)' : 'none',
                          color: form.category === c ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                          border: `1px solid ${form.category === c ? 'var(--primary)' : 'var(--border)'}`,
                          cursor: 'pointer', padding: '7px 14px', borderRadius: 'var(--radius)',
                          fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: form.category === c ? 600 : 400,
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 8 }}>Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    placeholder="Condition, specs, what's included…"
                    rows={4}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)', background: 'var(--background)', fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--foreground)', outline: 'none', resize: 'vertical' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Pricing & terms</h3>
                <Field label="Total price (₦)" name="price" value={form.price} onChange={v => setForm(f => ({ ...f, price: v }))} placeholder="e.g. 800000" type="number" />
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 12 }}>
                    Number of installments
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <button onClick={() => setForm(f => ({ ...f, installments: String(Math.max(2, Number(f.installments) - 1)) }))} style={{ background: 'var(--muted)', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}>
                      <Minus size={16} />
                    </button>
                    <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 28, fontWeight: 700, color: 'var(--primary)', minWidth: 40, textAlign: 'center' }}>{form.installments}</span>
                    <button onClick={() => setForm(f => ({ ...f, installments: String(Math.min(24, Number(f.installments) + 1)) }))} style={{ background: 'var(--muted)', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}>
                      <Plus size={16} />
                    </button>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)' }}>monthly payments</span>
                  </div>
                </div>
                {form.price && (
                  <div style={{ background: 'rgba(196,98,45,0.08)', borderRadius: 12, padding: '16px 18px', marginTop: 16 }}>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 4 }}>Buyer pays per installment</p>
                    <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 28, fontWeight: 700, color: 'var(--primary)' }}>
                      ₦{Math.round(Number(form.price) / Number(form.installments)).toLocaleString()}
                    </p>
                  </div>
                )}
              </>
            )}

            {step === 3 && (
              <>
                <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 24 }}>Add photos</h3>
                <div
                  style={{
                    border: '2px dashed var(--border)',
                    borderRadius: 12,
                    padding: 48,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--primary)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <Upload size={32} color="var(--muted-foreground)" style={{ margin: '0 auto 12px' }} />
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 600, color: 'var(--foreground)', marginBottom: 4 }}>Upload item photos</p>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)' }}>PNG, JPG up to 10MB each</p>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, gap: 12 }}>
              <button
                onClick={() => step > 1 ? setStep(s => s - 1) : setMode('choose')}
                style={{ background: 'var(--muted)', color: 'var(--foreground)', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 500 }}
              >
                Back
              </button>
              <button
                onClick={() => step < 3 ? setStep(s => s + 1) : setMode('success')}
                style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '12px 28px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 700 }}
              >
                {step < 3 ? 'Continue' : 'Publish listing'}
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === 'bundle' && (
        <div>
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16, padding: 'clamp(24px, 4vw, 36px)' }}>
            <h3 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 22, fontWeight: 700, color: 'var(--foreground)', marginBottom: 8 }}>Bundle details</h3>
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 28, lineHeight: 1.6 }}>
              Set the number of slots and a deadline. If slots fill before the deadline, everyone gets their item. If not, every contributor gets a full refund.
            </p>
            <Field label="Bundle name" name="name" value={bundleForm.name} onChange={v => setBundleForm(f => ({ ...f, name: v }))} placeholder="e.g. Hisense 55-inch QLED TV Bundle" />
            <Field label="Price per slot (₦)" name="price" value={bundleForm.price} onChange={v => setBundleForm(f => ({ ...f, price: v }))} placeholder="e.g. 189000" type="number" />
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 12 }}>Number of slots</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={() => setBundleForm(f => ({ ...f, slots: String(Math.max(2, Number(f.slots) - 1)) }))} style={{ background: 'var(--muted)', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}><Minus size={16} /></button>
                <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 28, fontWeight: 700, color: 'var(--accent)', minWidth: 40, textAlign: 'center' }}>{bundleForm.slots}</span>
                <button onClick={() => setBundleForm(f => ({ ...f, slots: String(Math.min(20, Number(f.slots) + 1)) }))} style={{ background: 'var(--muted)', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--foreground)' }}><Plus size={16} /></button>
              </div>
            </div>
            <Field label="Deadline" name="deadline" value={bundleForm.deadline} onChange={v => setBundleForm(f => ({ ...f, deadline: v }))} type="date" />
            {bundleForm.price && bundleForm.slots && (
              <div style={{ background: 'rgba(196,155,37,0.1)', borderRadius: 12, padding: '16px 18px', marginBottom: 20 }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, color: 'var(--muted-foreground)', marginBottom: 4 }}>Total bundle value if fully filled</p>
                <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>
                  ₦{(Number(bundleForm.price) * Number(bundleForm.slots)).toLocaleString()}
                </p>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <button onClick={() => setMode('choose')} style={{ background: 'var(--muted)', color: 'var(--foreground)', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 500 }}>Back</button>
              <button onClick={() => setMode('success')} style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '12px 28px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 700 }}>Publish bundle</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
