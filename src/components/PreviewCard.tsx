import { useMemo } from "react";

type SpotifyTrack = {
  id: string;
  name: string;
  artist: string;
  image: string | null;
} | null;

interface Counter {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Props {
  title: string;
  song: SpotifyTrack;
  message: string;
  photos: File[];
  counter: Counter | null;
  relationshipType: string;
}

const RELATIONSHIP_LABEL: Record<string, string> = {
  love: "Presente de Amor",
  friend: "Presente para Amiga",
  family: "Presente para Família",
};

const PreviewCard = ({ title, song, message, photos, counter, relationshipType }: Props) => {
  const photoUrls = useMemo(() => photos.slice(0, 3).map((p) => URL.createObjectURL(p)), [photos]);

  const relLabel = relationshipType
    ? RELATIONSHIP_LABEL[relationshipType] || `Presente para ${relationshipType.charAt(0).toUpperCase() + relationshipType.slice(1)}`
    : "Escolha um tipo";

  return (
    <div className="sticky top-6 overflow-hidden rounded-3xl shadow-2xl" style={{ background: "#1A1A2E" }}>
      <div className="space-y-5 p-6">
        {/* Header / Title */}
        <div className="text-center">
          <div className="mb-2 text-[10px] uppercase tracking-[3px]" style={{ color: "#D4AF37" }}>✦ MyLove ✦</div>
          <div
            className={`font-display text-2xl font-bold leading-tight ${title ? "" : "opacity-40"}`}
            style={{ color: "#D4AF37" }}
          >
            {title || "Seu título aqui..."}
          </div>
          <div className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>{relLabel}</div>
        </div>

        {/* Song */}
        {song ? (
          <div className="flex items-center gap-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.05)" }}>
            {song.image ? (
              <img src={song.image} alt="" className="h-12 w-12 rounded-md object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-md bg-gradient-to-br from-pink-400 to-amber-500" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold" style={{ color: "#D4AF37" }}>{song.name}</div>
              <div className="truncate text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{song.artist}</div>
            </div>
            <span className="text-xl" style={{ color: "#D4AF37" }}>♫</span>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-3 text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}>
            Escolha uma música...
          </div>
        )}

        {/* Message */}
        {message ? (
          <div className="rounded-xl p-4 text-center font-display text-sm italic leading-relaxed" style={{ background: "rgba(232,69,107,0.1)", color: "rgba(255,255,255,0.85)" }}>
            <span style={{ color: "#D4AF37" }}>"</span>
            {message.length > 140 ? message.substring(0, 140) + "…" : message}
            <span style={{ color: "#D4AF37" }}>"</span>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-3 text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}>
            Escreva uma mensagem...
          </div>
        )}

        {/* Gallery */}
        {photoUrls.length > 0 ? (
          <div>
            <div className="grid grid-cols-3 gap-2">
              {photoUrls.map((u, i) => (
                <img key={i} src={u} alt="" className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
            {photos.length > 3 && (
              <div className="mt-2 text-center text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                +{photos.length - 3} fotos
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-3 text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.4)" }}>
            Adicione fotos...
          </div>
        )}

        {/* Counter */}
        {counter && (
          <div className="rounded-xl p-4 text-center" style={{ background: "rgba(212,175,55,0.08)" }}>
            <div className="font-display text-lg font-bold">
              <span style={{ color: "#E8456B" }}>{counter.years}</span><span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>a</span>
              <span className="mx-1" style={{ color: "#D4AF37" }}>·</span>
              <span style={{ color: "#E8456B" }}>{counter.months}</span><span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>m</span>
              <span className="mx-1" style={{ color: "#D4AF37" }}>·</span>
              <span style={{ color: "#E8456B" }}>{counter.days}</span><span className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>d</span>
            </div>
            <div className="mt-1 font-mono text-xs tabular-nums" style={{ color: "rgba(255,255,255,0.6)" }}>
              {String(counter.hours).padStart(2, "0")}h {String(counter.minutes).padStart(2, "0")}m {String(counter.seconds).padStart(2, "0")}s
            </div>
            <div className="mt-2 text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>juntos até hoje 🦢</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
