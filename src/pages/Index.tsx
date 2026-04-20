import { motion } from "framer-motion";
import cisyAcenando from "@/assets/cisy-acenando.png";
import cisyAnotando from "@/assets/cisy-anotando.png";
import cisyEmpolgada from "@/assets/cisy-empolgada.png";
import cisySegurando from "@/assets/cisy-segurando-coracao.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const Index = () => {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-blush font-body">
      {/* HERO */}
      <section className="relative overflow-hidden px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <motion.div
            className="flex flex-col items-center gap-8 md:flex-row md:justify-between"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <div className="max-w-xl text-center md:text-left">
              <motion.h1
                className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl"
                variants={fadeInUp}
              >
                Transforme uma história em{" "}
                <span className="text-primary">presente</span>
              </motion.h1>
              <motion.p
                className="mt-4 text-lg text-muted-foreground md:text-xl"
                variants={fadeInUp}
              >
                Crie uma retrospectiva personalizada para quem você ama — casal,
                amizade, família
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <button
                  onClick={scrollToPricing}
                  className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-xl"
                >
                  Criar agora
                </button>
              </motion.div>
            </div>
            <motion.img
              src={cisyAcenando}
              alt="Cisy acenando"
              className="w-48 md:w-64 lg:w-72"
              variants={fadeInUp}
            />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-card px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            className="mb-16 text-center font-display text-3xl font-bold text-foreground md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Como funciona?
          </motion.h2>
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-8">
            {[
              {
                step: "1",
                title: "Preencha o formulário",
                desc: "Conte as memórias de vocês com carinho",
              },
              {
                step: "2",
                title: "Receba a página",
                desc: "Uma retrospectiva personalizada e emocionante",
              },
              {
                step: "3",
                title: "Compartilhe o link",
                desc: "Envie como presente para quem você ama",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="relative flex flex-1 flex-col items-center text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
                {i === 0 && (
                  <img
                    src={cisyAnotando}
                    alt="Cisy anotando"
                    className="mt-4 w-24 md:absolute md:-right-8 md:top-0 md:mt-0 md:w-20"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-foreground md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Veja como fica
          </motion.h2>
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            {/* Mockup */}
            <div className="mx-auto max-w-md overflow-hidden rounded-2xl border-4 border-foreground/10 bg-dark p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="h-3 w-20 rounded-full bg-gold opacity-60" />
                <div className="h-6 w-3/4 rounded bg-primary/30" />
                <div className="h-4 w-full rounded bg-primary/15" />
                <div className="h-4 w-5/6 rounded bg-primary/15" />
                <div className="mt-6 h-32 rounded-xl bg-primary/10" />
                <div className="h-4 w-2/3 rounded bg-gold/30" />
                <div className="h-4 w-full rounded bg-primary/15" />
                <div className="mt-4 flex justify-center">
                  <div className="h-10 w-36 rounded-full bg-primary/40" />
                </div>
              </div>
            </div>
            <img
              src={cisyEmpolgada}
              alt="Cisy empolgada"
              className="absolute -bottom-6 -right-2 w-28 md:-right-16 md:w-36"
            />
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-card px-4 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            className="mb-12 text-center font-display text-3xl font-bold text-foreground md:text-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Escolha seu presente
          </motion.h2>
          <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-center">
            {/* Card 1 */}
            <motion.div
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 className="font-display text-2xl font-bold text-foreground">
                Só Hoje
              </h3>
              <p className="mt-2 text-4xl font-bold text-primary">
                R$19,90
              </p>
              <p className="mt-3 text-muted-foreground">
                Link disponível por 24h
              </p>
              <a
                href="https://mylove7.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=GH61DX22LY"
                className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Quero presentear
              </a>
            </motion.div>

            {/* Card 2 — highlighted */}
            <motion.div
              className="relative w-full max-w-sm rounded-2xl border-2 border-gold bg-card p-8 shadow-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-xs font-bold text-accent-foreground">
                MAIS POPULAR
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Para Sempre
              </h3>
              <p className="mt-2 text-4xl font-bold text-primary">
                R$39,90
              </p>
              <p className="mt-3 text-muted-foreground">Link vitalício</p>
              <a
                href="https://mylove7.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=FNDL52RTGI"
                className="mt-6 block rounded-full bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-transform hover:scale-105"
              >
                Quero presentear
              </a>
            </motion.div>

            <img
              src={cisySegurando}
              alt="Cisy segurando coração"
              className="absolute -bottom-10 right-0 w-24 md:-right-20 md:bottom-4 md:w-32"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark px-4 py-8 text-center">
        <p className="font-body text-sm text-blush/70">
          MyLove © 2026 · Feito com 🦢
        </p>
      </footer>
    </div>
  );
};

export default Index;
