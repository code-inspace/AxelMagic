import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { Routes, Route, StaticRouter } from "react-router-dom";
import { useState, useEffect, useRef, useId } from "react";
import { getCalApi } from "@calcom/embed-react";
import { useScroll, useSpring, motion, AnimatePresence, useTransform, useMotionValue, useInView } from "framer-motion";
import { X, Menu, Clock, ArrowRight, Briefcase, Zap, Monitor, ShoppingCart, Database, Layers, ExternalLink, Search, Target, TrendingUp, MessageSquare, Paintbrush, Code, FileText, CheckCircle, HeartHandshake, Percent, Share2, Users, Gift, Calendar, Phone, MessageCircle, Mail, Linkedin } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 1e-3
  });
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left",
      style: {
        scaleX,
        background: "linear-gradient(90deg, #2708a0, #653ad2, #8b5cf6)"
      }
    }
  );
}
const links = [
  { href: "/#apropos", label: "À propos" },
  { href: "/#services", label: "Services" },
  { href: "/#realisations", label: "Réalisations" },
  { href: "/#process", label: "Méthode" },
  { href: "/#seo", label: "Performance" }
];
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return /* @__PURE__ */ jsxs(
    motion.nav,
    {
      initial: { y: -80, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] },
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass border-b border-white/[0.06] py-3" : "py-5"}`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center gap-2.5", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/logo-axelcoudair.png",
              alt: "Axel Coudair",
              className: "h-9 w-auto"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-7", children: links.map((link) => /* @__PURE__ */ jsx(
            "a",
            {
              href: link.href,
              className: "text-sm text-white/55 hover:text-white transition-colors duration-200 font-medium",
              children: link.label
            },
            link.href
          )) }),
          /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center gap-3", children: /* @__PURE__ */ jsx(
            "a",
            {
              href: "/#contact",
              className: "px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90",
              style: { background: "linear-gradient(135deg, #2708a0, #653ad2)" },
              children: "Me contacter"
            }
          ) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "md:hidden w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white",
              onClick: () => setMobileOpen(!mobileOpen),
              children: mobileOpen ? /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsx(Menu, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "md:hidden glass border-t border-white/[0.06] overflow-hidden",
            children: /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto px-6 py-4 space-y-3", children: [
              links.map((link) => /* @__PURE__ */ jsx(
                "a",
                {
                  href: link.href,
                  className: "block text-white/60 hover:text-white py-2 font-medium transition-colors",
                  onClick: () => setMobileOpen(false),
                  children: link.label
                },
                link.href
              )),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "/#contact",
                  className: "block mt-3 px-5 py-3 rounded-full text-sm font-semibold text-white text-center",
                  style: { background: "linear-gradient(135deg, #2708a0, #653ad2)" },
                  onClick: () => setMobileOpen(false),
                  children: "Me contacter"
                }
              )
            ] })
          }
        ) })
      ]
    }
  );
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function AuroraText({ children, className, colors }) {
  const gradient = colors ? colors.join(", ") : "#ffffff, #a78bfa, #8b5cf6, #c4b5fd, #e9d5ff, #ffffff";
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("inline", className),
      style: {
        background: `linear-gradient(135deg, ${gradient})`,
        backgroundSize: "300% 300%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "aurora 4s ease infinite alternate"
      },
      children
    }
  );
}
function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const orbsRef = useRef([]);
  const animFrameRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const colors = [
      { h: 260, s: 80, l: 55 },
      { h: 240, s: 90, l: 45 },
      { h: 280, s: 70, l: 60 },
      { h: 220, s: 80, l: 50 },
      { h: 300, s: 60, l: 55 }
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
        hue: c.h
      };
    });
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);
    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 5e-3;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 280);
      mouseGrad.addColorStop(0, "hsla(260, 80%, 60%, 0.18)");
      mouseGrad.addColorStop(0.5, "hsla(240, 80%, 50%, 0.08)");
      mouseGrad.addColorStop(1, "transparent");
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      orbsRef.current.forEach((orb, i) => {
        const dx = mx - orb.x;
        const dy = my - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attraction = 15e-5;
        orb.vx += dx / dist * attraction;
        orb.vy += dy / dist * attraction;
        orb.vx *= 0.995;
        orb.vy *= 0.995;
        orb.x += orb.vx + Math.sin(t + i) * 0.3;
        orb.y += orb.vy + Math.cos(t + i * 0.7) * 0.3;
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.size
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
      const rayCount = 6;
      for (let i = 0; i < rayCount; i++) {
        const angle = i / rayCount * Math.PI * 2 + t * 0.3;
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
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id: "hero",
      className: "relative min-h-screen flex items-center justify-center overflow-hidden",
      style: { background: "#0E0F11" },
      children: [
        /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: canvasRef,
            className: "absolute inset-0 w-full h-full pointer-events-none",
            style: { opacity: 1 }
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0E0F11]/20 via-transparent to-[#0E0F11]/60 pointer-events-none" }),
        /* @__PURE__ */ jsxs("div", { className: "relative z-10 text-center max-w-5xl mx-auto px-6", children: [
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2, duration: 0.6 },
              className: "flex items-center justify-center gap-2 mb-8",
              children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 px-4 py-1.5 rounded-full glass border border-purple-500/20 text-sm text-purple-300", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }),
                "Réponse sous 24h"
              ] })
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.h1,
            {
              initial: { opacity: 0, y: 30 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              className: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-poppins font-light leading-[1.05] tracking-tight mb-4",
              children: [
                /* @__PURE__ */ jsx("span", { className: "text-white", children: "Des sites " }),
                /* @__PURE__ */ jsx(
                  AuroraText,
                  {
                    colors: [
                      "#ffffff",
                      "#a78bfa",
                      "#8b5cf6",
                      "#653ad2",
                      "#c4b5fd",
                      "#ffffff"
                    ],
                    className: "font-poppins font-light",
                    children: "premium,"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-white", children: " pensés pour convertir vos visiteurs en " }),
                /* @__PURE__ */ jsx(
                  AuroraText,
                  {
                    colors: [
                      "#ffffff",
                      "#a78bfa",
                      "#8b5cf6",
                      "#653ad2",
                      "#c4b5fd",
                      "#ffffff"
                    ],
                    className: "font-poppins font-light",
                    children: "clients."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.5, duration: 0.6 },
              className: "text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed",
              children: [
                "Expert web indépendant, je conçois des sites",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-purple-300 font-medium", children: "stratégiques" }),
                ", modernes et optimisés SEO pour les PME qui veulent",
                " ",
                /* @__PURE__ */ jsx("span", { className: "text-purple-300 font-medium", children: "transformer leurs visiteurs en clients" }),
                "."
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.65, duration: 0.6 },
              className: "flex flex-col sm:flex-row items-center justify-center gap-4 mb-8",
              children: [
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    "data-cal-namespace": "30min",
                    "data-cal-link": "axel-coudair-hhelf2/30min",
                    "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
                    className: "group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 overflow-hidden cursor-pointer",
                    style: {
                      background: "linear-gradient(135deg, #2708a0, #653ad2)"
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
                      /* @__PURE__ */ jsx("span", { className: "relative", children: "Planifier un rendez-vous" }),
                      /* @__PURE__ */ jsx(ArrowRight, { className: "relative w-4 h-4 group-hover:translate-x-1 transition-transform" }),
                      /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full glow-primary-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "#contact",
                    className: "group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300",
                    children: "Me contacter"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 1, duration: 0.5 },
              className: "md:flex justify-center hidden",
              children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-amber-500/20 text-sm text-white/60", children: [
                /* @__PURE__ */ jsx("span", { className: "text-amber-400", children: "⚡" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-white/60", children: [
                  "Plus que",
                  " ",
                  /* @__PURE__ */ jsx("span", { className: "text-amber-300 font-bold", children: "2 places disponibles" }),
                  " ",
                  "ce mois-ci"
                ] })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function TextReveal({ text, className }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.9", "end 0.4"]
  });
  const words = text.split(" ");
  return /* @__PURE__ */ jsx("div", { ref: targetRef, className: cn("relative z-0", className), children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-2 gap-y-1", children: words.map((word, i) => {
    const start = i / words.length;
    const end = start + 1 / words.length;
    return /* @__PURE__ */ jsx(Word, { progress: scrollYProgress, range: [start, end], children: word }, i);
  }) }) });
}
function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const blur = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  const y = useTransform(progress, range, ["8px", "0px"]);
  return /* @__PURE__ */ jsx(
    motion.span,
    {
      style: { opacity, filter: blur, y },
      className: "inline-block text-white",
      children
    }
  );
}
function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
  suffix = "",
  prefix = ""
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });
  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1e3);
    }
  }, [motionValue, isInView, delay, value, direction]);
  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Intl.NumberFormat("fr-FR").format(Number(latest.toFixed(decimalPlaces))) + suffix;
      }
    });
  }, [springValue, decimalPlaces, suffix, prefix]);
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: cn("inline-block tabular-nums", className),
      ref
    }
  );
}
function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = false,
  blur = "6px"
}) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: "-50px" });
  const isVisible = !inView || inViewResult;
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: 0, opacity: 1, filter: "blur(0px)" }
  };
  const combinedVariants = variant || defaultVariants;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ref,
      initial: "hidden",
      animate: isVisible ? "visible" : "hidden",
      variants: combinedVariants,
      transition: {
        delay: 0.04 + delay,
        duration,
        ease: [0.21, 0.47, 0.32, 0.98]
      },
      className: cn(className),
      children
    }
  );
}
function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}) {
  const id = useId();
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      className: cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/20",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx(
          "pattern",
          {
            id,
            width,
            height,
            patternUnits: "userSpaceOnUse",
            patternContentUnits: "userSpaceOnUse",
            x,
            y,
            children: /* @__PURE__ */ jsx("circle", { id: "pattern-circle", cx, cy, r: cr })
          }
        ) }),
        /* @__PURE__ */ jsx("rect", { width: "100%", height: "100%", strokeWidth: 0, fill: `url(#${id})` })
      ]
    }
  );
}
const stats = [
  { value: 8, suffix: "+", label: "années d'expérience", icon: Briefcase },
  { value: 30, suffix: "j", label: "délai de livraison", icon: Zap }
];
function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs("section", { id: "apropos", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(DotPattern, { className: "opacity-30", cr: 0.8 }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0E0F11] via-transparent to-[#0E0F11] pointer-events-none" }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 pointer-events-none",
        style: {
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "À propos" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-8", children: [
            "Derrière chaque bon site, ",
            /* @__PURE__ */ jsx(AuroraText, { colors: ["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"], children: "il y a quelqu'un qui comprend vraiment votre métier." })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 text-white/65 leading-relaxed", children: [
            /* @__PURE__ */ jsxs(BlurFade, { inView: true, delay: 0.2, children: [
              /* @__PURE__ */ jsx("p", { className: "text-base sm:text-lg text-white/75", children: "J'ai passé des années à travailler sur des projets digitaux pour de grands groupes : la SNCF, la DGAC, Osmos Group, et en agence de communication chez Cinqmars, dans des secteurs très variés. J'ai été développeur, chef de projets, UX designer. J'ai vu ce qui fonctionne, et ce qui coûte cher sans rapporter grand-chose." }),
              /* @__PURE__ */ jsx(TextReveal, { text: "", className: "text-base sm:text-lg" })
            ] }),
            /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.3, children: /* @__PURE__ */ jsxs("p", { className: "text-base sm:text-lg text-white/75", children: [
              "Aujourd'hui, je mets cette expérience au service des",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-white font-semibold", children: "entrepreneurs, PME et indépendants" }),
              " ",
              "qui veulent un site à leur image : efficace, moderne, et pensé pour convertir."
            ] }) }),
            /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.4, children: /* @__PURE__ */ jsx("div", { className: "glass-card border border-purple-500/20 p-5 rounded-2xl", children: /* @__PURE__ */ jsxs("p", { className: "text-white/80 italic", children: [
              '"Pas de grande agence impersonnelle, pas de freelance qui disparaît après la livraison.',
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-300 font-semibold not-italic", children: "Un vrai partenaire qui s'implique dans votre projet comme si c'était le sien." }),
              '"'
            ] }) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { ref, children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-4", style: { gridAutoRows: "1fr" }, children: stats.map(({ value, suffix, label, icon: Icon }, i) => /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.2 + i * 0.1, className: "h-full", children: /* @__PURE__ */ jsxs("div", { className: "glass-card border border-white/[0.07] hover:border-purple-500/30 transition-all duration-300 p-6 rounded-2xl group h-full", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors duration-300", children: /* @__PURE__ */ jsx(Icon, { className: "w-5 h-5 text-purple-400" }) }),
            /* @__PURE__ */ jsx("div", { className: "text-4xl font-black mb-1", children: /* @__PURE__ */ jsxs("span", { className: "aurora-text", children: [
              isInView ? /* @__PURE__ */ jsx(
                NumberTicker,
                {
                  value,
                  delay: i * 0.15,
                  className: "aurora-text"
                }
              ) : "0",
              suffix
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "text-white/50 text-sm", children: label })
          ] }) }, label)) }),
          /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.6, children: /* @__PURE__ */ jsxs("div", { className: "mt-6 glass-card border border-white/[0.07] p-4 rounded-2xl flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full overflow-hidden border-2 border-purple-500/40", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: "/images/photo-pro 3.jpg",
                  alt: "Axel Coudair",
                  className: "w-full h-full object-cover",
                  loading: "lazy"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-400 border-2 border-[#0E0F11]" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-white", children: "Axel Coudair" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-white/50", children: "Expert Web & Stratégie Digitale" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "ml-auto shrink-0", children: /* @__PURE__ */ jsxs("span", { className: "text-xs text-green-400 flex items-center gap-1 whitespace-nowrap", children: [
              /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" }),
              "En ligne"
            ] }) })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
const services = [
  {
    icon: Monitor,
    title: "Site Vitrine",
    description: "Votre carte de visite en ligne. Design sur-mesure, performance maximale, pensé pour convertir les visiteurs en clients.",
    gradient: "from-purple-500/20 to-blue-500/10",
    tags: ["Design UI/UX", "SEO", "Responsive"]
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Une boutique en ligne performante et intuitive. Tunnel d'achat optimisé, intégration paiement, gestion des stocks.",
    gradient: "from-violet-500/20 to-purple-500/10",
    tags: ["Stripe", "Analytics"]
  },
  {
    icon: Database,
    title: "Back Office",
    description: "Interface d'administration sur-mesure pour gérer votre activité. Tableaux de bord, CRM, automatisations.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    tags: ["Admin", "API", "Données"]
  },
  {
    icon: Layers,
    title: "Application Web",
    description: "Application web complexe, SaaS, plateforme métier. Architecture solide, UX soignée, scalabilité.",
    gradient: "from-pink-500/20 to-purple-500/10",
    tags: ["React", "Next.js", "Node.js"]
  }
];
function Services() {
  return /* @__PURE__ */ jsxs("section", { id: "services", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none",
        style: { background: "radial-gradient(ellipse, #8b5cf6, transparent 70%)" }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Expertises" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4", children: [
          "Ce que je",
          " ",
          /* @__PURE__ */ jsx(AuroraText, { colors: ["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"], children: "réalise pour vous" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/50 text-lg max-w-xl mx-auto", children: "Du site vitrine à l'application web complexe, une expertise complète au service de votre croissance." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5 mb-16", children: services.map((service, i) => /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.15 + i * 0.1, children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          whileHover: { y: -4, scale: 1.01 },
          transition: { duration: 0.3, ease: "easeOut" },
          className: "group relative glass-card border border-white/[0.07] hover:border-purple-500/30 transition-all duration-500 p-7 rounded-2xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
              /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors duration-300", children: /* @__PURE__ */ jsx(service.icon, { className: "w-6 h-6 text-purple-400" }) }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-white mb-3", children: service.title }),
              /* @__PURE__ */ jsx("p", { className: "text-white/55 leading-relaxed text-sm mb-5", children: service.description }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: service.tags.map((tag) => /* @__PURE__ */ jsx(
                "span",
                {
                  className: "px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60",
                  children: tag
                },
                tag
              )) })
            ] })
          ]
        }
      ) }, service.title)) })
    ] })
  ] });
}
function ProjectContent({
  description,
  context,
  result,
  tags,
  link
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-white/70 text-sm leading-relaxed whitespace-pre-line", children: description }),
    (context || result) && /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
      context && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-white/40 uppercase tracking-wider mb-2", children: "Contexte" }),
        /* @__PURE__ */ jsx("p", { className: "text-white/65 text-sm leading-relaxed", children: context })
      ] }),
      result && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-white/40 uppercase tracking-wider mb-2", children: "Résultat" }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white",
            children: [
              /* @__PURE__ */ jsx("span", { children: "📈" }),
              result
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: tags.map((tag) => /* @__PURE__ */ jsx(
      "span",
      {
        className: "px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/60",
        children: tag
      },
      tag
    )) }),
    link && /* @__PURE__ */ jsxs(
      "a",
      {
        href: link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300",
        style: { background: "linear-gradient(135deg, #2708a0, #653ad2)" },
        children: [
          "Voir le projet",
          /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
        ]
      }
    )
  ] });
}
function CardModal({ card, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.3 },
        className: "fixed inset-0 z-40 bg-black/75 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none", children: /* @__PURE__ */ jsxs(
      motion.div,
      {
        layoutId: `portfolio-card-${card.id}`,
        className: "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: onClose,
              className: "absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors",
              children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "h-64 relative overflow-hidden rounded-t-3xl flex-shrink-0 bg-[#141416]",
              children: [
                card.image && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: card.image,
                    alt: card.title,
                    className: "absolute inset-0 w-full h-full object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" }),
                /* @__PURE__ */ jsxs("div", { className: "absolute bottom-6 left-7", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white/60 uppercase tracking-widest mb-2", children: card.category }),
                  /* @__PURE__ */ jsx("h3", { className: "text-2xl font-poppins font-light text-white leading-tight", children: card.title })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#0E0F11] rounded-b-3xl border border-white/[0.07] border-t-0 p-7", children: [
            card.content,
            card.gallery && card.gallery.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-semibold text-white/40 uppercase tracking-wider mb-4", children: "Aperçu" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: card.gallery.map((src, i) => /* @__PURE__ */ jsx(
                "img",
                {
                  src,
                  alt: `${card.title} screenshot ${i + 1}`,
                  className: "w-full rounded-xl border border-white/[0.07] object-cover",
                  loading: "lazy"
                },
                i
              )) })
            ] })
          ] })
        ]
      }
    ) })
  ] });
}
const cards = [
  {
    id: "lucafit",
    category: "Figma · Webflow · SEO",
    title: "LucasFit",
    image: "/images/Lucassanchez/Preview/lucas fit preview.jpeg",
    gallery: [
      "/images/Lucassanchez/lucafit1.png",
      "/images/Lucassanchez/lucafit2.png",
      "/images/Lucassanchez/lucafit3.png",
      "/images/Lucassanchez/lucafit4.png"
    ],
    content: /* @__PURE__ */ jsx(
      ProjectContent,
      {
        description: "LucasFit est un projet fictif conçu comme une étude de cas autour de la mise en valeur d'un coach sportif personnel. L'objectif était de construire un site qui transmette de l'énergie et donne envie de passer à l'action.\n\nLe site a été développé sur Webflow avec un parti pris graphique assumé : sections en biais, éléments légèrement inclinés, mise en page qui sort de la grille. Rien n'est parfaitement droit, et c'est voulu — cette tension visuelle invite au mouvement plutôt qu'à la lecture passive.\n\nLe choix du noir, blanc et rouge vif repose sur une logique de contraste fort. Le noir et blanc posent une base sérieuse et percutante. Le rouge vient cibler l'attention sur les éléments clés : appels à l'action, chiffres, titres. C'est une combinaison qui marque et qui reste en tête.\n\nLe SEO a été intégré avec une structure sémantique soignée, des balises title et meta optimisées, et une hiérarchie de contenus orientée vers les recherches liées au coaching sportif.",
        tags: ["Figma", "Webflow", "SEO"],
        link: "https://lucasfit.webflow.io/"
      }
    )
  },
  {
    id: "adn-paris",
    category: "WordPress · Figma · UI Design · SEO",
    title: "ADN Paris",
    image: "/images/ADN/Preview/adn-preview.jpg",
    gallery: [
      "/images/ADN/hero.png",
      "/images/ADN/content 1.png",
      "/images/ADN/content 2.png",
      "/images/ADN/content3 & footer.png"
    ],
    content: /* @__PURE__ */ jsx(
      ProjectContent,
      {
        description: "ADN Paris est une association parisienne qui accompagne les personnes LGBT dans leur insertion sociale à travers des cours de danse, des ateliers et des événements communautaires.\n\nJ'ai pris en charge le projet de A à Z : conception de la maquette sur Figma, puis développement sous WordPress. Le design a été construit autour d'une palette chaleureuse et d'une mise en page claire, pour que le site soit accessible et accueillant dès le premier regard — en accord avec les valeurs de l'association.\n\nJ'ai également travaillé le SEO : structure des pages, balises title et meta, hiérarchie des contenus. L'objectif était de rendre l'association visible auprès des personnes qui cherchent ce type d'accompagnement à Paris.",
        tags: ["WordPress", "Figma", "UI Design", "SEO"]
      }
    )
  }
];
function Portfolio2() {
  const [activeCard, setActiveCard] = useState(null);
  return /* @__PURE__ */ jsxs("section", { id: "realisations", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full opacity-[0.06] pointer-events-none",
        style: { background: "radial-gradient(ellipse, #653ad2, transparent 70%)" }
      }
    ),
    /* @__PURE__ */ jsx(AnimatePresence, { children: activeCard && /* @__PURE__ */ jsx(CardModal, { card: activeCard, onClose: () => setActiveCard(null) }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Réalisations" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4", children: [
          "Des sites qui",
          " ",
          /* @__PURE__ */ jsx(AuroraText, { colors: ["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"], children: "parlent d'eux-mêmes" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/50 text-lg max-w-xl mx-auto", children: "Cliquez sur un projet pour découvrir les détails." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: cards.map((card, i) => /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.15 + i * 0.1, children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          layoutId: `portfolio-card-${card.id}`,
          onClick: () => setActiveCard(card),
          whileHover: { scale: (activeCard == null ? void 0 : activeCard.id) === card.id ? 1 : 1.02, y: (activeCard == null ? void 0 : activeCard.id) === card.id ? 0 : -4 },
          transition: { duration: 0.25 },
          className: "relative w-full h-[420px] rounded-3xl overflow-hidden cursor-pointer select-none",
          style: {
            opacity: (activeCard == null ? void 0 : activeCard.id) === card.id ? 0 : 1,
            pointerEvents: (activeCard == null ? void 0 : activeCard.id) === card.id ? "none" : "auto"
          },
          children: [
            card.image && /* @__PURE__ */ jsx(
              "img",
              {
                src: card.image,
                alt: card.title,
                className: "absolute inset-0 w-full h-full object-cover",
                loading: "lazy"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" }),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-7 left-7 right-7", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] text-white/60 uppercase tracking-widest mb-2", children: card.category }),
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-poppins font-light text-white leading-snug", children: card.title })
            ] })
          ]
        }
      ) }, card.id)) })
    ] })
  ] });
}
const morphTime = 1.2;
const cooldownTime = 0.8;
function MorphingText({ texts, className, morphDuration = 1.2, cooldown = 0.8 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [morph, setMorph] = useState(0);
  const [cooldownTimer, setCooldownTimer] = useState(cooldown);
  const animRef = useRef(0);
  const lastTimeRef = useRef(null);
  useEffect(() => {
    let morphVal = 0;
    let cooldownVal = cooldownTime;
    let idx = 0;
    const animate = (time) => {
      if (lastTimeRef.current !== null) {
        const dt = (time - lastTimeRef.current) / 1e3;
        if (cooldownVal > 0) {
          cooldownVal -= dt;
          if (cooldownVal <= 0) {
            setCooldownTimer(0);
          }
        } else {
          morphVal += dt;
          if (morphVal >= morphTime) {
            morphVal = 0;
            cooldownVal = cooldownTime;
            idx = (idx + 1) % texts.length;
            setTextIndex(idx);
          }
          const fraction = morphVal / morphTime;
          setMorph(fraction);
        }
      }
      lastTimeRef.current = time;
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [texts, morphDuration, cooldown]);
  const blur1 = Math.min(8 / morph - 8, 100);
  const blur2 = Math.min(8 / (1 - morph) - 8, 100);
  const opacity1 = Math.pow(morph, 0.4) * 100;
  return /* @__PURE__ */ jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsx(
      "span",
      {
        style: {
          filter: `blur(${blur2}px)`,
          opacity: `${100 - opacity1}%`
        },
        children: texts[textIndex]
      }
    ),
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "absolute inset-0",
        style: {
          filter: `blur(${blur1}px)`,
          opacity: `${opacity1}%`
        },
        children: texts[(textIndex + 1) % texts.length]
      }
    )
  ] });
}
const pillars = [
  {
    icon: Search,
    title: "SEO On-page & Technique",
    description: "Vos pages sont structurées pour apparaître sur les requêtes de vos clients potentiels. Balises, maillage interne, données structurées, rien n'est laissé au hasard.",
    metric: "3×",
    metricLabel: "plus de trafic organique"
  },
  {
    icon: Zap,
    title: "Performance & Core Web Vitals",
    description: "Un site lent fait fuir. Je m'assure que le vôtre charge en un éclair. Score Lighthouse optimisé, images compressées, code allégé.",
    metric: "98",
    metricLabel: "score Lighthouse moyen"
  },
  {
    icon: Target,
    title: "UX orientée conversion",
    description: "Chaque élément est placé pour guider naturellement l'utilisateur vers l'action que vous attendez de lui : appel, devis, achat.",
    metric: "+65%",
    metricLabel: "taux de conversion"
  },
  {
    icon: TrendingUp,
    title: "Évolutif & Maintenable",
    description: "Votre site grandit avec vous. Technologies modernes, code propre. Vous restez maître de votre outil.",
    metric: "∞",
    metricLabel: "évolutivité"
  }
];
function SeoSection() {
  return /* @__PURE__ */ jsxs("section", { id: "seo", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-1/2 right-0 w-[400px] h-[600px] -translate-y-1/2 opacity-[0.07] pointer-events-none",
        style: {
          background: "radial-gradient(ellipse at right, #653ad2, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Performance" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-16 items-center mb-20", children: [
        /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-6", children: [
            "Je ne fais pas que des sites",
            " ",
            /* @__PURE__ */ jsx(
              AuroraText,
              {
                colors: [
                  "#ffffff",
                  "#a78bfa",
                  "#653ad2",
                  "#8b5cf6",
                  "#ffffff"
                ],
                children: "beaux."
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-white/65 text-lg leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("span", { className: "text-white font-semibold", children: "Un site invisible, c'est un site inutile." }) }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Un design soigné, c'est le minimum. Ce qui fait vraiment la différence, c'est un site que",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "Google trouve" }),
              ", que vos visiteurs comprennent, et qui les",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "pousse à agir" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-8 p-5 glass-card border border-purple-500/20 rounded-2xl", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40 mb-2 uppercase tracking-wider", children: "Ce que je fais concrètement" }),
            /* @__PURE__ */ jsx("div", { className: "text-xl font-bold text-white", children: /* @__PURE__ */ jsx(
              MorphingText,
              {
                texts: [
                  "Optimiser votre SEO",
                  "Booster vos conversions",
                  "Accélérer votre site",
                  "Structurer vos pages",
                  "Attirer vos clients"
                ]
              }
            ) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.3, children: /* @__PURE__ */ jsxs("div", { className: "glass-card border border-white/[0.07] rounded-2xl overflow-hidden p-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-4 pb-4 border-b border-white/[0.07]", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-red-400/60" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-amber-400/60" }),
              /* @__PURE__ */ jsx("div", { className: "w-3 h-3 rounded-full bg-green-400/60" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex-1 mx-3 h-7 rounded-lg glass border border-white/10 flex items-center px-3", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-white/30", children: "votre-site.fr" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-3 mb-4", children: [
            { label: "Performance", score: 98, color: "#22c55e" },
            { label: "SEO", score: 100, color: "#a78bfa" },
            { label: "Accessibilité", score: 95, color: "#60a5fa" },
            {
              label: "Meilleures pratiques",
              score: 100,
              color: "#f59e0b"
            }
          ].map(({ label, score, color }) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "glass p-3 rounded-xl border border-white/[0.06]",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs text-white/50", children: label }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", style: { color }, children: score })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "h-1.5 rounded-full bg-white/5 overflow-hidden", children: /* @__PURE__ */ jsx(
                  motion.div,
                  {
                    initial: { width: 0 },
                    whileInView: { width: `${score}%` },
                    viewport: { once: true },
                    transition: {
                      duration: 1.2,
                      delay: 0.3,
                      ease: "easeOut"
                    },
                    className: "h-full rounded-full",
                    style: { background: color }
                  }
                ) })
              ]
            },
            label
          )) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center justify-between p-4 rounded-xl",
              style: {
                background: "linear-gradient(135deg, #22c55e10, #22c55e05)"
              },
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4 text-green-400" }),
                  /* @__PURE__ */ jsx("span", { className: "text-sm text-white/70", children: "Temps de chargement" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "font-bold text-green-400", children: "< 1.2s" })
              ]
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 gap-5", children: pillars.map((pillar, i) => /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1 + i * 0.1, children: /* @__PURE__ */ jsx(
        motion.div,
        {
          whileHover: { y: -3 },
          className: "glass-card border border-white/[0.07] hover:border-purple-500/25 transition-all duration-400 p-6 rounded-2xl group",
          children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-5", children: [
            /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-500/20 transition-colors duration-300", children: /* @__PURE__ */ jsx(pillar.icon, { className: "w-5 h-5 text-purple-400" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-white mb-2", children: pillar.title }),
              /* @__PURE__ */ jsx("p", { className: "text-white/55 text-sm leading-relaxed", children: pillar.description })
            ] })
          ] })
        }
      ) }, pillar.title)) })
    ] })
  ] });
}
const steps$1 = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Découverte",
    description: "On commence par un échange approfondi pour comprendre votre activité, vos objectifs et vos clients. ",
    duration: "Semaine 1",
    color: "#8b5cf6"
  },
  {
    number: "02",
    icon: Paintbrush,
    title: "Maquette",
    description: "Je vous soumets un design complet sur Figma. On affine ensemble jusqu'à ce que ce soit parfait. Vous validez avant le démarrage du développement.",
    duration: "Semaine 1-2",
    color: "#a78bfa"
  },
  {
    number: "03",
    icon: Code,
    title: "Développement",
    description: "Chaque projet est différent ma stack aussi. Je code votre site avec les technologies adaptées à ses spécificités.\nFront : Next.js, React, Vite, Tailwind, Webflow\nBack : Prisma, Neon, Supabase, Payload CMS\nToujours dans un seul objectif : un site rapide, optimisé et évolutif.",
    duration: "Semaine 2-3",
    color: "#7c3aed"
  },
  {
    number: "04",
    icon: FileText,
    title: "Contenu & SEO",
    description: "On intègre vos textes et vos visuels, on structure les pages pour le référencement. Votre site est préparé pour être trouvé sur Google.",
    duration: "Semaine 3",
    color: "#6d28d9"
  },
  {
    number: "05",
    icon: CheckCircle,
    title: "Tests & Livraison",
    description: "Vérifications complètes sur tous les appareils, puis mise en ligne. Votre site est prêt à travailler pour vous.",
    duration: "Semaine 4",
    color: "#5b21b6"
  },
  {
    number: "06",
    icon: HeartHandshake,
    title: "Accompagnement",
    description: "Je reste disponible après la livraison. Vous n'êtes pas seul. Suivi, ajustements, évolutions, un vrai partenariat sur le long terme.",
    duration: "En continu",
    color: "#4c1d95"
  }
];
function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return /* @__PURE__ */ jsxs("section", { id: "process", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-[0.06] pointer-events-none",
        style: {
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Méthode" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4", children: [
          "Votre site en ligne en",
          " ",
          /* @__PURE__ */ jsx(
            AuroraText,
            {
              colors: ["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"],
              children: "30 jours."
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/50 text-lg max-w-xl mx-auto", children: "Un processus éprouvé, une méthode claire. Vous savez où en est votre projet à chaque étape." })
      ] }) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.2, children: /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-16", children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref,
          className: "glass-card border border-purple-500/30 px-6 py-3 rounded-2xl flex items-center gap-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-3xl font-black aurora-text", children: isInView ? /* @__PURE__ */ jsx(
                NumberTicker,
                {
                  value: 30,
                  delay: 0,
                  className: "aurora-text"
                }
              ) : "0" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-white/40", children: "jours" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "w-px h-10 bg-white/10" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white", children: "Site clé en main" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40", children: "Design · Dev · SEO · Livraison" })
            ] })
          ]
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch", children: steps$1.map((step, i) => /* @__PURE__ */ jsx(
        BlurFade,
        {
          inView: true,
          delay: 0.1 + i * 0.08,
          className: "h-full",
          children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              whileHover: { y: -4 },
              className: "group relative glass-card border border-white/[0.07] hover:border-purple-500/25 transition-all duration-400 p-6 rounded-2xl overflow-hidden h-full",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute top-4 right-4 text-6xl font-black opacity-5 leading-none",
                    style: { color: step.color },
                    children: step.number
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-5", children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "w-11 h-11 rounded-xl flex items-center justify-center",
                        style: {
                          background: `${step.color}20`,
                          border: `1px solid ${step.color}30`
                        },
                        children: /* @__PURE__ */ jsx(
                          step.icon,
                          {
                            className: "w-5 h-5",
                            style: { color: step.color }
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "text-xs text-white/30 font-medium", children: step.duration })
                  ] }),
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: "text-xs font-bold tracking-wider mb-2 block",
                      style: { color: step.color },
                      children: [
                        "ÉTAPE ",
                        step.number
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/55 text-sm leading-relaxed whitespace-pre-line", children: step.description })
                ] }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    style: {
                      background: `linear-gradient(to right, ${step.color}, transparent)`
                    }
                  }
                )
              ]
            }
          )
        },
        step.number
      )) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.6, children: /* @__PURE__ */ jsxs("div", { className: "mt-12 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-white/50 mb-6", children: "Prêt à lancer votre projet ?" }),
        /* @__PURE__ */ jsx(
          "button",
          {
            "data-cal-namespace": "30min",
            "data-cal-link": "axel-coudair-hhelf2/30min",
            "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
            className: "inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 cursor-pointer",
            style: {
              background: "linear-gradient(135deg, #2708a0, #653ad2)"
            },
            children: "Réserver mon appel découverte →"
          }
        )
      ] }) })
    ] })
  ] });
}
const steps = [
  {
    icon: Share2,
    title: "Partagez mon contact",
    description: "Présentez-moi à un entrepreneur, une PME ou un indépendant qui cherche un site web.",
    step: "01"
  },
  {
    icon: Users,
    title: "Il devient client",
    description: "On échange, on s'entend, on lance le projet. Votre recommandation est notée.",
    step: "02"
  },
  {
    icon: Gift,
    title: "Vous recevez 10%",
    description: "Dès la signature du bon de commande, vous touchez 10% du montant du projet.",
    step: "03"
  }
];
function Affiliation() {
  return /* @__PURE__ */ jsxs("section", { id: "affiliation", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.04] pointer-events-none",
        style: {
          background: "radial-gradient(ellipse at 60% 50%, #653ad2, transparent 60%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Programme Partenaires" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "glass-card border border-white/[0.07] rounded-3xl overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "h-1 bg-gradient-to-r from-[#2708a0] via-[#653ad2] to-[#8b5cf6]" }),
        /* @__PURE__ */ jsx("div", { className: "p-10 lg:p-16", children: /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6", children: [
              /* @__PURE__ */ jsx(Percent, { className: "w-4 h-4 text-amber-400" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-amber-300", children: "Programme d'affiliation" })
            ] }) }),
            /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.2, children: /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-6", children: [
              "Présentez-moi des clients,",
              " ",
              /* @__PURE__ */ jsx(
                AuroraText,
                {
                  colors: [
                    "#ffffff",
                    "#fbbf24",
                    "#f59e0b",
                    "#fcd34d",
                    "#ffffff"
                  ],
                  children: "recevez 10%."
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.3, children: /* @__PURE__ */ jsxs("p", { className: "text-white/60 text-lg leading-relaxed mb-8", children: [
              "Vous connaissez un entrepreneur, une PME ou un indépendant qui a besoin d'un site ? Mettez-nous en contact. Si le projet aboutit, je vous reverse",
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-white font-semibold", children: "10% du montant total" }),
              ". Simple, transparent, sans conditions."
            ] }) }),
            /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.4, children: /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://wa.me/message/NUKO2RPNV3BUF1",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300",
                style: {
                  background: "linear-gradient(135deg, #2708a0, #653ad2)"
                },
                children: [
                  "Je connais quelqu'un",
                  /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: steps.map((step, i) => /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.2 + i * 0.12, children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              whileHover: { x: 4 },
              className: "flex items-start gap-5 p-5 glass rounded-2xl border border-white/[0.07] hover:border-purple-500/20 transition-all duration-300",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(step.icon, { className: "w-5 h-5 text-purple-400" }) }),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsxs("span", { className: "text-xs text-purple-400 font-bold tracking-wider", children: [
                    "ÉTAPE ",
                    step.step
                  ] }),
                  /* @__PURE__ */ jsx("h3", { className: "text-white font-bold mt-0.5 mb-1", children: step.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-white/55 text-sm leading-relaxed", children: step.description })
                ] })
              ]
            }
          ) }, step.step)) })
        ] }) })
      ] })
    ] })
  ] });
}
const actions = [
  {
    icon: Calendar,
    title: "Audit gratuit de votre site",
    description: "Je passe votre site au crible : UX, SEO, performance, conversion. Vous recevez un rapport complet et des recommandations actionnables, gratuitement.",
    cta: "Demander mon audit",
    calNamespace: "audit-gratuit",
    calLink: "axel-coudair-hhelf2/audit-gratuit",
    badge: "Gratuit",
    badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    gradient: "from-purple-500/15 to-blue-500/5",
    primary: true
  },
  {
    icon: Phone,
    title: "Call découverte",
    description: "30 minutes pour parler de votre projet. On cadre ensemble vos besoins, vos objectifs, votre budget. Sans engagement.",
    cta: "Réserver un call",
    calNamespace: "30min",
    calLink: "axel-coudair-hhelf2/30min",
    badge: "30 min",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    gradient: "from-blue-500/10 to-purple-500/5",
    primary: false
  },
  {
    icon: MessageCircle,
    title: "Message WhatsApp",
    description: "Une question rapide ? Un projet à me décrire ? Écrivez-moi directement sur WhatsApp. Je réponds dans la journée.",
    cta: "Écrire sur WhatsApp",
    href: "https://wa.me/message/NUKO2RPNV3BUF1",
    badge: "Réponse rapide",
    badgeColor: "bg-green-500/20 text-green-300 border-green-500/30",
    gradient: "from-green-500/10 to-teal-500/5",
    primary: false
  }
];
function Contact() {
  return /* @__PURE__ */ jsxs("section", { id: "contact", className: "relative py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.06] pointer-events-none",
        style: {
          background: "radial-gradient(ellipse at 50% 60%, #653ad2, transparent 60%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/40" }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Contact" }),
        /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/40" })
      ] }) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.1, children: /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-4xl sm:text-5xl font-poppins font-light leading-tight mb-4", children: [
          "Prêt à lancer votre",
          " ",
          /* @__PURE__ */ jsx(
            AuroraText,
            {
              colors: ["#ffffff", "#a78bfa", "#653ad2", "#8b5cf6", "#ffffff"],
              children: "projet web ?"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-white/50 text-lg max-w-xl mx-auto", children: "Décrivez-moi votre projet en quelques mots. Je vous réponds personnellement avec une analyse honnête et des pistes concrètes, sans engagement." }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 mt-4", children: [
          /* @__PURE__ */ jsx(Clock, { className: "w-4 h-4 text-purple-400" }),
          /* @__PURE__ */ jsx("span", { className: "text-purple-300 text-sm font-medium", children: "Réponse garantie sous 24h" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-3 gap-5", children: actions.map((action, i) => {
        var _a;
        return /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.15 + i * 0.1, children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            whileHover: { y: -6, scale: 1.02 },
            transition: { duration: 0.3, ease: "easeOut" },
            className: `group relative glass-card border transition-all duration-400 rounded-2xl overflow-hidden flex flex-col h-full ${action.primary ? "border-purple-500/30 hover:border-purple-500/50" : "border-white/[0.07] hover:border-purple-500/20"}`,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`
                }
              ),
              action.primary && /* @__PURE__ */ jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full", children: "Recommandé" }) }),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 p-7 flex flex-col h-full", children: [
                /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 group-hover:bg-purple-500/20 transition-colors duration-300", children: /* @__PURE__ */ jsx(action.icon, { className: "w-6 h-6 text-purple-400" }) }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border mb-3 w-fit ${action.badgeColor}`,
                    children: action.badge
                  }
                ),
                /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-white mb-3", children: action.title }),
                /* @__PURE__ */ jsx("p", { className: "text-white/55 text-sm leading-relaxed flex-1", children: action.description }),
                action.calNamespace ? /* @__PURE__ */ jsxs(
                  "button",
                  {
                    "data-cal-namespace": action.calNamespace,
                    "data-cal-link": action.calLink,
                    "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"dark"}',
                    className: `mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${action.primary ? "text-white glow-primary-sm" : "glass border border-white/10 text-white hover:border-purple-500/30"}`,
                    style: action.primary ? { background: "linear-gradient(135deg, #2708a0, #653ad2)" } : {},
                    children: [
                      action.cta,
                      /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
                    ]
                  }
                ) : /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: action.href,
                    target: ((_a = action.href) == null ? void 0 : _a.startsWith("http")) ? "_blank" : void 0,
                    rel: "noopener noreferrer",
                    className: `mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${action.primary ? "text-white glow-primary-sm" : "glass border border-white/10 text-white hover:border-purple-500/30"}`,
                    style: action.primary ? { background: "linear-gradient(135deg, #2708a0, #653ad2)" } : {},
                    children: [
                      action.cta,
                      /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })
                    ]
                  }
                )
              ] })
            ]
          }
        ) }, action.title);
      }) }),
      /* @__PURE__ */ jsx(BlurFade, { inView: true, delay: 0.5, children: /* @__PURE__ */ jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 px-5 py-3 rounded-full glass border border-amber-500/20", children: [
        /* @__PURE__ */ jsx("span", { className: "text-amber-400 text-sm", children: "⚡" }),
        /* @__PURE__ */ jsxs("span", { className: "text-sm text-white/60", children: [
          "Plus que",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-amber-300 font-bold", children: "2 places disponibles" }),
          " ",
          "ce mois-ci, les projets sérieux passent vite."
        ] })
      ] }) }) })
    ] })
  ] });
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "relative border-t border-white/[0.06] pt-16 pb-10 overflow-hidden", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] opacity-[0.05] pointer-events-none",
        style: {
          background: "radial-gradient(ellipse, #653ad2, transparent 70%)"
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-12 mb-12", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2.5 mb-4", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/logo-axelcoudair.png",
              alt: "Axel Coudair",
              className: "h-9 w-auto"
            }
          ) }),
          /* @__PURE__ */ jsx("p", { className: "text-white/45 text-sm leading-relaxed max-w-xs", children: "Expert web indépendant. Je conçois des sites stratégiques pour les PME qui veulent convertir leurs visiteurs en clients." })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-white/60 uppercase tracking-widest mb-4", children: "Navigation" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: [
            { label: "À propos", href: "/#apropos" },
            { label: "Services", href: "/#services" },
            { label: "Réalisations", href: "/#realisations" },
            { label: "Méthode", href: "/#process" },
            { label: "Performance", href: "/#seo" },
            { label: "Affiliation", href: "/#affiliation" },
            { label: "Contact", href: "/#contact" }
          ].map(({ label, href }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href,
              className: "text-white/45 hover:text-white text-sm transition-colors duration-200",
              children: label
            }
          ) }, href)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold text-white/60 uppercase tracking-widest mb-4", children: "Contact" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "tel:+33760966496",
                className: "flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                  "+33 7 60 96 64 96"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "mailto:hello@axelcoudair.com",
                className: "flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
                  "hello@axelcoudair.com"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "https://wa.me/message/NUKO2RPNV3BUF1",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center gap-3 text-white/45 hover:text-white text-sm transition-colors duration-200",
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4" }),
                  "WhatsApp"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
            /* @__PURE__ */ jsx("div", { className: "h-px bg-white/[0.06] mb-4" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/40 uppercase tracking-widest font-medium mb-3", children: "Suivez moi" }),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.linkedin.com/in/axel-coudair/",
                target: "_blank",
                rel: "noopener noreferrer",
                "aria-label": "LinkedIn",
                className: "w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-purple-500/30 transition-all duration-200",
                children: /* @__PURE__ */ jsx(Linkedin, { className: "w-4 h-4", "aria-hidden": "true" })
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-white/[0.06] pt-8 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-white/50 text-xs", children: [
          "© ",
          year,
          " Axel Coudair · Tous droits réservés"
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/mentions-legales",
            className: "text-white/35 hover:text-white/60 text-xs transition-colors duration-200",
            children: "Mentions légales"
          }
        )
      ] })
    ] })
  ] });
}
function FloatingBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      className: "fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none",
      children: /* @__PURE__ */ jsxs("div", { className: "pointer-events-auto flex items-center gap-4 px-5 py-3.5 rounded-2xl glass border border-white/10 shadow-2xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full border-2 border-purple-500/40 overflow-hidden", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/photo-pro 3.jpg",
              alt: "Axel Coudair",
              className: "w-full h-full object-cover",
              loading: "lazy"
            }
          ) }),
          /* @__PURE__ */ jsx("span", { className: "absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0E0F11]", children: /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" }) })
        ] }),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-white leading-tight", children: "Axel Coudair" }) }),
        /* @__PURE__ */ jsx("div", { className: "w-px h-8 bg-white/10 mx-1 hidden sm:block" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "tel:+33760966496",
              className: "flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90",
              style: {
                background: "linear-gradient(135deg, #2708a0, #653ad2)"
              },
              title: "Appeler",
              children: [
                /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "Appeler" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://wa.me/message/NUKO2RPNV3BUF1",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full text-sm font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300",
              title: "WhatsApp",
              children: [
                /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "WhatsApp" })
              ]
            }
          )
        ] })
      ] })
    }
  ) });
}
function MentionsLegales() {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0E0F11] text-white overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { className: "max-w-4xl mx-auto px-6 pt-40 pb-32", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-purple-500/40" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-purple-400 tracking-widest uppercase font-medium px-3 py-1 rounded-full border border-purple-500/20", children: "Légal" })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-5xl sm:text-6xl font-poppins font-light leading-tight", children: "Mentions légales" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-16", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-poppins font-light mb-6 text-white", children: "Éditeur du site" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white/60 text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "Nom : Axel Coudair" }),
            /* @__PURE__ */ jsx("p", { children: "Statut : Auto-entrepreneur" }),
            /* @__PURE__ */ jsx("p", { children: "Adresse : Paris, France" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Email :",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:hello@axelcoudair.com",
                  className: "text-purple-400 hover:text-purple-300 transition-colors",
                  children: "hello@axelcoudair.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { children: "Numéro SIRET : 84152032300012" }),
            /* @__PURE__ */ jsx("p", { children: "RCS : Paris" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-poppins font-light mb-6 text-white", children: "Directeur de la publication" }),
          /* @__PURE__ */ jsx("div", { className: "text-white/60 text-sm leading-relaxed", children: /* @__PURE__ */ jsx("p", { children: "Axel Coudair" }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-poppins font-light mb-6 text-white", children: "Hébergement" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-white/60 text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "Hébergeur : Vercel, Inc." }),
            /* @__PURE__ */ jsx("p", { children: "Adresse : 340 Pine Street, Suite 401, San Francisco, CA 94104, USA" }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Site web :",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://vercel.com",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-purple-400 hover:text-purple-300 transition-colors",
                  children: "https://vercel.com"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-poppins font-light mb-6 text-white", children: "Propriété intellectuelle" }),
          /* @__PURE__ */ jsx("div", { className: "text-white/60 text-sm leading-relaxed", children: /* @__PURE__ */ jsx("p", { children: "L'ensemble du contenu présent sur le site axelcoudair.com (textes, images, graphismes, logo, icônes, animations, etc.) est protégé par le droit d'auteur et la propriété intellectuelle. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite." }) })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-poppins font-light mb-6 text-white", children: "Données personnelles" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-white/60 text-sm leading-relaxed", children: [
            /* @__PURE__ */ jsx("p", { children: "Les données personnelles collectées via le site (formulaire de contact, email) sont strictement utilisées pour répondre aux demandes de l'utilisateur. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles." }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Pour exercer ce droit, contactez :",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "mailto:hello@axelcoudair.com",
                  className: "text-purple-400 hover:text-purple-300 transition-colors",
                  children: "hello@axelcoudair.com"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-poppins font-light mb-6 text-white", children: "Cookies" }),
          /* @__PURE__ */ jsx("div", { className: "text-white/60 text-sm leading-relaxed", children: /* @__PURE__ */ jsx("p", { children: "Le site peut utiliser des cookies à des fins de mesure d'audience ou de fonctionnement. Vous pouvez configurer votre navigateur pour refuser tout ou partie des cookies." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function Landing() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        var _a;
        (_a = document.querySelector(hash)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, []);
  useEffect(() => {
    (async () => {
      const cal30 = await getCalApi({ namespace: "30min" });
      cal30("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
      const calAudit = await getCalApi({ namespace: "audit-gratuit" });
      calAudit("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-[#0E0F11] text-white overflow-x-hidden", children: [
    /* @__PURE__ */ jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsxs("main", { children: [
      /* @__PURE__ */ jsx(Hero, {}),
      /* @__PURE__ */ jsx(About, {}),
      /* @__PURE__ */ jsx(Services, {}),
      /* @__PURE__ */ jsx(Portfolio2, {}),
      /* @__PURE__ */ jsx(SeoSection, {}),
      /* @__PURE__ */ jsx(Process, {}),
      /* @__PURE__ */ jsx(Affiliation, {}),
      /* @__PURE__ */ jsx(Contact, {})
    ] }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(FloatingBar, {})
  ] });
}
function App() {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Landing, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/mentions-legales", element: /* @__PURE__ */ jsx(MentionsLegales, {}) })
  ] });
}
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) })
  );
}
export {
  render
};
