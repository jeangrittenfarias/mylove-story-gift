import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SkyBackground from "@/components/SkyBackground";
import PreviewCard from "@/components/PreviewCard";
import { supabase } from "@/integrations/supabase/client";
import cisyAcenando from "@/assets/cisy-acenando.png";
import cisyPensando from "@/assets/cisy-pensando.png";
import cisyEmpolgada from "@/assets/cisy-empolgada.png";
import cisyAnotando from "@/assets/cisy-anotando.png";
import cisyCoracao from "@/assets/cisy-segurando-coracao.png";
import cisyComemorando from "@/assets/cisy-comemorando.png";

type RelType = "love" | "friend" | "family";

const RANDOM_TITLES = [
  "Nossa história de amor", "Tudo que sou é nosso", "Desde o primeiro dia", "Um amor que não tem fim",
  "Você é meu lar", "Nossa aventura juntos", "Para sempre ao seu lado", "O melhor capítulo da minha vida",
  "Você mudou tudo", "Feito um para o outro",
];

type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string | null;
  duration_ms: number;
  preview_url: string | null;
  external_url?: string;
};

const formatDuration = (ms: number) => {
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const AI_MESSAGES: Record<RelType, string> = {
  love: "Desde o primeiro dia que te vi, soube que minha vida nunca mais seria a mesma. Você não é só meu amor — você é meu lar, meu sorriso garantido, minha escolha todos os dias. Obrigado por cada momento, cada risada, cada silêncio que só nós entendemos.",
  friend: "Você é daquelas pessoas raras que a vida coloca no caminho e a gente sabe que é pra sempre. Obrigado por estar sempre aqui — nas risadas, nas fases difíceis, em tudo.",
  family: "Você moldou quem eu sou. Cada memória que tenho da minha vida mais bonita, você está lá. Obrigado por tudo que você representa para mim.",
};

const SECONDARY_TYPES = ["Mãe", "Pai", "Avó", "Irmã", "Tia", "Amigo", "Professor", "Chefe"];

const STEP_CISY = [cisyAcenando, cisyPensando, cisyEmpolgada, cisyAnotando, cisyCoracao, cisyComemorando];

const Criar = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [relationshipType, setRelationshipType] = useState<RelType | string>("");
  const [title, setTitle] = useState("");
  const [song, setSong] = useState<SpotifyTrack | null>(null);
  const [songSearch, setSongSearch] = useState("");
  const [songResults, setSongResults] = useState<SpotifyTrack[]>([]);
  const [songLoading, setSongLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [startDate, setStartDate] = useState<string>("");

  const totalSteps = 6;
  const progress = (step / totalSteps) * 100;

  // Debounced Spotify search via edge function
  useEffect(() => {
    const q = songSearch.trim();
    if (!q) { setSongResults([]); return; }
    setSongLoading(true);
    const t = setTimeout(async () => {
      try {
        const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-spotify?q=${encodeURIComponent(q)}`;
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        });
        const json = await res.json();
        setSongResults(json.tracks || []);
      } catch (e) {
        console.error(e);
        setSongResults([]);
      } finally {
        setSongLoading(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [songSearch]);

  // Tick every second so h/m/s update live
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const counter = useMemo(() => {
    if (!startDate) return null;
    const start = new Date(startDate);
    const diff = now.getTime() - start.getTime();
    if (diff < 0) return null;
    const totalDays = Math.floor(diff / 86400000);
    const years = Math.floor(totalDays / 365);
    const months = Math.floor((totalDays % 365) / 30);
    const days = totalDays - years * 365 - months * 30;
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { years, months, days, hours, minutes, seconds };
  }, [startDate, now]);

  const canNext = () => {
    if (step === 1) return !!relationshipType;
    if (step === 2) return title.trim().length > 0;
    if (step === 4) return message.trim().length > 0;
    if (step === 6) return !!startDate;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const photoUrls: string[] = [];
      for (const file of photos) {
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
        const { error } = await supabase.storage.from("retrospective-photos").upload(fileName, file);
        if (!error) {
          const { data } = supabase.storage.from("retrospective-photos").getPublicUrl(fileName);
          photoUrls.push(data.publicUrl);
        }
      }

      const { data, error } = await supabase
        .from("retrospectives")
        .insert({
          relationship_type: relationshipType,
          title,
          song_name: song?.name || null,
          song_artist: song?.artist || null,
          message,
          photos: photoUrls,
          start_date: startDate,
          // legacy required-ish placeholders kept harmless
          sender_name: "",
          receiver_name: "",
          how_met: "",
          favorite_memory: "",
          meaning: message,
          one_word: title,
        } as any)
        .select()
        .single();

      if (error) throw error;
      navigate(`/retro/${data.id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Erro ao salvar. Tente novamente.");
    }
  };

  const next = () => (step < totalSteps ? setStep(step + 1) : handleSubmit());
  const back = () => step > 1 && setStep(step - 1);

  const cisyImg = STEP_CISY[step - 1];
  const aiType: RelType = relationshipType === "friend" ? "friend" : relationshipType === "family" ? "family" : "love";

  return (
    <div className="relative min-h-screen overflow-x-hidden px-4 py-8">
      <SkyBackground hearts={true} swans={false} clouds={true} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs" style={{ color: "#666" }}>
            <span>Passo {step} de {totalSteps}</span>
            <button onClick={() => navigate("/")} className="hover:underline">Cancelar</button>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/60">
            <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #E8456B, #D4AF37)" }} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="relative card-soft p-6 md:p-10"
            style={{ borderRadius: 24 }}
          >
            <img src={cisyImg} alt="" className="absolute right-4 top-4 h-20 w-20 object-contain" />

            {/* STEP 1 */}
            {step === 1 && (
              <div className="pr-24">
                <h2 className="mb-2 font-display text-2xl font-bold text-dark md:text-3xl">Que tipo de presente vamos criar?</h2>
                <p className="mb-6 text-sm" style={{ color: "#999" }}>Escolha o tipo de relacionamento</p>

                <div className="mb-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "love", emoji: "💕", title: "Presente de Amor", sub: "Para namorado(a) ou cônjuge", badge: "Mais popular" },
                    { id: "friend", emoji: "🤍", title: "Presente para Amiga", sub: "Surpreenda sua melhor amiga" },
                  ].map((opt) => {
                    const selected = relationshipType === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRelationshipType(opt.id)}
                        className="relative rounded-2xl p-5 text-left transition hover:scale-[1.02]"
                        style={{
                          border: selected ? "2px solid #E8456B" : "1px solid rgba(232,69,107,0.15)",
                          background: selected ? "#FFF0F3" : "#fff",
                          boxShadow: selected ? "0 8px 24px rgba(232,69,107,0.15)" : "none",
                        }}
                      >
                        {opt.badge && (
                          <span className="absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: "#E8456B" }}>
                            {opt.badge}
                          </span>
                        )}
                        <div className="mb-2 text-2xl">{opt.emoji}</div>
                        <div className="font-display font-bold text-dark">{opt.title}</div>
                        <div className="text-xs" style={{ color: "#666" }}>{opt.sub}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="mb-4 text-xs uppercase tracking-wider" style={{ color: "#999" }}>Outras opções</div>
                <div className="mb-6 flex flex-wrap gap-2">
                  {SECONDARY_TYPES.map((t) => {
                    const selected = relationshipType === t.toLowerCase();
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setRelationshipType(t.toLowerCase())}
                        className="rounded-full px-4 py-1.5 text-sm transition"
                        style={{
                          border: "1px solid #E8456B",
                          background: selected ? "#E8456B" : "transparent",
                          color: selected ? "#fff" : "#E8456B",
                        }}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>

                <p className="text-center text-xs" style={{ color: "#999" }}>+50.000 pessoas já fizeram alguém chorar de emoção 🦢</p>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="pr-24">
                <h2 className="mb-2 font-display text-2xl font-bold text-dark md:text-3xl">Qual o título do presente?</h2>
                <p className="mb-8 text-sm" style={{ color: "#999" }}>Você poderá editar depois</p>

                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 30))}
                  placeholder="Nossa história..."
                  className="w-full bg-transparent py-3 text-center font-display text-2xl outline-none transition"
                  style={{ borderBottom: "2px solid rgba(232,69,107,0.3)", color: "#1A1A2E" }}
                />
                <div className="mt-2 flex items-center justify-between text-xs" style={{ color: "#999" }}>
                  <span>{title.length}/30</span>
                  <button type="button" onClick={() => setTitle(RANDOM_TITLES[Math.floor(Math.random() * RANDOM_TITLES.length)])} className="rounded-full border border-pink-300 px-3 py-1 transition hover:bg-pink-50" style={{ color: "#E8456B" }}>
                    Gerar aleatório ✨
                  </button>
                </div>

                {title && (
                  <div className="mt-8 rounded-2xl p-6 text-center" style={{ background: "#1A1A2E" }}>
                    <div className="mb-2 text-xs" style={{ color: "#D4AF37" }}>✦ ✦ ✦</div>
                    <div className="font-display text-2xl font-bold" style={{ color: "#D4AF37" }}>{title}</div>
                    <div className="mt-2 text-xs" style={{ color: "#D4AF37" }}>✦ ✦ ✦</div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="pr-24">
                <h2 className="mb-2 font-display text-2xl font-bold text-dark md:text-3xl">Qual música representa essa história?</h2>
                <p className="mb-6 text-sm" style={{ color: "#999" }}>Escolha a trilha sonora do presente</p>

                <div className="relative mb-4">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">🎵</span>
                  <input
                    value={songSearch}
                    onChange={(e) => setSongSearch(e.target.value)}
                    placeholder="Buscar música..."
                    className="w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-pink-400"
                    style={{ borderColor: "rgba(232,69,107,0.2)" }}
                  />
                </div>

                <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                  {songLoading && (
                    <div className="py-6 text-center text-xs" style={{ color: "#999" }}>Buscando no Spotify...</div>
                  )}
                  {!songLoading && songSearch && songResults.length === 0 && (
                    <div className="py-6 text-center text-xs" style={{ color: "#999" }}>Nenhuma música encontrada</div>
                  )}
                  {!songLoading && !songSearch && (
                    <div className="py-6 text-center text-xs" style={{ color: "#999" }}>Digite o nome de uma música ou artista 🎵</div>
                  )}
                  {songResults.map((s) => {
                    const selected = song?.id === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSong(s)}
                        className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${selected ? "" : "hover:bg-pink-50/50"}`}
                        style={{
                          background: selected ? "#FFF0F3" : "#fff",
                          borderLeft: selected ? "3px solid #E8456B" : "3px solid transparent",
                          border: selected ? undefined : "1px solid rgba(232,69,107,0.1)",
                        }}
                      >
                        {s.image ? (
                          <img src={s.image} alt="" className="h-12 w-12 rounded-md object-cover" />
                        ) : (
                          <div className="h-12 w-12 rounded-md bg-gradient-to-br from-pink-400 to-amber-500" />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-sm font-bold text-dark">{s.name}</div>
                          <div className="truncate text-xs" style={{ color: "#999" }}>{s.artist}</div>
                        </div>
                        <div className="text-xs" style={{ color: "#999" }}>{formatDuration(s.duration_ms)}</div>
                      </button>
                    );
                  })}
                </div>

                <button type="button" onClick={() => { setSong(null); next(); }} className="mt-4 text-xs underline" style={{ color: "#999" }}>
                  Pular esta etapa
                </button>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="pr-24">
                <h2 className="mb-2 font-display text-2xl font-bold text-dark md:text-3xl">Escreva uma mensagem inesquecível</h2>
                <p className="mb-6 text-sm" style={{ color: "#999" }}>Para emocionar quem você ama</p>

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 5000))}
                  placeholder="Escreva com o coração..."
                  className="w-full rounded-2xl border bg-white p-4 text-sm outline-none transition focus:border-pink-400"
                  style={{ borderColor: "rgba(232,69,107,0.2)", minHeight: 160 }}
                />
                <div className="mt-2 flex items-center justify-between text-xs" style={{ color: "#999" }}>
                  <span>{message.length}/5000</span>
                  <button type="button" onClick={() => setMessage(AI_MESSAGES[aiType])} className="rounded-full border border-pink-300 px-3 py-1 transition hover:bg-pink-50" style={{ color: "#E8456B" }}>
                    Gerar com IA ✨
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="pr-24">
                <h2 className="mb-2 font-display text-2xl font-bold text-dark md:text-3xl">Adicione as fotos de vocês</h2>
                <p className="mb-6 text-sm" style={{ color: "#999" }}>Até 5 fotos · PNG, JPG até 5MB cada</p>

                <label className="block cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition hover:bg-pink-50/40" style={{ borderColor: "#E8456B" }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).filter((f) => f.size <= 5 * 1024 * 1024);
                      setPhotos((prev) => [...prev, ...files].slice(0, 5));
                    }}
                    disabled={photos.length >= 5}
                  />
                  <div className="mb-2 text-3xl">📸</div>
                  <div className="text-sm" style={{ color: "#E8456B" }}>
                    {photos.length >= 5 ? "Limite atingido" : "Clique para selecionar ou arraste aqui"}
                  </div>
                </label>

                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {photos.map((p, i) => (
                      <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                        <img src={URL.createObjectURL(p)} alt="" className="h-full w-full object-cover" />
                        <button type="button" onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs shadow">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 6 */}
            {step === 6 && (
              <div className="pr-24">
                <h2 className="mb-2 font-display text-2xl font-bold text-dark md:text-3xl">Quando tudo começou?</h2>
                <p className="mb-6 text-sm" style={{ color: "#999" }}>Usaremos para calcular o tempo juntos</p>

                <label className="mb-2 block text-xs uppercase tracking-wider" style={{ color: "#999" }}>Data de início da história</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border bg-white px-4 py-3 font-display text-lg outline-none transition focus:border-pink-400"
                  style={{ borderColor: "rgba(232,69,107,0.2)", color: "#1A1A2E" }}
                  max={new Date().toISOString().split("T")[0]}
                />

                {counter && (
                  <div className="mt-6 rounded-2xl p-6 text-center" style={{ background: "#FFF0F3" }}>
                    <div className="font-display text-2xl font-bold md:text-3xl">
                      <span style={{ color: "#E8456B" }}>{counter.years}</span> <span className="text-sm" style={{ color: "#999" }}>anos</span>{" "}
                      <span style={{ color: "#E8456B" }}>{counter.months}</span> <span className="text-sm" style={{ color: "#999" }}>meses</span>{" "}
                      <span style={{ color: "#E8456B" }}>{counter.days}</span> <span className="text-sm" style={{ color: "#999" }}>dias</span>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: "#666" }}>juntos até hoje 🦢</p>
                  </div>
                )}
              </div>
            )}

            {/* NAV BUTTONS */}
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={back}
                disabled={step === 1}
                className="rounded-full px-5 py-2.5 text-sm transition disabled:opacity-30"
                style={{ color: "#666" }}
              >
                ← Voltar
              </button>
              <button
                onClick={next}
                disabled={!canNext() || loading}
                className="rounded-full gradient-pink-gold px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {step === totalSteps ? (loading ? "Gerando..." : "Gerar minha retrospectiva 🦢") : "Próximo →"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {startDate && step === 6 && (
          <p className="mt-4 text-center text-xs" style={{ color: "#666" }}>
            Iniciou em {format(new Date(startDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        )}
        </div>

        {/* LIVE PREVIEW (right column on desktop) */}
        <aside className="hidden lg:block">
          <PreviewCard
            title={title}
            song={song}
            message={message}
            photos={photos}
            counter={counter}
            relationshipType={relationshipType}
          />
        </aside>
      </div>
    </div>
  );
};

export default Criar;
