import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SkyBackground from "@/components/SkyBackground";
import { supabase } from "@/integrations/supabase/client";
import cisyComemorando from "@/assets/cisy-comemorando.png";

interface Retro {
  id: string;
  title: string | null;
  relationship_type: string | null;
  song_name: string | null;
  song_artist: string | null;
  message: string | null;
  photos: string[] | null;
  start_date: string | null;
  created_at: string;
}

const RevealCard = ({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as any }}
      className={`mx-auto w-full max-w-[700px] ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
};

const Retro = () => {
  const { id } = useParams();
  const [data, setData] = useState<Retro | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase.from("retrospectives").select("*").eq("id", id).single().then(({ data }) => {
      setData(data as any);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <SkyBackground />
        <div className="loading-dots relative z-10"><span /><span /><span /></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <SkyBackground />
        <div className="relative z-10 text-center">
          <p className="font-display text-2xl text-dark">Retrospectiva não encontrada</p>
        </div>
      </div>
    );
  }

  const counter = (() => {
    if (!data.start_date) return null;
    const days = differenceInDays(new Date(), new Date(data.start_date));
    if (days < 0) return null;
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const restDays = days - years * 365 - months * 30;
    return { years, months, days: restDays };
  })();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: data.title || "MyLove", url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copiado!");
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden py-10 px-4">
      <SkyBackground />

      <div className="relative z-10 space-y-6">
        {/* COVER */}
        <RevealCard>
          <div className="relative overflow-hidden p-10 text-center" style={{ background: "#1A1A2E", borderRadius: 24 }}>
            <div className="mb-3 text-xs uppercase tracking-[3px]" style={{ color: "#D4AF37" }}>✦ MyLove ✦</div>
            <h1 className="font-display text-3xl font-bold md:text-5xl" style={{ color: "#D4AF37" }}>
              {data.title}
            </h1>
            {data.relationship_type && (
              <p className="mt-4 text-sm capitalize" style={{ color: "rgba(255,255,255,0.6)" }}>
                Presente {data.relationship_type === "love" ? "de Amor" : data.relationship_type === "friend" ? "para Amiga" : `para ${data.relationship_type}`}
              </p>
            )}
            <img src={cisyComemorando} alt="" className="absolute -bottom-2 right-2 w-[110px] opacity-90" />
          </div>
        </RevealCard>

        {/* MUSIC */}
        {data.song_name && (
          <RevealCard>
            <div className="flex items-center gap-4 p-6" style={{ background: "#1A1A2E", borderRadius: 24 }}>
              <div className="h-20 w-20 shrink-0 rounded-md bg-gradient-to-br from-pink-400 via-rose-500 to-amber-500" />
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg font-bold truncate" style={{ color: "#D4AF37" }}>{data.song_name}</div>
                <div className="text-xs truncate" style={{ color: "rgba(255,255,255,0.6)" }}>{data.song_artist}</div>
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full" style={{ background: "#D4AF37" }} animate={{ width: ["0%", "100%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                </div>
                <div className="mt-2 flex h-6 items-end">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span key={i} className="wave-bar" style={{ animationDelay: `${i * 0.07}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </RevealCard>
        )}

        {/* MESSAGE */}
        {data.message && (
          <RevealCard>
            <div className="card-soft p-10" style={{ borderTop: "3px solid #E8456B", borderRadius: 24 }}>
              <div className="mb-4 font-display text-6xl leading-none" style={{ color: "#D4AF37" }}>"</div>
              <p className="font-display text-xl italic leading-relaxed md:text-2xl" style={{ color: "#333" }}>
                {data.message}
              </p>
            </div>
          </RevealCard>
        )}

        {/* COUNTER */}
        {counter && (
          <RevealCard>
            <div className="relative overflow-hidden p-10 text-center" style={{ background: "#FFF0F3", borderRadius: 24 }}>
              <div className="font-display text-3xl font-bold md:text-5xl">
                <span style={{ color: "#E8456B" }}>{counter.years}</span> <span className="text-base" style={{ color: "#999" }}>anos</span>
                <span className="mx-2" style={{ color: "#D4AF37" }}>·</span>
                <span style={{ color: "#E8456B" }}>{counter.months}</span> <span className="text-base" style={{ color: "#999" }}>meses</span>
                <span className="mx-2" style={{ color: "#D4AF37" }}>·</span>
                <span style={{ color: "#E8456B" }}>{counter.days}</span> <span className="text-base" style={{ color: "#999" }}>dias</span>
              </div>
              <p className="mt-3 text-sm" style={{ color: "#666" }}>juntos até hoje 🦢</p>
              {data.start_date && (
                <p className="mt-1 text-xs" style={{ color: "#999" }}>desde {format(new Date(data.start_date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</p>
              )}
            </div>
          </RevealCard>
        )}

        {/* GALLERY */}
        {data.photos && data.photos.length > 0 && (
          <RevealCard>
            <div className="card-soft p-8" style={{ borderRadius: 24 }}>
              <h2 className="mb-6 text-center font-display text-2xl font-bold text-dark">Nossos momentos</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {data.photos.map((url, i) => (
                  <div key={i} className="overflow-hidden rounded-xl shadow-md" style={{ transform: `rotate(${i % 2 === 0 ? -1.5 : 1.5}deg)` }}>
                    <img src={url} alt="" className="aspect-square w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </RevealCard>
        )}

        {/* FINAL */}
        <RevealCard>
          <div className="text-center p-8">
            <div className="relative mx-auto mb-4 w-[160px]">
              <div className="cisy-glow" />
              <img src={cisyComemorando} alt="" className="cisy-float relative w-[160px]" />
            </div>
            <h2 className="mb-6 font-display text-2xl font-bold text-dark md:text-3xl">
              A história de vocês está pronta 🦢
            </h2>
            <button
              onClick={handleShare}
              className="mx-auto block w-full max-w-[400px] rounded-full gradient-pink-gold py-4 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Compartilhar presente
            </button>
            <p className="mt-4 text-xs" style={{ color: "#999" }}>Este link é eterno. Guarde com carinho.</p>
          </div>
        </RevealCard>
      </div>
    </div>
  );
};

export default Retro;
