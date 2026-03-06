import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Clock } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  hue: number;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const orbsRef = useRef<Orb[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init orbs
    const colors = [
      { h: 260, s: 80, l: 55 },
      { h: 240, s: 90, l: 45 },
      { h: 280, s: 70, l: 60 },
      { h: 220, s: 80, l: 50 },
      { h: 300, s: 60, l: 55 },
    ];

    orbsRef.current = Array.from({ length: 6 }, (_, i) => {
      const c = colors[i % colors.length];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 200 + Math.random() * 300,
        opacity: 0.12 + Math.random() * 0.1,
        color: `hsla(${c.h}, ${c.s}%, ${c.l}%, `,
        hue: c.h,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw mouse-reactive glow
      const mouseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
      mouseGrad.addColorStop(0, "hsla(260, 80%, 60%, 0.18)");
      mouseGrad.addColorStop(0.5, "hsla(240, 80%, 50%, 0.08)");
      mouseGrad.addColorStop(1, "transparent");
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw orbs
      orbsRef.current.forEach((orb, i) => {
        // Attract toward mouse gently
        const dx = mx - orb.x;
        const dy = my - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attraction = 0.00015;
        orb.vx += (dx / dist) * attraction;
        orb.vy += (dy / dist) * attraction;

        // Damping
        orb.vx *= 0.995;
        orb.vy *= 0.995;

        // Update pos
        orb.x += orb.vx + Math.sin(t + i) * 0.3;
        orb.y += orb.vy + Math.cos(t + i * 0.7) * 0.3;

        // Bounce off edges
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;

        // Draw
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.size,
        );
        const pulsingOpacity = orb.opacity + Math.sin(t * 1.5 + i) * 0.04;
        grad.addColorStop(0, `${orb.color}${pulsingOpacity})`);
        grad.addColorStop(0.5, `${orb.color}${pulsingOpacity * 0.4})`);
        grad.addColorStop(1, `${orb.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Light rays from mouse
      const rayCount = 6;
      for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + t * 0.3;
        const length = 180 + Math.sin(t * 2 + i) * 60;
        const x2 = mx + Math.cos(angle) * length;
        const y2 = my + Math.sin(angle) * length;
        const rayGrad = ctx.createLinearGradient(mx, my, x2, y2);
        rayGrad.addColorStop(0, "rgba(139, 92, 246, 0.08)");
        rayGrad.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Grid lines (subtle)
      ctx.strokeStyle = "rgba(255,255,255,0.015)";
      ctx.lineWidth = 1;
      const gridSpacing = 60;
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#0E0F11" }}
    >
      {/* Canvas background animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 1 }}
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E0F11]/20 via-transparent to-[#0E0F11]/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Badge réponse 24h */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-sm text-purple-300">
            <Clock className="w-3.5 h-3.5" />
            Réponse sous 24h
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-poppins font-light leading-[1.05] tracking-tight mb-4"
        >
          <span className="text-white">Des sites </span>
          <AuroraText
            colors={[
              "#ffffff",
              "#a78bfa",
              "#8b5cf6",
              "#653ad2",
              "#c4b5fd",
              "#ffffff",
            ]}
            className="font-poppins font-light"
          >
            premium,
          </AuroraText>
          <span className="text-white"> pensés pour convertir vos visiteurs en </span>
          <AuroraText
            colors={[
              "#ffffff",
              "#a78bfa",
              "#8b5cf6",
              "#653ad2",
              "#c4b5fd",
              "#ffffff",
            ]}
            className="font-poppins font-light"
          >
            clients.
          </AuroraText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Expert web indépendant, je conçois des sites{" "}
          <span className="text-purple-300 font-medium">stratégiques</span>,
          modernes et optimisés SEO pour les PME qui veulent{" "}
          <span className="text-purple-300 font-medium">
            transformer leurs visiteurs en clients
          </span>
          .
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <button
            data-cal-namespace="30min"
            data-cal-link="axel-coudair-hhelf2/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #2708a0, #653ad2)",
            }}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">Planifier un rendez-vous</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 rounded-full glow-primary-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
          >
            Me contacter
          </a>
        </motion.div>

        {/* Urgency bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="md:flex justify-center hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/20 text-sm text-white/60">
            <span className="text-amber-400">⚡</span>
            <span className="text-sm text-white/60">
              Plus que{" "}
              <span className="text-amber-300 font-bold">
                2 places disponibles
              </span>{" "}
              ce mois-ci
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
