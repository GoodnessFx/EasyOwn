Design and build the website frontend for EasyOwn, a guilt free installment 
purchasing platform for Nigeria, engineered against the shame and opacity of 
platforms like EasyBuy and CDCare. Buyers commit to an item and pay it off in 
installments via Paystack. Both buyer and seller see the same live "ownership" 
progress instead of a debt balance. It also supports group buy, where strangers 
pool into a bundle (for example a 6 in 1 product) without needing to know each 
other. It also includes a public Transaction Explorer where anyone can verify 
a payment is real and unaltered.

Design mandate, read this before generating anything:
Do not produce generic fintech template output. No purple to blue gradient 
hero, no stock "diverse people smiling at a phone" illustration, no glass 
morphic cards, no default Inter on white card with soft shadow layout that 
every fintech design tool converges on. No emoji used as icons anywhere, build 
or source a proper icon set instead (Lucide or Phosphor as a base is fine, but 
customize weight and style to match the brand). This has to read as the work 
of someone with strong, specific opinions, not the median output of a design 
tool.

Theme: white based. The base surface should be clean, warm white, not sterile 
hospital white, with a considered off white or warm paper tone as the true 
background rather than pure #FFFFFF everywhere. Against that quiet base, use 
one or two bold, unusual accent colors tied to the "ownership" idea (think 
earned, warm, progress toned tones such as amber, clay, deep gold, or a rich 
warm green, not the reflexive teal, blue, navy fintech trio). The white theme 
should feel premium and intentional, like empty space that is waiting to be 
filled, echoing the ownership fill metaphor itself. Justify every color choice 
against the "ownership not debt" brand thesis.

Brand identity, design this first, before any screen:
Logo: a wordmark plus a standalone mark that works at favicon size. The mark 
should visually encode filling up or becoming whole (the ownership progress 
metaphor), not a generic abstract swoosh. Show it in full color and in a 
single color version that works on the white theme.
Icon system: a small custom set of eight to twelve icons for the core actions, 
covering listing an item, creating a bundle, payment, the ledger, streaks, 
seller badges, group buy slots, and transaction verification. Keep stroke 
weight and corner radius consistent with the logo mark, not mixed from 
different icon packs.

Design direction:
Typography: one distinctive display typeface for numbers and headlines, and 
one clean workhorse typeface for body text. The progress percentage and money 
figures are the emotional core of this product and should feel considered, 
not default system font.
Core visual metaphor across the entire site is a progress or fill state, not 
a progress bar as an afterthought, but an actual design language element 
present in listing cards, the payment screen, the bundle fill state, the home 
dashboard, and the splash moment.
Motion: subtle, purposeful micro interactions on payment confirmation and 
bundle slot filled moments, since these are the emotional payoff moments and 
deserve deliberate treatment rather than a generic checkmark animation.
Responsive by design: build this as a real website, with a considered desktop 
layout as well as mobile, not a mobile screen simply stretched wider. Still 
keep performance in mind for Nigerian data and device conditions, avoid heavy 
unoptimized assets.
Design real empty states and error states for every list and dashboard screen, 
such as no listings yet, payment failed, and bundle expired unfilled. These 
get skipped by default and they are half of the real product experience.
Meet basic accessibility standards: real contrast ratios across the white 
theme and accent palette, and never rely on color alone to signal payment 
status, always pair it with an icon or text label.

Screens and sections to design:
1. Splash or landing hero, brand mark animating into its filled state, setting 
   the ownership metaphor before the user reads a single word of copy.
2. Onboarding or value proposition, three sections at most, ownership framed 
   language throughout. Never use the words loan, debt, credit, or balance 
   owed anywhere in the copy. Each section should teach one concept: how 
   installments work here, how the shared ledger works, how group buy works.
3. Home or hero dashboard, the most important screen in the file. Design a 
   genuinely inspiring hero moment, the user's own ownership progress as the 
   first thing they see, rendered as the fill metaphor at full expression, 
   not a generic welcome back banner. This should make someone want to 
   screenshot it.
4. Seller flow: create a listing (item, price, installment terms, photos) and 
   create a bundle listing (slots, price per slot, deadline).
5. Buyer flow: browse listings and bundles, with seller reliability signal 
   visible (delivery track record, dispute count) before committing to 
   anything.
6. Buyer flow: select a plan and make the first payment through Paystack.
7. Shared ledger screen, an identical view for buyer and seller, ownership 
   percent framing, full payment history, with no separate seller view versus 
   buyer view of the numbers.
8. Bundle fill screen, live slot fill state such as three of six filled, a 
   countdown to the deadline, and refund if unfilled messaging.
9. Payment reminder or streak screen, framed as keep your plan going, never 
   as a payment due warning.
10. Profile and settings, covering account info, payment methods, 
    notification preferences, a seller reliability dashboard for sellers, and 
    a short in app how EasyOwn works reference section a user can reopen at 
    any time, not just shown once at onboarding.
11. Help and documentation section, plain language explainers for how 
    installments and the shared ledger work, how group buy slot filling and 
    refunds work, what happens on a missed payment (a grace period, never a 
    penalty), and how seller reliability scores are calculated. Written and 
    laid out as part of the product, not a dumped FAQ wall.
12. Public Transaction Explorer, no login required. Let a visitor search by 
    transaction reference or scan a QR code printed on a receipt or shared 
    from the ledger screen. Never use blockchain or crypto terminology 
    anywhere in this section. No blockchain, no hash, no on chain, no 
    immutable ledger, no chain, no anchor. The underlying system is a tamper 
    evident record anchored for extra integrity, but every word the visitor 
    sees must be plain English trust language, such as Verified, this record 
    has not been changed since it was created, independently checkable, and 
    this payment is confirmed and locked. Build this in two layers. The 
    primary view, seen by everyone, shows item, amount, date, status, a clear 
    Verified badge, and one plain sentence explaining what that means, 
    designed to feel like proof rather than a technical dashboard. A 
    secondary technical details section, collapsed by default, is the only 
    place any verification reference appears, labeled verification code and 
    record ID, never hash or anchor link, meant for the rare curious visitor 
    or a reviewer who wants to look deeper, not for an average buyer's parent 
    checking a receipt.

Deliver as a clean, production ready design file with a documented design 
system covering type scale, color tokens, spacing, component variants, icon 
set, and logo usage rules, so it can be handed to a frontend engineer to build 
in React and Tailwind without guesswork. Include a short design rationale 
section inside the file explaining the brand thesis and why each major choice 
in color, metaphor, and type ties back to ownership, not debt.