import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SkyBackground from "@/components/SkyBackground";
import cisyPensando from "@/assets/cisy-pensando.png";

const Gerando = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // The Criar page now navigates directly to /retro/:id after saving.
    // This page is kept as a fallback / future use; redirect home if accessed directly.
    const t = setTimeout(() => navigate("/"), 4000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <SkyBackground />
      <div className="relative z-10 text-center">
        <div className="relative mx-auto mb-6 w-[200px]">
          <div className="cisy-glow" />
          <img src={cisyPensando} alt="" className="cisy-float relative w-[200px]" />
        </div>
        <h2 className="mb-3 font-display text-2xl font-bold text-dark md:text-3xl">
          A Cisy está montando a história de vocês...
        </h2>
        <p className="mb-6 text-sm" style={{ color: "#D4AF37" }}>Isso leva só alguns segundos 🦢</p>
        <div className="loading-dots">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
};

export default Gerando;
