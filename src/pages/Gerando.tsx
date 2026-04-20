import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import cisyPensando from "@/assets/cisy-pensando.png";

const Gerando = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { form, photos } = (location.state as any) || {};

  useEffect(() => {
    if (!form) {
      navigate("/criar");
      return;
    }

    const save = async () => {
      try {
        // Upload photos
        const photoUrls: string[] = [];
        if (photos && photos.length > 0) {
          for (const photo of photos as File[]) {
            const ext = photo.name.split(".").pop();
            const path = `${crypto.randomUUID()}.${ext}`;
            const { error } = await supabase.storage
              .from("retrospective-photos")
              .upload(path, photo);
            if (!error) {
              const { data } = supabase.storage
                .from("retrospective-photos")
                .getPublicUrl(path);
              photoUrls.push(data.publicUrl);
            }
          }
        }

        const { data, error } = await supabase
          .from("retrospectives")
          .insert({
            ...form,
            photos: photoUrls,
          })
          .select("id")
          .single();

        if (error) throw error;

        // Small delay for dramatic effect
        await new Promise((r) => setTimeout(r, 2000));
        navigate(`/retro/${data.id}`, { replace: true });
      } catch (err) {
        console.error("Error saving retrospective:", err);
        navigate("/criar");
      }
    };

    save();
  }, [form, photos, navigate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-blush px-4 font-body">
      <motion.img
        src={cisyPensando}
        alt="Cisy pensando"
        className="mb-8 w-40"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.p
        className="text-center text-xl font-medium text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        A Cisy está montando a história de vocês... 🦢
      </motion.p>
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-primary/20">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Gerando;
