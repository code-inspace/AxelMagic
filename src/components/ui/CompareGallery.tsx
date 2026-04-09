import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CompareTab {
  id: string;
  label: string;
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
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => {
    isDragging.current = true;
  };
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      updatePos(e.clientX);
    },
    [updatePos],
  );
  const onMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none cursor-col-resize overflow-hidden"
      onMouseDown={onMouseDown}
      onTouchMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(
          0,
          Math.min(e.touches[0].clientX - rect.left, rect.width),
        );
        setPos((x / rect.width) * 100);
      }}
    >
      {/* Right — blurry bg + image (fixed size) */}
      <img
        src={right}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none"
        style={{ filter: "blur(24px)", opacity: 1 }}
        draggable={false}
      />
      <img
        src={right}
        alt={rightLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        draggable={false}
      />

      {/* Left — same fixed size, clipped via clip-path */}
      <img
        src={left}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover scale-110 pointer-events-none"
        style={{
          filter: "blur(24px)",
          opacity: 1,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
        draggable={false}
      />
      <img
        src={left}
        alt={leftLabel}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none z-10"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 2L2 7l3 5M9 2l3 5-3 5"
              stroke="#111"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none z-10">
        {leftLabel}
      </span>
      <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-widest text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none z-10">
        {rightLabel}
      </span>
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
            className={`relative shrink-0 px-5 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
              active === tab.id
                ? "text-white border-purple-500/60 bg-purple-500/15"
                : "text-white/40 border-white/10 bg-white/[0.03] hover:text-white/70 hover:border-white/20"
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
          {/* Photos — 50% */}
          <div className="w-full md:w-2/3 aspect-[4/3] bg-[#0a0a0c] border border-white/[0.06] overflow-hidden flex-shrink-0">
            <BeforeAfter
              left={current.left}
              right={current.right}
              leftLabel={current.leftLabel}
              rightLabel={current.rightLabel}
            />
          </div>

          {/* Description — 50% */}
          <div className="flex-1 flex flex-col justify-center">
            {current.description && (
              <p className="text-white/50 text-sm leading-relaxed">
                {current.description}
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
