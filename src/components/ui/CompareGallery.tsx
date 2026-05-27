import { useState, useRef, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CompareTab {
  id: string;
  label: string;
  title: string;
  icon: ReactNode;
  left: string;
  right: string;
  leftLabel?: string;
  rightLabel?: string;
  description: string;
}

function BeforeAfter({
  left,
  right,
  leftLabel = "Avant",
  rightLabel = "Après",
}: {
  left: string;
  right: string;
  leftLabel?: string;
  rightLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const [containerW, setContainerW] = useState(0);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track container width in px for fixed-size left image
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.offsetWidth);
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    updatePos(e.clientX);
  }, [updatePos]);
  const onMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  const clipW = (pos / 100) * containerW;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-col-resize overflow-hidden rounded-xl"
      onMouseDown={onMouseDown}
      onTouchMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
        setPos((x / rect.width) * 100);
      }}
    >
      {/* Right , blurry bg + image */}
      <img src={right} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none" style={{ filter: "blur(24px)" }} draggable={false} />
      <img src={right} alt={rightLabel} className="absolute inset-0 w-full h-full object-contain pointer-events-none" draggable={false} />

      {/* Left , outer clips, inner is fixed-size so image never rescales */}
      <div className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none" style={{ width: clipW }}>
        <div className="absolute inset-y-0 left-0" style={{ width: containerW }}>
          <img src={left} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover scale-110" style={{ filter: "blur(24px)" }} draggable={false} />
          <img src={left} alt={leftLabel} className="absolute inset-0 w-full h-full object-contain" draggable={false} />
        </div>
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none z-10" style={{ left: clipW, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 2L2 7l3 5M9 2l3 5-3 5" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none z-10">{leftLabel}</span>
      <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none z-10">{rightLabel}</span>
    </div>
  );
}

export function CompareGallery({ tabs }: { tabs: CompareTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative shrink-0 px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${active === tab.id
                ? "text-white border-purple-500/60 bg-purple-500/15"
                : "text-white border-white/10 bg-white/[0.03] hover:text-white hover:border-white/20"
              }`}
          >
            {tab.label}
            {active === tab.id && (
              <motion.div
                layoutId="compare-tab-indicator"
                className="absolute inset-0 rounded-full ring-1 ring-purple-500/40"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Compare view */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6"
        >
          {/* Photos , 50% */}
          <div className="w-full md:w-2/3 aspect-[4/3] bg-[#0a0a0c] border border-white/[0.06] overflow-hidden flex-shrink-0 rounded-xl">
            <BeforeAfter
              left={current.left}
              right={current.right}
              leftLabel={current.leftLabel}
              rightLabel={current.rightLabel}
            />
          </div>

          {/* Description , 50% */}
          <div className="flex-1 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-white">
                {current.icon}
              </div>
              <h4 className="text-base font-semibold text-white">{current.title}</h4>
            </div>
            {current.description && (
              <p className="text-white text-sm leading-relaxed">
                {current.description}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
