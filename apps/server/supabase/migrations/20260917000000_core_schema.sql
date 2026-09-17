-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum Types
CREATE TYPE plan_status AS ENUM ('created', 'awaiting_payment', 'partially_paid', 'fully_paid', 'grace_period', 'cancelled', 'refunded');
CREATE TYPE dispute_status AS ENUM ('open', 'under_review', 'resolved_buyer', 'resolved_seller', 'resolved_split');

-- Users Table
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile."
    ON public.users FOR SELECT
    USING ( auth.uid() = id );

CREATE POLICY "Users can update their own profile."
    ON public.users FOR UPDATE
    USING ( auth.uid() = id );

-- Listings Table
CREATE TABLE public.listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.users(id),
    title TEXT NOT NULL,
    description TEXT,
    price_total NUMERIC NOT NULL CHECK (price_total > 0),
    installment_count INT NOT NULL CHECK (installment_count > 0),
    min_first_payment NUMERIC NOT NULL CHECK (min_first_payment > 0 AND min_first_payment <= price_total),
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view listings."
    ON public.listings FOR SELECT
    USING ( true );

CREATE POLICY "Sellers can create listings."
    ON public.listings FOR INSERT
    WITH CHECK ( auth.uid() = seller_id );

CREATE POLICY "Sellers can update their listings."
    ON public.listings FOR UPDATE
    USING ( auth.uid() = seller_id );
