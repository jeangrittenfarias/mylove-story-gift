import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import cisyAcenando from "@/assets/cisy-acenando.png";
import cisyAnotando from "@/assets/cisy-anotando.png";
import cisyEmpolgada from "@/assets/cisy-empolgada.png";
import cisySegurando from "@/assets/cisy-segurando-coracao.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

/* ── Floating hearts CSS animation ── */
const floatingStyles = `
@keyframes float-heart {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
  25% { transform: translateY(-18px) rotate(8deg); opacity: 1; }
  50% { transform: translateY(-30px) rotate(-5deg); opacity: 0.7; }
  75% { transform: translateY(-14px) rotate(3deg); opacity: 0.9; }
}
.floating-heart {
  position: absolute;
  font-size: 1.2rem;
  animation: float-heart 4s ease-in-out infinite;
  pointer-events: none;
}
`;

/* ── Preview carousel data ── */
const previewCards = [
  {
    accent: "gold",
    title: "Como tudo começou 💛",
    content: "Nos conhecemos numa festa em 2022. Você riu do meu tropeço e eu soube que era você.",
    footer: "Ana & Pedro • 3 anos juntos",
  },
  {
    accent: "pink",
    title: "Nossa memória favorita 🌸",
    content: "Aquela viagem de última hora para o litoral. Choveu o dia todo e foi o melhor dia da nossa vida.",
    footer: "Ana & Pedro • 3 anos juntos",
  },
  {
    accent: "gold",
    title: "O que você significa pra mim ✨",
    content: "Você é a pessoa que me faz querer ser melhor. Todo dia.",
    footer: "Ana & Pedro • 3 anos juntos",
  },
];

const testimonials = [
  { text: "Meu namorado chorou quando abriu. Melhor presente que já dei.", author: "@mariasouza_" },
  { text: "Fiz para minha melhor amiga de 10 anos. Ela ficou sem palavras.", author: "@camilaoliveira" },
  { text: "Simples, rápido e emocionante. Vale muito mais do que paguei.", author: "@lucas.mts" },
];

/* ── Carousel hook ── */
function useSimpleCarousel(length: number, autoMs = 4000) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval>>();
  const reset = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % length), autoMs);
  };
  useEffect(() => { reset(); return () => clearInterval(timer.current); }, [length]);
  const go = (n: number) => { setIdx(((n % length) + length) % length); reset(); };
  return { idx, go, prev: () => go(idx - 1), next: () => go(idx + 1) };
}

const Index = () => {
  const navigate = useNavigate();
  const preview = useSimpleCarousel(previewCards.length);
  const social = useSimpleCarousel(testimonials.length, 5000);

  return (
    <div className="min-h-screen font-body">
      <style>{floatingStyles}</style>

      {/* ═══════ HERO ═══════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-4" style={{ background: "linear-gradient(180deg, #FFF0F3 0%, #FFFFFF 100%)" }}>
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:justify-between">
          <motion.div className="max-w-xl text-center md:text-left" initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-[56px]" variants={fadeInUp}>
              Transforme uma história em{" "}
              <span className="relative text-primary">
                presente
                <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-primary/30" />
              </span>
            </motion.h1>
            <motion.p className="mx-auto mt-5 max-w-[480px] text-lg text-[#666] md:mx-0 md:text-xl" variants={fadeInUp}>
              Crie uma retrospectiva personalizada para quem você ama — casal, amizade, família
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-col items-center gap-3 md:items-start">
              <button
                onClick={() => navigate("/criar")}
                className="rounded-[50px] px-10 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, #E8456B 0%, #D4AF37 100%)" }}
              >
                Criar agora
              </button>
              <span className="text-sm text-muted-foreground">🦢 +200 histórias criadas</span>
            </motion.div>
          </motion.div>

          {/* Cisy + floating hearts */}
          <motion.div className="relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <img src={cisyAcenando} alt="Cisy acenando" className="relative z-10 w-[250px] md:w-[320px] lg:w-[360px]" style={{ minHeight: 300 }} />
            {/* floating hearts */}
            {["💗", "✨", "💖", "🤍", "✨"].map((h, i) => (
              <span key={i} className="floating-heart" style={{ top: `${15 + i * 18}%`, left: `${-10 + i * 25}%`, animationDelay: `${i * 0.7}s` }}>{h}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="relative bg-blush px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.h2 className="mb-16 text-center font-display text-3xl font-bold text-foreground md:text-4xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Como funciona?
          </motion.h2>

          <div className="relative flex flex-col items-center gap-14 md:flex-row md:items-start md:gap-0">
            {/* Dotted connector line (desktop) */}
            <div className="absolute top-7 left-[16%] right-[16%] hidden h-0.5 border-t-2 border-dashed border-primary/25 md:block" />

            {[
              { step: "1", title: "Preencha o formulário", desc: "Conte as memórias de vocês com carinho" },
              { step: "2", title: "Receba a página", desc: "Uma retrospectiva personalizada e emocionante" },
              { step: "3", title: "Compartilhe o link", desc: "Envie como presente para quem você ama" },
            ].map((item, i) => (
              <motion.div key={i} className="relative z-10 flex flex-1 flex-col items-center text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-2xl font-bold text-white shadow-md">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 max-w-[220px] text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}

            {/* Cisy between step 1 and 2 */}
            <img src={cisyAnotando} alt="Cisy anotando" className="absolute -bottom-8 left-[22%] hidden w-[180px] md:block" style={{ zIndex: 5 }} />
          </div>
          {/* Mobile Cisy */}
          <div className="mt-8 flex justify-center md:hidden">
            <img src={cisyAnotando} alt="Cisy anotando" className="w-[150px]" />
          </div>
        </div>
      </section>

      {/* ═══════ PREVIEW ═══════ */}
      <section className="bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.h2 className="mb-14 text-center font-display text-3xl font-bold text-foreground md:text-4xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Veja como fica
          </motion.h2>

          <motion.div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            {/* Carousel */}
            <div className="relative w-full max-w-md">
              <div className="overflow-hidden rounded-[16px]">
                <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${preview.idx * 100}%)` }}>
                  {previewCards.map((card, i) => (
                    <div key={i} className="w-full flex-shrink-0 rounded-[16px] p-8" style={{ background: "#1A1A2E" }}>
                      <div className={`mb-3 h-1 w-16 rounded-full ${card.accent === "gold" ? "bg-gold" : "bg-primary"}`} />
                      <h3 className="font-display text-2xl font-bold text-white">{card.title}</h3>
                      <p className="mt-4 leading-relaxed text-white/80">{card.content}</p>
                      <p className="mt-6 text-sm text-white/50">{card.footer}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrows */}
              <button onClick={preview.prev} className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 md:-left-6">
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button onClick={preview.next} className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 md:-right-6">
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
              {/* Dots */}
              <div className="mt-5 flex justify-center gap-2">
                {previewCards.map((_, i) => (
                  <button key={i} onClick={() => preview.go(i)} className={`h-2.5 w-2.5 rounded-full transition-all ${i === preview.idx ? "w-6 bg-primary" : "bg-primary/30"}`} />
                ))}
              </div>
            </div>

            {/* Cisy empolgada */}
            <img src={cisyEmpolgada} alt="Cisy empolgada" className="w-[180px] md:w-[220px] lg:w-[260px]" />
          </motion.div>
        </div>
      </section>

      {/* ═══════ SOCIAL PROOF ═══════ */}
      <section className="bg-blush px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="mb-14 text-center font-display text-3xl font-bold text-foreground md:text-4xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            O que estão dizendo 🦢
          </motion.h2>

          <motion.div className="relative mx-auto max-w-md" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="overflow-hidden rounded-[16px]">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${social.idx * 100}%)` }}>
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0 rounded-[16px] bg-white p-8 shadow-md">
                    <div className="mb-3 text-xl text-gold">⭐⭐⭐⭐⭐</div>
                    <p className="text-lg leading-relaxed text-foreground">"{t.text}"</p>
                    <p className="mt-4 text-sm font-semibold text-muted-foreground">— {t.author}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Dots */}
            <div className="mt-5 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => social.go(i)} className={`h-2.5 w-2.5 rounded-full transition-all ${i === social.idx ? "w-6 bg-primary" : "bg-primary/30"}`} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ PRICING ═══════ */}
      <section id="pricing" className="bg-white px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.h2 className="mb-14 text-center font-display text-3xl font-bold text-foreground md:text-4xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            Escolha seu presente
          </motion.h2>

          <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-center">
            {/* Só Hoje */}
            <motion.div className="w-full max-w-sm rounded-[16px] border border-border bg-white p-8 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <h3 className="font-display text-2xl font-bold text-foreground">Só Hoje</h3>
              <p className="mt-2 text-4xl font-bold text-primary">R$19,90</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>✓ Página personalizada</li>
                <li>✓ Link por 24h</li>
                <li>✓ Compartilhamento fácil</li>
              </ul>
              <a
                href="https://mylove7.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=GH61DX22LY"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-[50px] px-6 py-3 text-center font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #E8456B 0%, #D4AF37 100%)" }}
              >
                Quero presentear
              </a>
            </motion.div>

            {/* Para Sempre */}
            <motion.div className="relative w-full max-w-sm rounded-[16px] border-2 border-gold bg-white p-8 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-5 py-1 text-xs font-bold text-white">
                MAIS ESCOLHIDO
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Para Sempre</h3>
              <p className="mt-2 text-4xl font-bold text-primary">R$39,90</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>✓ Página personalizada</li>
                <li>✓ Link vitalício</li>
                <li>✓ Compartilhamento fácil</li>
                <li>✓ Acesso eterno</li>
              </ul>
              <a
                href="https://mylove7.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=FNDL52RTGI"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-[50px] px-6 py-3 text-center font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, #E8456B 0%, #D4AF37 100%)" }}
              >
                Quero presentear
              </a>
            </motion.div>

            <img src={cisySegurando} alt="Cisy segurando coração" className="absolute -bottom-10 right-0 w-24 md:-right-20 md:bottom-4 md:w-32" />
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="px-4 py-10 text-center" style={{ background: "#1A1A2E" }}>
        <p className="text-sm text-white/70">
          Dúvidas?{" "}
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-white underline underline-offset-2 hover:text-gold">
            Fale conosco
          </a>
        </p>
        <p className="mt-2 text-sm text-white/50">MyLove © 2026 · Feito com 🦢</p>
      </footer>
    </div>
  );
};

export default Index;
