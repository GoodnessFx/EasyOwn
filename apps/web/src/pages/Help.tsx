import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen, Users, AlertCircle, Star } from 'lucide-react'
import type { Page } from '../App'

interface Props {
  navigate: (p: Page) => void
}

const sections = [
  {
    id: 'installments',
    icon: <BookOpen size={20} color="var(--primary)" />,
    title: 'How installments work',
    articles: [
      {
        title: 'Committing to an item',
        body: `When you find an item you want, you commit to a payment plan. The seller sets the total price and the number of installments. You and the seller agree on the terms before a single naira changes hands.

Once you make your first payment, you begin owning a percentage of the item. That ownership grows with every payment you make. There is no waiting until the final payment to claim it as yours — ownership starts immediately.`,
      },
      {
        title: 'The ownership percentage',
        body: `Your ownership percentage is simply how much of the total price you have paid, expressed as a fraction. If the item costs ₦800,000 and you have paid ₦320,000, you own 40% of the item.

This number is the same in your view and in the seller's view. There is no separate balance tracker on either side.`,
      },
      {
        title: 'What happens at 100%',
        body: `When your ownership reaches 100%, the item is fully yours. The seller is notified immediately and coordinates delivery or handover. The ledger records the completion date and marks the plan as fully owned.`,
      },
    ],
  },
  {
    id: 'ledger',
    icon: <BookOpen size={20} color="var(--primary)" />,
    title: 'The shared ledger',
    articles: [
      {
        title: 'One view for everyone',
        body: `The ledger is identical for the buyer and the seller. There is no separate version for each party. What you see is exactly what the seller sees — every payment, every amount, every date.

This is intentional. Opacity is where disputes are born. A shared record removes the conditions for disagreement.`,
      },
      {
        title: 'Tamper-evident records',
        body: `Every payment creates a permanent record. Once written, that record cannot be quietly edited or deleted. The verification system lets anyone — a family member, a market inspector, a curious buyer — confirm that a payment is real and unchanged since the moment it was created.

No technical knowledge is required to verify a payment. The Transaction Explorer accepts a reference number and returns a plain-English confirmation.`,
      },
    ],
  },
  {
    id: 'groupbuy',
    icon: <Users size={20} color="var(--accent)" />,
    title: 'Group buy and slot filling',
    articles: [
      {
        title: 'What is a group bundle',
        body: `A seller creates a bundle of identical items — say, six units of the same television — at a discounted per-slot price. Buyers claim slots one at a time without knowing each other or needing to coordinate.

If all slots fill before the deadline, the seller ships one item per slot holder. If any slots remain empty when the deadline arrives, no items are shipped and every slot holder receives a full refund automatically.`,
      },
      {
        title: 'Refunds for unfilled bundles',
        body: `Refunds for unfilled bundles are automatic. You do not need to request one or contact the seller. Within 24 hours of an expired unfilled bundle, the full amount of your slot payment is returned to the card or account you paid from via Paystack.`,
      },
    ],
  },
  {
    id: 'missed',
    icon: <AlertCircle size={20} color="#E86234" />,
    title: 'Missed payments',
    articles: [
      {
        title: 'The grace period',
        body: `If you miss a scheduled payment, nothing immediate happens. There is a 7-day grace period. No penalty fee is charged. No late mark is added to your record. We send one reminder during this window.

If the payment is made within 7 days, your plan continues exactly as before. Your streak is preserved.`,
      },
      {
        title: 'What happens after 7 days',
        body: `After 7 days, your plan is paused and we reach out to discuss options. Your accumulated ownership percentage is not removed. What you have paid toward the item remains yours in the record. Options may include restructuring the payment schedule or agreeing a pause.

No one at EasyOwn uses the word penalty. There is no punitive language in this process, because a missed payment is a life event, not a moral failure.`,
      },
    ],
  },
  {
    id: 'reliability',
    icon: <Star size={20} color="var(--accent)" />,
    title: 'Seller reliability scores',
    articles: [
      {
        title: 'How scores are calculated',
        body: `A seller's reliability score is a number from 1.0 to 5.0, calculated from three inputs: the percentage of completed plans that resulted in successful delivery (weighted most heavily), the number of unresolved disputes relative to total completed plans, and average seller response time to buyer messages.

Scores update in real time with each completed transaction. A seller with 300 completed deliveries and 1 dispute will have a reliably high score. A seller with 10 deliveries and 3 disputes will have a visibly lower one.`,
      },
      {
        title: 'Where you see it',
        body: `The score appears on every listing before you commit to anything. It is shown alongside the number of completed deliveries and the dispute count. Color and icon are always paired with a number label — the score is never communicated by color alone.`,
      },
    ],
  },
]

export default function Help({ navigate }: Props) {
  const [openSection, setOpenSection] = useState<string | null>('installments')
  const [openArticle, setOpenArticle] = useState<string | null>(null)

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', padding: 'clamp(28px, 4vw, 48px) clamp(16px, 4vw, 40px)' }}>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 13, fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Plain language documentation</p>
        <h1 style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--foreground)', lineHeight: 1.1, marginBottom: 12 }}>
          How EasyOwn works
        </h1>
        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.6, maxWidth: 560 }}>
          Written to be understood the first time. No glossary. No technical terms. Every concept explained as though you're new here.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {sections.map(section => (
          <div
            key={section.id}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 'clamp(18px, 3vw, 24px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ background: 'var(--background)', borderRadius: 10, padding: 10, flexShrink: 0 }}>{section.icon}</div>
                <span style={{ fontFamily: 'var(--font-fraunces)', fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 700, color: 'var(--foreground)' }}>{section.title}</span>
              </div>
              {openSection === section.id ? <ChevronUp size={18} color="var(--muted-foreground)" /> : <ChevronDown size={18} color="var(--muted-foreground)" />}
            </button>

            {openSection === section.id && (
              <div style={{ borderTop: '1px solid var(--border)' }}>
                {section.articles.map((article, ai) => (
                  <div key={ai} style={{ borderBottom: ai < section.articles.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <button
                      onClick={() => setOpenArticle(openArticle === `${section.id}-${ai}` ? null : `${section.id}-${ai}`)}
                      style={{
                        width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                        padding: 'clamp(14px, 2vw, 20px) clamp(18px, 3vw, 28px)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        gap: 16, textAlign: 'left',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, fontWeight: 600, color: 'var(--foreground)' }}>{article.title}</span>
                      {openArticle === `${section.id}-${ai}` ? <ChevronUp size={15} color="var(--muted-foreground)" /> : <ChevronDown size={15} color="var(--muted-foreground)" />}
                    </button>

                    {openArticle === `${section.id}-${ai}` && (
                      <div style={{ padding: '0 clamp(18px, 3vw, 28px) clamp(18px, 3vw, 24px)' }}>
                        {article.body.split('\n\n').map((para, pi) => (
                          <p key={pi} style={{ fontFamily: 'var(--font-outfit)', fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.75, marginBottom: 14 }}>
                            {para}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 40, padding: 'clamp(20px, 3vw, 32px)', background: 'var(--foreground)', borderRadius: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: 20, fontWeight: 700, color: 'var(--background)', marginBottom: 4 }}>Still have a question?</p>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: 14, color: 'rgba(246,242,234,0.6)' }}>We respond to every message within 4 hours on business days.</p>
        </div>
        <button style={{ background: 'var(--primary)', color: 'var(--primary-foreground)', border: 'none', cursor: 'pointer', padding: '12px 24px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-outfit)', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>
          Contact support
        </button>
      </div>
    </div>
  )
}
