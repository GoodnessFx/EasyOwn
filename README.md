EasyOwn
Own it in stages. No guilt, no debt language, no doubt.
EasyOwn is a guilt-free installment purchasing platform built for Nigeria — a structured, transparent alternative to platforms like EasyBuy and CDCare. Instead of framing a purchase as debt, EasyOwn frames it as progress: buyers pay an item off in stages and watch their ownership grow, on a shared record both sides can trust — without ever needing to trust each other blindly.
EasyOwn also solves a second, related problem: some products only make sense in bulk (a 6-in-1 kit, a wholesale lot) that one buyer alone can't justify. EasyOwn lets strangers pool into the same purchase, each paying their own share, without ever needing to know or trust one another directly — the platform carries that trust.
Screenshot placeholder — replace with an actual capture of the home/hero screen once the frontend build is live.

## Table of Contents
* [Why EasyOwn Exists](#why-easyown-exists)
* [Core Concepts](#core-concepts)
* [Features](#features)
* [How It Works](#how-it-works)
* [Screens](#screens)
* [Tech Stack](#tech-stack)
* [Architecture Overview](#architecture-overview)
* [Database Schema](#database-schema)
* [Payment Integration (Paystack)](#payment-integration-paystack)
* [Transaction Verification System](#transaction-verification-system)
* [Security](#security)
* [API Reference](#api-reference)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Project Structure](#project-structure)
* [Design System](#design-system)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Author](#author)

## Why EasyOwn Exists
This project started from a personal problem. I bought an iPhone 11 (₦200,000) from a seller and paid for it in four separate installments — ₦50,000, ₦10,000, ₦20,000, ₦20,000 — tracked only in a WhatsApp chat. There was no shared record either of us could point to, no visibility into what was left, and no protection if either side disappeared mid-plan. The only things holding that transaction together were proof of location, a store live video, and trust built over time — none of which scales to strangers who've never met.
Existing installment platforms in Nigeria (EasyBuy, CDCare, and similar) solve the seller's risk problem through collateral and salary verification — but they do nothing for the buyer's experience. If anything, they deepen it: the language of "loan," "debt," and "balance owed" turns a simple purchase into something that feels shameful, and the process is often opaque about what's actually been paid and what remains.
EasyOwn exists to fix both sides at once: a transparent, shared, tamper-evident record of every payment, and language and design built around ownership gained, not debt owed.

## Core Concepts
* **Shared ledger, not two versions of the truth.** Buyer and seller see the identical payment history and running total — because it's the same underlying data, not two separately maintained balances that can drift apart or be disputed.
* **Ownership framing, not debt framing.** No "balance owed," no "loan," no "credit," no "you owe." Progress is shown as a percentage of the item already owned, and reminders are framed as keeping a streak going, not as payment-due warnings.
* **Trust without acquaintance.** The group-buy feature lets strangers pool into a bundle purchase without ever needing to contact, verify, or trust each other — EasyOwn is the trust layer between them.
* **Provable, not just promised.** Every transaction can be independently checked by anyone with the reference number, through a public Transaction Explorer — the record's integrity is verifiable, not just claimed.

## Features
### For buyers
* Browse individual listings and bundle (group-buy) listings
* See a seller's reliability signal (delivery track record, dispute history) before committing to anything
* Choose an installment plan and pay through Paystack (card, bank transfer, or virtual account)
* Track live, ownership-framed progress on a shared ledger
* Join a bundle slot in a group-buy without needing to know the other buyers
* Get streak-framed reminders, never debt-collector-style payment warnings
* Verify any transaction independently through the public Transaction Explorer

### For sellers
* List an individual item with installment terms (number of payments, minimum first payment, deadline)
* List a bundle/group-buy item with slot count, price per slot, and a fill deadline
* See the exact same shared ledger view as the buyer — no separate, disputable seller-side numbers
* Build a reliability score automatically from real delivery and dispute data — not self-reported, not editable
* Get paid out automatically as slots fill or installments land, via Paystack Split Payments

### Platform-wide
* Append-only, tamper-evident payment ledger
* Public, no-login Transaction Explorer for independent verification
* In-app "How EasyOwn Works" and Help documentation, served as content (not hardcoded), so it can be corrected without a redeploy
* Dispute flow with a defined resolution state machine
* Notification preferences per channel, per event type

## How It Works
1. A seller lists an item or a bundle. For an item: price and installment terms. For a bundle: number of slots, price per slot, and a fill deadline.
2. A buyer commits. They pick a plan (or a bundle slot) and make a first payment through Paystack.
3. Every payment lands on a shared ledger. Both buyer and seller see the same numbers, the same history, and the same live ownership percentage — there is no separate "seller view" of the balance.
4. Progress is framed as ownership, not debt. "You own 62%" instead of "You owe ₦76,000." Reminders say "keep your plan going," not "payment overdue."
5. A missed payment triggers a grace period, not a penalty. The plan pauses; it doesn't default automatically.
6. For bundles, the app fills the slots. Once all slots are paid, the bundle is confirmed and fulfillment is coordinated. If the deadline passes unfilled, every buyer is refunded automatically.
7. Anyone can verify a transaction. Using the transaction reference (or a QR code from the receipt), anyone can look it up in the public Transaction Explorer and see that the record is genuine and hasn't been altered — without needing to trust EasyOwn's word for it.

## Screens
| Screen | Purpose |
| :--- | :--- |
| Splash | Brand mark animates into its "filled" state on load |
| Onboarding (3 screens) | Explains installments, the shared ledger, and group-buy |
| Home / Hero Dashboard | The user's own ownership progress, front and center |
| Create Listing | Seller flow — item, price, installment terms, photos |
| Create Bundle | Seller flow — slots, price per slot, deadline |
| Browse Listings & Bundles | Buyer flow, with seller reliability signal visible |
| Plan Selection & Payment | Buyer commits and pays the first installment via Paystack |
| Shared Ledger | Identical buyer/seller view of full payment history and progress |
| Bundle-Fill Status | Live slot-fill count, countdown, refund-if-unfilled messaging |
| Streak / Reminder | Progress-framed reminders, not payment-due warnings |
| Profile & Settings | Account info, payment methods, notification preferences |
| Seller Reliability Dashboard | Delivery track record and dispute history, seller-facing |
| Help / How It Works | Plain-language reference, reopenable anytime |
| Transaction Explorer | Public, no-login lookup by reference or QR code |

## Tech Stack
### Frontend
* React + Vite + TypeScript
* Tailwind CSS
* Custom icon system and design tokens (see Design System)

### Backend
* Node.js + Express (or Fastify)
* TypeScript
* Supabase (Auth + Postgres, with Row-Level Security as the enforcement layer)

### Payments
* Paystack Plans / Subscriptions — installment scheduling
* Paystack Split Payments — group-buy slot collection and seller payout
* Paystack Virtual Accounts — bank transfer payments

### Verification layer
* SHA-256 hash-chained ledger entries (tamper-evident, append-only)
* Periodic root-hash anchoring on Base (reusing existing wallet/contract infrastructure from the Grind project)

## Architecture Overview
```
┌──────────────┐      ┌───────────────────┐      ┌──────────────┐
│ Frontend     │◄────►│ Backend           │◄────►│ Paystack     │
│ React/Vite/  │ REST │ Node/Express + TS │ API+ │ (Plans,      │
│ Tailwind     │ API  │ Supabase (Auth,   │webhook Split Pay,   │
└──────────────┘      │ Postgres, RLS)    │      │ Virtual Acc) │
                      └─────────┬─────────┘      └──────────────┘
                                │
                      ┌─────────▼─────────┐
                      │ Ledger Engine     │
                      │ append-only, hash-│
                      │ chained per plan  │
                      └─────────┬─────────┘
                                │ daily root-hash anchor
                      ┌─────────▼─────────┐
                      │ Base              │
                      │ (reused Grind     │
                      │  infra)           │
                      └───────────────────┘
```
Everything a buyer or seller sees comes from one source of truth — the ledger — queried the same way for both parties. The verification layer sits underneath the ledger and doesn't change how the product feels to use; it changes what can be proven if anyone ever asks.

## Database Schema
High-level table overview (see `/schema` in the backend repo for full migrations):

| Table | Purpose |
| :--- | :--- |
| `users` | Buyer/seller accounts, role-aware profile data |
| `listings` | Individual items for sale on an installment plan |
| `bundles` | Group-buy listings with slot count and deadline |
| `bundle_slots` | Individual slot claims within a bundle |
| `plans` | An active installment agreement between a buyer and a listing |
| `ledger_entries` | Append-only payment events; each stores a hash of itself + the previous entry |
| `anchors` | Daily root-hash records and their on-chain reference |
| `disputes` | Dispute records and resolution state |
| `reliability_scores` | Derived, read-only seller reliability data |
| `notification_preferences` | Per-user, per-channel, per-event settings |
| `help_content` | Versioned content for in-app Help/How It Works sections |
| `audit_log` | Every state-changing action across the platform |

## Payment Integration (Paystack)
EasyOwn uses Paystack for all money movement — no raw card data ever touches the EasyOwn backend.
Installments are modeled through Paystack's Plans/Subscriptions API, charging the buyer's saved authorization on each scheduled installment.
Group-buy payments use Paystack Split Payments, so each buyer's slot payment is collected individually and the seller's payout is calculated and released automatically once a bundle is fully funded.
Bank transfer payers are issued a Paystack Virtual Account, so no card is required to participate in a plan.
Webhooks are the source of truth for payment confirmation. Every webhook is signature-verified before processing, and processing is idempotent — a retried webhook event can never double-credit a payment.
Reconciliation runs on a schedule, cross-checking Paystack's own transaction records against the local ledger and flagging any mismatch rather than assuming the webhook always arrives.

## Transaction Verification System
Every ledger entry is chained: each entry's stored value is a hash of its own data plus the hash of the entry before it. Altering any past entry breaks every hash that follows it, which means the record is tamper-evident by construction, not by policy.
Once a day, the current root hash across the platform is anchored on Base, reusing the wallet and contract infrastructure already built for the Grind project. This gives EasyOwn an externally checkable proof point that its records haven't been quietly altered — a genuine capability EasyBuy/CDCare- style platforms don't offer.
Anyone — buyer, seller, or an uninvolved third party — can verify a transaction using its reference number or a QR code from the receipt, via the public Transaction Explorer. No login required.
Two important design decisions here:
* Privacy first. The explorer never shows a full name, phone number, or address — buyers and sellers are shown as masked identifiers (e.g. Buyer #A93F). Verifiability doesn't require exposing anyone's identity.
* Plain language, not crypto language. The underlying mechanism is a hash-chain anchored on-chain, but nothing in the user-facing product says "blockchain," "hash," "on-chain," or "crypto." Users see "Verified ✓" and a plain sentence explaining what that means. A collapsed "technical details" section (labeled "verification code" and "record ID") exists for the rare curious user or reviewer who wants to look deeper. The guarantee is real; the vocabulary describing it is ordinary.

## Security
* Append-only ledger — balances are always derived by summing entries, never stored and mutated directly
* Paystack webhook signature verification (HMAC) on every incoming webhook
* Idempotent webhook processing via stored Paystack event IDs
* Explicit state machines with allowed-transition tables for both the installment plan lifecycle and the dispute lifecycle — no undefined state jumps
* Row-Level Security policies in Supabase as the actual enforcement layer, not just application-level checks
* No raw card data ever touches the backend — Paystack's hosted flow handles it; EasyOwn only ever sees tokens and references, keeping the backend outside PCI card-data scope
* Rate limiting on all public endpoints, especially payment-initiation, listing-creation, and the public verification endpoints
* Secrets (Paystack keys, Supabase service role key, webhook secret, Base wallet key) via environment variables only — never committed, never logged
* Full audit log of every state-changing action (actor, timestamp, before/after state)
* Scheduled reconciliation between Paystack's records and the local ledger
* Row-level locking / unique constraints on bundle slot claims to prevent two buyers from ever claiming the same slot under concurrent requests
* Atomic refund-all transaction for bundles that don't fill before their deadline

## API Reference
High-level endpoint groups (full request/response schemas live in `/docs/api` once generated from the backend):

| Group | Examples |
| :--- | :--- |
| Auth | Sign up, log in, session management (Supabase Auth) |
| Listings | Create/browse individual listings |
| Bundles | Create/browse bundles, claim a slot |
| Plans | Select a plan, initiate an installment payment |
| Ledger | Get shared payment history for a plan |
| Verification | `GET /verify/:transactionRef` — public, no-auth |
| Reliability | Get a seller's derived reliability score |
| Disputes | Open, review, and resolve a dispute |
| Profile & Settings | Get/update profile, manage payment methods |
| Notifications | Get/update per-channel, per-event preferences |
| Help Content | Get versioned in-app help/documentation content |
| Webhooks | Paystack webhook receiver (signature-verified, idempotent) |

## Getting Started
```bash
# Clone the repository
git clone https://github.com/GoodnessFx/EasyOwn.git
cd EasyOwn

# Install dependencies
pnpm install

# Frontend
pnpm --filter web dev

# Backend
pnpm --filter server dev
```
Create a `.env` file in the backend directory using the template in Environment Variables before starting the server.

## Environment Variables
```env
# Server
PORT=3001
CLIENT_ORIGIN=http://localhost:5173

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Paystack
PAYSTACK_SECRET_KEY=your_paystack_secret_key
PAYSTACK_PUBLIC_KEY=your_paystack_public_key
PAYSTACK_WEBHOOK_SECRET=your_webhook_secret

# Base / anchoring
BASE_RPC_URL=your_base_rpc_url
BASE_WALLET_PRIVATE_KEY=your_wallet_private_key
BASE_ANCHOR_CONTRACT_ADDRESS=your_contract_address
```
Never commit a populated `.env` file. Use `.env.example` as the tracked reference.

## Project Structure
```
EasyOwn/
├── apps/
│   ├── web/           # React + Vite + Tailwind frontend
│   └── server/        # Node/Express backend
├── packages/
│   └── verification/  # Hash-chain + on-chain anchoring logic
├── docs/
│   ├── images/        # Screenshots referenced in this README
│   └── api/           # Generated API reference
├── schema/            # Postgres migrations
├── README.md
└── LICENSE
```

## Design System
Full design system (type scale, color tokens, spacing, component variants, icon set, and logo usage rules) is maintained in the Figma file linked below. The brand direction is built around one thesis: ownership, not debt — every typography, color, and motion choice is justified against that idea rather than defaulting to standard fintech conventions.
Figma file: link to be added once published
Primary metaphor: a progress/fill state, used consistently across listing cards, the payment screen, the bundle-fill state, and the home dashboard
No emoji used as icons — a custom icon set built on a consistent stroke weight and corner radius matching the logo mark
Screenshot placeholder — replace with an export of the Figma design system page once available.

## Roadmap
* [ ] Core installment flow (listing → plan → payment → shared ledger)
* [ ] Group-buy / bundle flow
* [ ] Public Transaction Explorer
* [ ] Seller reliability scoring
* [ ] Dispute resolution flow
* [ ] In-app Help/How It Works content system
* [ ] Notification preferences and streak reminders
* [ ] Base anchoring of ledger root hashes
* [ ] Post-MVP: richer delivery tracking, expanded dispute mediation, wider payment method support

## Contributing
This project is currently in active early-stage development. If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes with clear messages
4. Open a pull request describing what changed and why

Please keep the "ownership, not debt" language rule in mind for any user-facing copy changes, and avoid introducing blockchain/crypto terminology into any public-facing text (see Transaction Verification System).

## License
This project is licensed under the MIT License — see the LICENSE file for details.
MIT License
Copyright (c) 2026 Goodness Iyamah
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Author
**Goodness Iyamah (IG)**
Full-stack developer, smart contract auditor, and founder — Nigeria
GitHub: [@GoodnessFx](https://github.com/GoodnessFx)
Email: goodnessiyamah1@gmail.com
Related project: Grind — a campus gig marketplace with smart-contract escrow, whose contract and wallet infrastructure EasyOwn's verification system reuses
Built to make buying in stages feel like progress, not shame.
