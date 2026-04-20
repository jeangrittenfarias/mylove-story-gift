
-- Create retrospectives table
CREATE TABLE public.retrospectives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_name TEXT NOT NULL,
  receiver_name TEXT NOT NULL,
  how_met TEXT NOT NULL,
  favorite_memory TEXT NOT NULL,
  meaning TEXT NOT NULL,
  one_word TEXT NOT NULL,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.retrospectives ENABLE ROW LEVEL SECURITY;

-- Anyone can read a retrospective by ID (public share links)
CREATE POLICY "Anyone can read retrospectives"
  ON public.retrospectives
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert (no auth required for MVP)
CREATE POLICY "Anyone can create retrospectives"
  ON public.retrospectives
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create storage bucket for photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('retrospective-photos', 'retrospective-photos', true);

-- Allow anyone to upload photos
CREATE POLICY "Anyone can upload retrospective photos"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'retrospective-photos');

-- Allow anyone to read retrospective photos
CREATE POLICY "Anyone can read retrospective photos"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'retrospective-photos');
