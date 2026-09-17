-- Bundles Table (Group Buy)
CREATE TABLE public.bundles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES public.listings(id),
    total_slots INT NOT NULL CHECK (total_slots > 1),
    price_per_slot NUMERIC NOT NULL CHECK (price_per_slot > 0),
    fill_deadline TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.bundles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view bundles." ON public.bundles FOR SELECT USING ( true );

-- Bundle Slots Table
CREATE TABLE public.bundle_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bundle_id UUID NOT NULL REFERENCES public.bundles(id),
    buyer_id UUID NOT NULL REFERENCES public.users(id),
    slot_number INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'claimed',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(bundle_id, slot_number) -- strict row-level lock equivalent for slot claiming
);

ALTER TABLE public.bundle_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view bundle slots." ON public.bundle_slots FOR SELECT USING ( true );
CREATE POLICY "Buyers can claim slots." ON public.bundle_slots FOR INSERT WITH CHECK ( auth.uid() = buyer_id );

-- Plans Table (Installment Agreements)
CREATE TABLE public.plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buyer_id UUID NOT NULL REFERENCES public.users(id),
    listing_id UUID NOT NULL REFERENCES public.listings(id),
    status plan_status NOT NULL DEFAULT 'created',
    total_amount NUMERIC NOT NULL,
    amount_paid NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers can view their own plans." ON public.plans FOR SELECT USING ( auth.uid() = buyer_id );
CREATE POLICY "Sellers can view plans for their listings." ON public.plans FOR SELECT USING ( 
    EXISTS (SELECT 1 FROM public.listings l WHERE l.id = plans.listing_id AND l.seller_id = auth.uid()) 
);

-- Ledger Entries (Append Only, Hash Chained)
CREATE TABLE public.ledger_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_id UUID NOT NULL REFERENCES public.plans(id),
    amount NUMERIC NOT NULL,
    paystack_reference TEXT UNIQUE NOT NULL,
    entry_type TEXT NOT NULL, -- e.g., 'payment', 'refund'
    previous_hash TEXT,
    current_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- No UPDATE or DELETE allowed on ledger_entries
CREATE RULE prevent_ledger_update AS ON UPDATE TO public.ledger_entries DO INSTEAD NOTHING;
CREATE RULE prevent_ledger_delete AS ON DELETE TO public.ledger_entries DO INSTEAD NOTHING;

ALTER TABLE public.ledger_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Buyers can view their own ledger." ON public.ledger_entries FOR SELECT USING ( 
    EXISTS (SELECT 1 FROM public.plans p WHERE p.id = ledger_entries.plan_id AND p.buyer_id = auth.uid()) 
);
CREATE POLICY "Sellers can view ledger for their listings." ON public.ledger_entries FOR SELECT USING ( 
    EXISTS (SELECT 1 FROM public.plans p JOIN public.listings l ON p.listing_id = l.id WHERE p.id = ledger_entries.plan_id AND l.seller_id = auth.uid()) 
);

-- Anchors Table
CREATE TABLE public.anchors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    root_hash TEXT NOT NULL,
    on_chain_anchor_tx TEXT,
    anchored_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
