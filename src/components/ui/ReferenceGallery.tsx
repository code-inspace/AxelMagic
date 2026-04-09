import { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const isVideoSrc = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

function MediaCard({ src, alt, onClick }: { src: string; alt: string; onClick?: () => void }) {
  if (isVideoSrc(src)) {
    return (
      <div className="relative w-full h-full" onClick={onClick}>
        <video src={src} aria-hidden muted loop playsInline className="absolute inset-0 w-full h-full object-cover scale-110" style={{ filter: "blur(24px)" }} />
        <video src={src} autoPlay muted loop playsInline className="relative w-full h-full object-contain">
          <track kind="captions" />
        </video>
      </div>
    );
  }
  return (
    <div className="relative w-full h-full cursor-zoom-in" onClick={onClick}>
      <img src={src} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110" style={{ filter: "blur(24px)" }} loading="lazy" />
      <img src={src} alt={alt} className="relative w-full h-full object-contain" loading="lazy" />
    </div>
  );
}

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const resetView = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);
  const prev = useCallback(() => { setCurrent(i => (i - 1 + images.length) % images.length); resetView(); }, [images.length, resetView]);
  const next = useCallback(() => { setCurrent(i => (i + 1) % images.length); resetView(); }, [images.length, resetView]);
  const toggleZoom = useCallback(() => { setZoom(z => { if (z > 1) { setPan({ x: 0, y: 0 }); return 1; } return 2.5; }); }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && zoom === 1) prev();
      if (e.key === "ArrowRight" && zoom === 1) next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next, zoom]);

  // Mouse pan handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    isPanning.current = true;
    panStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
    e.preventDefault();
  }, [zoom, pan]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!isPanning.current) return;
      setPan({ x: panStart.current.px + e.clientX - panStart.current.mx, y: panStart.current.py + e.clientY - panStart.current.my });
    };
    const onUp = () => { isPanning.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  // Touch pan
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (zoom <= 1 || e.touches.length !== 1) return;
    isPanning.current = true;
    panStart.current = { mx: e.touches[0].clientX, my: e.touches[0].clientY, px: pan.x, py: pan.y };
  }, [zoom, pan]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPanning.current || e.touches.length !== 1) return;
    e.stopPropagation();
    setPan({ x: panStart.current.px + e.touches[0].clientX - panStart.current.mx, y: panStart.current.py + e.touches[0].clientY - panStart.current.my });
  }, []);

  const src = images[current];

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={zoom > 1 ? undefined : onClose}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 flex gap-2 z-10" onClick={e => e.stopPropagation()}>
        {!isVideoSrc(src) && (
          <button onClick={toggleZoom} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            {zoom > 1 ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
        )}
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Prev */}
      {images.length > 1 && zoom === 1 && (
        <button
          onClick={e => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-[90vw] h-[90vh] overflow-hidden flex items-center justify-center"
        onClick={e => e.stopPropagation()}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        style={{ cursor: zoom > 1 ? (isPanning.current ? "grabbing" : "grab") : "default" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-full h-full"
          >
            {isVideoSrc(src) ? (
              <video src={src} autoPlay muted loop playsInline className="max-w-full max-h-full object-contain">
                <track kind="captions" />
              </video>
            ) : (
              <img
                src={src}
                alt={`Aperçu ${current + 1}`}
                className="max-w-full max-h-full object-contain select-none"
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isPanning.current ? "none" : "transform 0.3s ease",
                  cursor: zoom > 1 ? "grab" : "zoom-in",
                }}
                onClick={zoom === 1 ? toggleZoom : undefined}
                draggable={false}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next */}
      {images.length > 1 && zoom === 1 && (
        <button
          onClick={e => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); setZoom(1); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === current ? "bg-white w-4" : "bg-white/30"}`}
            />
          ))}
        </div>
      )}
    </motion.div>,
    document.body
  );
}

export function ReferenceGallery({ images }: { images: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) return;

    const timeoutId = setTimeout(() => {
      const ctx = gsap.context(() => {
        const wrapper = wrapperRef.current;
        const container = containerRef.current;
        const scroller = document.querySelector("#modal-scroll-container");

        if (!wrapper || !container || !scroller) return;

        const distance = wrapper.scrollWidth - container.clientWidth;
        const dwell = 400; // px de scroll vertical avant de commencer l'horizontal
        container.style.height = `calc(${distance + dwell}px + 100vh)`;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            scroller,
            start: "top 15%",
            end: () => `+=${distance + dwell}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        // Pause initiale : reste sur la 1ère photo
        tl.to(wrapper, { x: 0, duration: dwell, ease: "none" });
        // Puis scroll horizontal
        tl.to(wrapper, { x: -distance, duration: distance, ease: "none" });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>

      {/* Desktop — GSAP scroll-linked */}
      <section ref={containerRef} className="hidden lg:block w-full relative my-12" style={{ minHeight: "100vh" }}>
        <div className="sticky top-[15vh] w-full h-[50vh] sm:h-[60vh] overflow-hidden flex flex-col justify-center">
          <div ref={wrapperRef} className="flex items-center h-[90%] gap-6 sm:gap-10 w-max">
            {images.map((src, i) => (
              <div key={i} className="story-card relative w-[60vw] max-w-3xl h-full flex-shrink-0 rounded-2xl overflow-hidden border border-white/5">
                <MediaCard src={src} alt={`Aperçu ${i + 1}`} onClick={() => !isVideoSrc(src) && setLightboxIndex(i)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile — native horizontal scroll */}
      <div className="lg:hidden w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden my-8" style={{ scrollSnapType: "x mandatory" }}>
        <div className="flex gap-4 w-max py-2 px-1">
          {images.map((src, i) => (
            <div key={i} className="story-card relative w-[80vw] aspect-[4/3] flex-shrink-0 rounded-2xl overflow-hidden border border-white/5" style={{ scrollSnapAlign: "start" }}>
              <MediaCard src={src} alt={`Aperçu ${i + 1}`} onClick={() => !isVideoSrc(src) && setLightboxIndex(i)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
