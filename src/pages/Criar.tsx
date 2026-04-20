import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import cisyAnotando from "@/assets/cisy-anotando.png";

const Criar = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [form, setForm] = useState({
    sender_name: "",
    receiver_name: "",
    how_met: "",
    favorite_memory: "",
    meaning: "",
    one_word: "",
  });

  const update = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 3);
    setPhotos(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Navigate to loading page immediately, pass form data via state
    navigate("/gerando", { state: { form, photos } });
  };

  const fields = [
    { key: "sender_name", label: "Nome de quem envia", type: "input" },
    { key: "receiver_name", label: "Nome de quem recebe", type: "input" },
    { key: "how_met", label: "Como vocês se conheceram?", type: "textarea" },
    { key: "favorite_memory", label: "Memória favorita juntos", type: "textarea" },
    { key: "meaning", label: "O que essa pessoa significa para você?", type: "textarea" },
    { key: "one_word", label: "Uma palavra que define essa história", type: "input" },
  ];

  return (
    <div className="min-h-screen bg-blush px-4 py-12 font-body">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-8 md:flex-row">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full flex-1 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
            Crie a retrospectiva
          </h1>
          <p className="text-muted-foreground">
            Preencha com carinho — cada resposta vira uma parte especial do presente.
          </p>

          {fields.map(({ key, label, type }) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-foreground">{label}</label>
              {type === "input" ? (
                <input
                  required
                  value={(form as any)[key]}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={200}
                />
              ) : (
                <textarea
                  required
                  value={(form as any)[key]}
                  onChange={(e) => update(key, e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={1000}
                />
              )}
            </div>
          ))}

          {/* Photo upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Fotos (até 3, opcional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotos}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border-2 border-dashed border-primary/30 px-6 py-4 text-sm text-muted-foreground transition hover:border-primary/60"
            >
              {photos.length > 0
                ? `${photos.length} foto(s) selecionada(s)`
                : "Clique para selecionar fotos"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-4 text-lg font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            Gerar minha retrospectiva
          </button>
        </motion.form>

        <motion.img
          src={cisyAnotando}
          alt="Cisy anotando"
          className="hidden w-40 md:block lg:w-48"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </div>
    </div>
  );
};

export default Criar;
