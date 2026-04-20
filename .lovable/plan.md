
# MyLove — Landing Page + Form Flow

## Brand Setup
- Add Playfair Display + DM Sans from Google Fonts
- Update CSS design tokens: pink `#E8456B`, blush `#FFF0F3`, gold `#D4AF37`, dark `#1A1A2E`
- Copy all 8 Cisy mascot PNGs into `src/assets/`

## Landing Page (`/`)
1. **Hero** — Blush background, headline "Transforme uma história em presente", subheadline, "Criar agora" CTA (scrolls to pricing), Cisy waving
2. **How It Works** — 3 illustrated steps (preencha, receba, compartilhe) with Cisy writing next to step 1
3. **Preview** — "Veja como fica" with a stylized mockup of a retrospective page, Cisy excited
4. **Pricing** — Two cards side-by-side: "Só Hoje" R$19,90 and "Para Sempre" R$39,90 (highlighted). CTAs link to Yampi checkout URLs. Cisy holding heart near highlighted card
5. **Footer** — "MyLove © 2026 · Feito com 🦢"

## Form Page (`/criar`)
- Fields: sender name, receiver name, how you met, favorite memory, what they mean to you, one word for the story, optional photo upload (up to 3)
- "Gerar minha retrospectiva" CTA
- Cisy writing pose beside the form
- Form data saved to Supabase `retrospectives` table

## Loading Page (`/gerando`)
- Animated loading with pulsing/spinning Cisy thinking pose
- Text: "A Cisy está montando a história de vocês... 🦢"
- Auto-redirects to retrospective page after save completes

## Retrospective Page (`/retro/:id`)
- Dark background `#1A1A2E`, full-screen animated reveal
- Each answer appears as a card with fade-in animations, gold & pink accents
- Uploaded photos displayed between cards
- "Compartilhar presente" share button at the end
- Cisy celebrating pose

## Database (Lovable Cloud / Supabase)
- `retrospectives` table: id, sender_name, receiver_name, how_met, favorite_memory, meaning, one_word, photos (array of URLs), created_at
- Storage bucket for photo uploads
- RLS: public read by id, authenticated insert

## Extras
- Mobile-first responsive design throughout
- Smooth scroll + fade-in animations (Intersection Observer)
- Meta Pixel placeholder in `index.html` `<head>` (empty ID, ready to fill)
