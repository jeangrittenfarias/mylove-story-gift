ALTER TABLE public.retrospectives
  ADD COLUMN IF NOT EXISTS relationship_type text,
  ADD COLUMN IF NOT EXISTS title text,
  ADD COLUMN IF NOT EXISTS song_name text,
  ADD COLUMN IF NOT EXISTS song_artist text,
  ADD COLUMN IF NOT EXISTS message text,
  ADD COLUMN IF NOT EXISTS start_date date,
  ALTER COLUMN how_met DROP NOT NULL,
  ALTER COLUMN favorite_memory DROP NOT NULL,
  ALTER COLUMN meaning DROP NOT NULL,
  ALTER COLUMN one_word DROP NOT NULL,
  ALTER COLUMN sender_name DROP NOT NULL,
  ALTER COLUMN receiver_name DROP NOT NULL;