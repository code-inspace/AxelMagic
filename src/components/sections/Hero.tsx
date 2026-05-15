import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import posthog from "posthog-js";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RollButton } from "@/components/ui/RollButton";
import { Marquee } from "@/components/magicui/marquee";

const logos = [
  { src: "/images/logo_previous_companies/logo-previous-company1.svg.png", alt: "SNCF Connect" },
  { src: "/images/logo_previous_companies/logo-previous-company4.png", alt: "DGAC" },
  { src: "/images/logo_previous_companies/logo-previous-company5.png", alt: "TotalEnergies" },
  { src: "/images/logo_previous_companies/logo-previous-company2.png", alt: "Osmos" },
];

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
      };
    });

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.005;

      orbsRef.current.forEach((orb, i) => {
        orb.vx *= 0.995;
        orb.vy *= 0.995;

        orb.x += orb.vx + Math.sin(t + i) * 0.3;
        orb.y += orb.vy + Math.cos(t + i * 0.7) * 0.3;

        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
        const pulsingOpacity = orb.opacity + Math.sin(t * 1.5 + i) * 0.04;
        grad.addColorStop(0, `${orb.color}${pulsingOpacity})`);
        grad.addColorStop(0.5, `${orb.color}${pulsingOpacity * 0.4})`);
        grad.addColorStop(1, `${orb.color}0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
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
          className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed"
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
          <RollButton
            data-cal-namespace="30min"
            data-cal-link="axel-coudair-hhelf2/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            onClick={() => posthog.capture("cta_click", { label: "planifier_rdv", location: "hero" })}
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #2708a0, #653ad2)" }}
          >
            Planifier un rendez-vous <ArrowRight className="w-4 h-4" />
          </RollButton>

          <RollButton
            href="#contact"
            onClick={() => posthog.capture("cta_click", { label: "me_contacter", location: "hero" })}
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
          >
            Me contacter
          </RollButton>
        </motion.div>

      </div>

      {/* Marquee logos */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 overflow-hidden w-1/2"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
        }}
      >
        <Marquee duration="20s" gap="0px">
          {logos.map(({ src, alt }) => (
            <div key={alt} className="px-10">
              <img src={src} alt={alt} className="h-10 w-auto object-contain grayscale invert" />
            </div>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
