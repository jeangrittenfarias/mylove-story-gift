import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import SkyBackground from "@/components/SkyBackground";
import cisyAcenando from "@/assets/cisy-acenando.png";
import cisyAnotando from "@/assets/cisy-anotando.png";
import cisyEmpolgada from "@/assets/cisy-empolgada.png";
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
  { stars: 5, text: "Meu namorado chorou quando abriu. Melhor presente que já dei.", author: "@mariasouza_" },
  { stars: 5, text: "Fiz para minha melhor amiga de 10 anos. Ela ficou sem palavras.", author: "@camilaoliveira" },
  { stars: 5, text: "Simples, rápido e emocionante. Vale muito mais do que paguei.", author: "@lucas.mts" },
];

const useAutoCarousel = (length: number, delay = 5000) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % length), delay);
    return () => clearInterval(t);
  }, [length, delay]);
  return [i, setI] as const;
};

const Index = () => {
  const navigate = useNavigate();
  const [previewIdx, setPreviewIdx] = useAutoCarousel(PREVIEW_CARDS.length);
  const [testIdx, setTestIdx] = useAutoCarousel(TESTIMONIALS.length, 6000);

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

      <section className="relative z-10 flex min-h-[calc(100vh-60px)] items-center px-5">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[4px]" style={{ color: "#E8456B" }}>🦢 MyLove</p>
            <h1 className="mb-5 font-display text-[34px] font-bold leading-tight text-dark md:text-[52px]">
              Transforme uma história em <span className="wavy-underline" style={{ color: "#E8456B" }}>presente</span>
            </h1>
            <p className="mb-8 max-w-[440px] text-[15px] leading-[1.8]" style={{ color: "#666" }}>
              Uma retrospectiva digital, emocionante e personalizada — feita pra quem você ama. Em poucos cliques, vira um presente que ninguém esquece.
            </p>
            <button onClick={() => navigate("/criar")} className="rounded-full gradient-pink-gold px-9 py-4 text-lg font-semibold text-white transition hover:scale-105" style={{ boxShadow: "0 8px 30px rgba(232,69,107,0.4)" }}>
              Criar agora 🦢
            </button>
            <p className="mt-4 text-sm" style={{ color: "#E8456B" }}>🦢 +200 histórias criadas</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative flex justify-center">
            <div className="relative">
              <div className="cisy-glow" />
              <img src={cisyAcenando} alt="Cisy acenando" className="cisy-float relative w-[220px] md:w-[280px]" />
            </div>
          </motion.div>
        </div>
      </section>

      <Section className="relative z-10 bg-white py-20 px-5">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-dark md:text-4xl">Como funciona?</h2>
          <p className="mb-14 text-muted-foreground">Em 3 passos simples, sua história vira presente.</p>
          <div className="relative grid gap-12 md:grid-cols-3">
            <div className="absolute left-[16%] right-[16%] top-12 hidden border-t-2 border-dashed md:block" style={{ borderColor: "rgba(232,69,107,0.3)" }} />
            {[
              { n: "01", title: "Preencha com carinho", desc: "Conte a história, escolha músicas, fotos e a data." },
              { n: "02", title: "Receba na hora", desc: "Sua retrospectiva pronta em segundos, com link único." },
              { n: "03", title: "Compartilhe", desc: "Envie o link e veja a reação. Garantimos lágrimas." },
            ].map((s, idx) => (
              <div key={s.n} className="relative">
                <span className="font-display text-7xl font-bold opacity-30" style={{ color: "#D4AF37" }}>{s.n}</span>
                <h3 className="mt-2 font-display text-xl font-bold text-dark">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                {idx === 0 && <img src={cisyAnotando} alt="" className="absolute -right-12 top-0 hidden w-[140px] md:block" />}
              </div>
            ))}
          </div>
        </div>
      </Section>

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

      <Section className="relative z-10 bg-white py-20 px-5">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-dark md:text-4xl">O que estão dizendo 🦢</h2>
          <div className="overflow-hidden">
            <motion.div className="flex" animate={{ x: `-${testIdx * 100}%` }} transition={{ duration: 0.6, ease: "easeInOut" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-2">
                  <div className="card-soft mx-auto max-w-md p-8 text-center">
                    <div className="mb-3" style={{ color: "#D4AF37" }}>{"★".repeat(t.stars)}</div>
                    <p className="mb-4 font-display text-lg italic" style={{ color: "#333" }}>"{t.text}"</p>
                    <p className="text-sm font-semibold" style={{ color: "#E8456B" }}>{t.author}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTestIdx(i)} className="h-2 rounded-full transition-all" style={{ width: i === testIdx ? 24 : 8, background: i === testIdx ? "#E8456B" : "#E8456B40" }} />
            ))}
          </div>
        </div>
      </Section>

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
              <a href="https://mylove7.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=GH61DX22LY" target="_blank" rel="noopener noreferrer" className="block rounded-full gradient-pink-gold py-3 text-center font-semibold text-white shadow-md transition hover:scale-[1.02]">Quero esse</a>
            </div>

            <div className="relative card-soft p-8" style={{ border: "2px solid #D4AF37", boxShadow: "0 8px 40px rgba(212,175,55,0.2)" }}>
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: "#D4AF37" }}>Mais Escolhido 🦢</span>
              <h3 className="mb-2 font-display text-2xl font-bold text-dark">Para Sempre</h3>
              <p className="mb-6 text-sm text-muted-foreground">A história que dura para sempre.</p>
              <div className="mb-6 font-display text-5xl font-bold text-dark">R$49<span className="text-2xl">,90</span></div>
              <ul className="mb-8 space-y-2 text-sm" style={{ color: "#555" }}>
                <li>✦ Tudo do plano básico</li>
                <li>✦ Linha do tempo completa</li>
                <li>✦ Galeria de fotos</li>
                <li>✦ Música personalizada</li>
                <li>✦ Contador de tempo juntos</li>
                <li>✦ Link vitalício</li>
              </ul>
              <div className="flex items-center gap-4">
                <a href="https://mylove7.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=FNDL52RTGI" target="_blank" rel="noopener noreferrer" className="block flex-1 rounded-full gradient-pink-gold py-3 text-center font-semibold text-white shadow-md transition hover:scale-[1.02]">Quero para sempre</a>
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
