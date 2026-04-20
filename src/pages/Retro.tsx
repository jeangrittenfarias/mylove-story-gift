import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import cisyComemorando from "@/assets/cisy-comemorando.png";

interface Retrospective {
  id: string;
  sender_name: string;
  receiver_name: string;
  how_met: string;
  favorite_memory: string;
  meaning: string;
  one_word: string;
  photos: string[];
  created_at: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7 } },
};

const Retro = () => {
  const { id } = useParams();
  const [data, setData] = useState<Retrospective | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: retro, error } = await supabase
        .from("retrospectives")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setData(retro as Retrospective);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `MyLove — Um presente de ${data?.sender_name}`,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark font-body">
        <p className="text-blush/70">Retrospectiva não encontrada 😔</p>
      </div>
    );
  }

  const cards = [
    { label: `De ${data.sender_name} para ${data.receiver_name}`, accent: "gold" },
    { label: "Como se conheceram", value: data.how_met },
    { label: "Memória favorita", value: data.favorite_memory },
    { label: "O que significa", value: data.meaning },
    { label: "Uma palavra", value: data.one_word, big: true },
  ];

  return (
    <div className="min-h-screen bg-dark px-4 py-12 font-body">
      <div className="mx-auto max-w-lg space-y-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="rounded-2xl border border-primary/20 bg-dark p-6 shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
              {card.label}
            </p>
            {card.value && (
              <p
                className={`text-blush ${
                  card.big
                    ? "font-display text-4xl font-bold text-primary"
                    : "text-lg leading-relaxed"
                }`}
              >
                {card.value}
              </p>
            )}
          </motion.div>
        ))}

        {/* Photos */}
        {data.photos && data.photos.length > 0 && (
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
          >
            {data.photos.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Memória ${i + 1}`}
                className="rounded-xl object-cover aspect-square w-full"
              />
            ))}
          </motion.div>
        )}

        {/* Cisy + Share */}
        <motion.div
          className="flex flex-col items-center gap-6 pt-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <img
            src={cisyComemorando}
            alt="Cisy comemorando"
            className="w-32"
          />
          <button
            onClick={handleShare}
            className="rounded-full bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105"
          >
            Compartilhar presente 🎁
          </button>
          <p className="text-xs text-blush/40">
            MyLove © 2026 · Feito com 🦢
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Retro;
