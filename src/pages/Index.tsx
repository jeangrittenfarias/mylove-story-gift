import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import SkyBackground from "@/components/SkyBackground";
import cisyAnotando from "@/assets/cisy-anotando.png";
import cisyEmpolgada from "@/assets/cisy-empolgada.png";
import cisyComemorando from "@/assets/cisy-comemorando.png";
import cisyCoracao from "@/assets/cisy-segurando-coracao.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as any } },
};

const Section = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className} style={style}>
      {children}
    </motion.section>
  );
};

const PREVIEW_CARDS = [
  { emoji: "💛", title: "Como tudo começou", body: "Nos conhecemos numa festa em 2022. Você riu do meu tropeço e eu soube que era você.", footer: "Ana & Pedro · 3 anos juntos" },
  { emoji: "🌸", title: "Nossa memória favorita", body: "Aquela viagem de última hora para o litoral. Choveu o dia todo e foi o melhor dia da nossa vida.", footer: "Ana & Pedro · 3 anos juntos" },
  { emoji: "✨", title: "O que você significa pra mim", body: "Você é a pessoa que me faz querer ser melhor. Todo dia.", footer: "Ana & Pedro · 3 anos juntos" },
];

const TESTIMONIALS = [
  { stars: 5, text: "Meu namorado chorou. Foi o melhor presente que já dei.", author: "@mariasouza_", name: "Maria Souza", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  { stars: 5, text: "Fiz para minha melhor amiga de 10 anos. Ela ficou sem palavras.", author: "@camilaoliveira", name: "Camila Oliveira", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
  { stars: 5, text: "Simples, rápido e emocionante. Vale muito mais do que paguei.", author: "@lucas.mts", name: "Lucas Matos", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
  { stars: 5, text: "Minha esposa chorou nos primeiros 30 segundos. Worth it!", author: "@feliperodrigues", name: "Felipe Rodrigues", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
];

const useAutoCarousel = (length: number, delay = 5000) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % length), delay);
    return () => clearInterval(t);
  }, [length, delay]);
  return [i, setI] as const;
};

const STEP_CARDS = [
  {
    n: "01",
    title: "Preencha com Carinho",
    desc: "Conte a história de vocês, escolha músicas, fotos e a data.",
    badge: "⏱️ ~2-3 minutos",
    bg: "#FFF0F3",
    accent: "#E8456B",
    cisy: cisyAnotando,
  },
  {
    n: "02",
    title: "Receba na Hora",
    desc: "Sua retrospectiva fica pronta em segundos, com link único.",
    badge: "✨ Instantâneo",
    bg: "#FFF8E1",
    accent: "#D4AF37",
    cisy: cisyEmpolgada,
  },
  {
    n: "03",
    title: "Compartilhe",
    desc: "Envie o link. Veja a reação. Garanta emoção 🦢",
    badge: "💔 → 😭 → 😍",
    bg: "#E8F4FD",
    accent: "#4A90E2",
    cisy: cisyComemorando,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [previewIdx, setPreviewIdx] = useAutoCarousel(PREVIEW_CARDS.length);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <SkyBackground />

      <header className="sticky top-0 z-40 backdrop-blur-md" style={{ background: "rgba(255,255,255,0.8)", borderBottom: "1px solid rgba(232,69,107,0.1)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <div className="font-display text-xl font-bold text-dark"><span className="mr-1">🦢</span>MyLove</div>
          <button onClick={() => navigate("/criar")} className="rounded-full gradient-pink-gold px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:scale-105">
            Criar presente
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 flex min-h-[calc(100vh-60px)] items-center px-5">
        <div className="mx-auto w-full max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[4px]" style={{ color: "#E8456B" }}>🦢 MyLove</p>
            <h1 className="mb-5 font-display text-[36px] font-bold leading-tight text-dark md:text-[60px]">
              Transforme uma história em <span className="wavy-underline" style={{ color: "#E8456B" }}>presente</span>
            </h1>
            <p className="mx-auto mb-8 max-w-[520px] text-[16px] leading-[1.7]" style={{ color: "#555" }}>
              Crie uma retrospectiva que vai fazer ela chorar. Não é só um presente — é uma viagem pelos momentos que realmente importam.
            </p>

            {/* STATS */}
            <div className="mx-auto mb-8 grid max-w-xl grid-cols-3 gap-4">
              {[
                { v: "4.200+", l: "Casais já criaram" },
                { v: "8 min", l: "Tempo médio" },
                { v: "4.9★", l: "1.2k reviews" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-white/70 p-3 backdrop-blur-sm" style={{ border: "1px solid rgba(232,69,107,0.12)" }}>
                  <div className="font-display text-xl font-bold md:text-2xl" style={{ color: "#E8456B" }}>{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider md:text-xs" style={{ color: "#999" }}>{s.l}</div>
                </div>
              ))}
            </div>

            <button onClick={() => navigate("/criar")} className="rounded-full gradient-pink-gold px-9 py-4 text-lg font-semibold text-white transition hover:scale-105" style={{ boxShadow: "0 8px 30px rgba(232,69,107,0.4)" }}>
              Criar agora 🦢
            </button>
            <p className="mt-4 text-sm" style={{ color: "#E8456B" }}>🦢 +200 histórias criadas hoje</p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <Section className="relative z-10 bg-white py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-dark md:text-4xl">Como funciona? <span className="text-base font-normal" style={{ color: "#999" }}>(3 passos simples)</span></h2>
            <p className="text-muted-foreground">Sua história vira um presente inesquecível em minutos.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEP_CARDS.map((s) => (
              <div
                key={s.n}
                className="relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1 hover:shadow-xl"
                style={{ background: s.bg, border: `1px solid ${s.accent}20` }}
              >
                <div className="font-display text-6xl font-bold leading-none opacity-30" style={{ color: s.accent }}>{s.n}</div>
                <h3 className="mt-3 font-display text-xl font-bold text-dark">{s.title}</h3>
                <p className="mt-2 min-h-[48px] text-sm" style={{ color: "#555" }}>{s.desc}</p>

                {/* Cisy inside the card */}
                <div className="my-4 flex justify-center">
                  <img src={s.cisy} alt="" className="h-[140px] w-auto object-contain drop-shadow-lg" />
                </div>

                <div className="rounded-full px-3 py-1.5 text-center text-xs font-semibold" style={{ background: "#fff", color: s.accent, border: `1px solid ${s.accent}30` }}>
                  {s.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PREVIEW CAROUSEL */}
      <Section className="relative z-10 py-20 px-5" style={{ background: "#FFF0F3" }}>
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-center font-display text-3xl font-bold text-dark md:text-4xl">Veja como fica</h2>
          <p className="mb-12 text-center text-muted-foreground">Um presente digital, cheio de detalhes e emoção.</p>
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto]">
            <div>
              <div className="overflow-hidden rounded-3xl">
                <motion.div className="flex" animate={{ x: `-${previewIdx * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }}>
                  {PREVIEW_CARDS.map((c, i) => (
                    <div key={i} className="w-full shrink-0 px-2">
                      <div className="mx-auto max-w-md card-soft border-t-[3px] p-8" style={{ borderTopColor: "#E8456B" }}>
                        <div className="mb-3 text-3xl">{c.emoji}</div>
                        <h3 className="mb-3 font-display text-2xl font-bold" style={{ color: "#E8456B" }}>{c.title}</h3>
                        <p className="mb-6 leading-relaxed" style={{ color: "#555" }}>{c.body}</p>
                        <p className="text-xs" style={{ color: "#999" }}>{c.footer}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-4">
                <button onClick={() => setPreviewIdx((previewIdx - 1 + PREVIEW_CARDS.length) % PREVIEW_CARDS.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow transition hover:scale-110" aria-label="Anterior">←</button>
                <div className="flex items-center gap-2">
                  {PREVIEW_CARDS.map((_, i) => (
                    <button key={i} onClick={() => setPreviewIdx(i)} className="h-2 rounded-full transition-all" style={{ width: i === previewIdx ? 24 : 8, background: i === previewIdx ? "#E8456B" : "#E8456B40" }} />
                  ))}
                </div>
                <button onClick={() => setPreviewIdx((previewIdx + 1) % PREVIEW_CARDS.length)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow transition hover:scale-110" aria-label="Próximo">→</button>
              </div>
            </div>
            <img src={cisyEmpolgada} alt="Cisy empolgada" className="hidden w-[200px] md:block" />
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS — grid */}
      <Section className="relative z-10 bg-white py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-dark md:text-4xl">O que estão dizendo 🦢</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card-soft flex flex-col items-center p-6 text-center transition hover:-translate-y-1">
                <img src={t.avatar} alt={t.name} className="mb-3 h-16 w-16 rounded-full object-cover ring-2 ring-pink-200" loading="lazy" />
                <div className="mb-2 text-sm" style={{ color: "#D4AF37" }}>{"★".repeat(t.stars)}</div>
                <p className="mb-4 font-display text-sm italic leading-relaxed" style={{ color: "#333" }}>"{t.text}"</p>
                <div className="mt-auto">
                  <p className="text-sm font-semibold text-dark">{t.name}</p>
                  <p className="text-xs" style={{ color: "#E8456B" }}>{t.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section className="relative z-10 py-20 px-5">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-3 text-center font-display text-3xl font-bold text-dark md:text-4xl">Escolha seu presente</h2>
          <p className="mb-12 text-center text-muted-foreground">Comece agora — sua história está esperando.</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="card-soft p-8" style={{ borderColor: "rgba(232,69,107,0.2)" }}>
              <h3 className="mb-2 font-display text-2xl font-bold text-dark">Só Hoje</h3>
              <p className="mb-6 text-sm text-muted-foreground">Perfeito para uma surpresa rápida.</p>
              <div className="mb-6 font-display text-5xl font-bold text-dark">R$19<span className="text-2xl">,90</span></div>
              <ul className="mb-8 space-y-2 text-sm" style={{ color: "#555" }}>
                <li>✦ Página personalizada</li>
                <li>✦ Link válido por 24h</li>
                <li>✦ Compartilhamento fácil</li>
              </ul>
              <a href="https://mylove7.pay.yampi.com.br/r/GH61DX22LY" target="_blank" rel="noopener noreferrer" className="block rounded-full gradient-pink-gold py-3 text-center font-semibold text-white shadow-md transition hover:scale-[1.02]">Quero esse</a>
            </div>

            <div className="relative card-soft p-8" style={{ border: "2px solid #D4AF37", boxShadow: "0 8px 40px rgba(212,175,55,0.2)" }}>
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: "#D4AF37" }}>Mais Escolhido 🦢</span>
              <h3 className="mb-2 font-display text-2xl font-bold text-dark">Para Sempre</h3>
              <p className="mb-6 text-sm text-muted-foreground">A história que dura para sempre.</p>
              <div className="mb-6 font-display text-5xl font-bold text-dark">R$39<span className="text-2xl">,90</span></div>
              <ul className="mb-8 space-y-2 text-sm" style={{ color: "#555" }}>
                <li>✦ Tudo do plano básico</li>
                <li>✦ Linha do tempo completa</li>
                <li>✦ Galeria de fotos</li>
                <li>✦ Música personalizada</li>
                <li>✦ Contador de tempo juntos</li>
                <li>✦ Link vitalício</li>
              </ul>
              <div className="flex items-center gap-4">
                <a href="https://mylove7.pay.yampi.com.br/r/FNDL52RTGI" target="_blank" rel="noopener noreferrer" className="block flex-1 rounded-full gradient-pink-gold py-3 text-center font-semibold text-white shadow-md transition hover:scale-[1.02]">Quero para sempre</a>
                <img src={cisyCoracao} alt="" className="hidden w-[100px] md:block" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <footer className="relative z-10 mt-10 px-5 py-12 text-white" style={{ background: "#1A1A2E" }}>
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-4 text-3xl">🦢</div>
          <div className="mb-2 font-display text-2xl font-bold">MyLove</div>
          <p className="mb-6 text-sm opacity-70">Transforme uma história em presente.</p>
          <a href="https://wa.me/" className="inline-block rounded-full border border-white/20 px-5 py-2 text-sm transition hover:bg-white/10">Dúvidas? Fale conosco no WhatsApp</a>
          <p className="mt-8 text-xs opacity-50">MyLove © 2026 · Feito com 🦢</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
