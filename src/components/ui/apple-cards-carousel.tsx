import { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const isVideoSrc = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

function MediaPreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return isVideoSrc(src) ? (
    <video src={src} autoPlay muted loop playsInline className={className}>
      <track kind="captions" />
    </video>
  ) : (
    <img src={src} alt={alt} className={className} loading="lazy" />
  );
}

export interface CardData {
  id: string;
  category: string;
  title: string;
  background?: string;
  image?: string;
  gallery?: string[];
  content: ReactNode;
}

export function CardModal({ card, onClose }: { card: CardData; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
        <motion.div
          layoutId={`apple-card-${card.id}`}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header with background */}
          <div
            className="h-64 relative overflow-hidden rounded-t-3xl flex-shrink-0 bg-[#141416]"
            style={{ background: card.background }}
          >
            {card.image && (
              <MediaPreview
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
            <div className="absolute bottom-6 left-7">
              <p className="text-[10px] text-white/60 uppercase tracking-widest mb-2">
                {card.category}
              </p>
              <h3 className="text-2xl font-poppins font-light text-white leading-tight">
                {card.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="bg-[#0E0F11] rounded-b-3xl border border-white/[0.07] border-t-0 p-7">
            {card.content}
            {card.gallery && card.gallery.length > 0 && (
              <div className="mt-8">
                <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">
                  Aperçu
                </h4>
                <div className="space-y-3">
                  {card.gallery.map((src, i) => (
                    <MediaPreview
                      key={i}
                      src={src}
                      alt={`${card.title} screenshot ${i + 1}`}
                      className="w-full rounded-xl border border-white/[0.07] object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

function CardItem({
  card,
  active,
  onClick,
}: {
  card: CardData;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      layoutId={`apple-card-${card.id}`}
      onClick={onClick}
      whileHover={{ scale: active ? 1 : 1.03, y: active ? 0 : -4 }}
      transition={{ duration: 0.25 }}
      className="relative flex-shrink-0 w-[calc(50%-0.5rem)] h-80 rounded-3xl cursor-pointer select-none"
      style={{
        opacity: active ? 0 : 1,
        pointerEvents: active ? "none" : "auto",
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        style={{ background: card.background }}
      >
        {card.image && (
          <MediaPreview
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <div className="absolute bottom-5 left-5 right-5">
          <p className="text-[10px] text-white/60 uppercase tracking-widest mb-1.5">
            {card.category}
          </p>
          <h3 className="text-base font-poppins font-light text-white leading-snug">
            {card.title}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

export function AppleCardsCarousel({ cards }: { cards: CardData[] }) {
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") =>
    scrollRef.current?.scrollBy({ left: dir === "left" ? -290 : 290, behavior: "smooth" });

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {activeCard && (
            <CardModal card={activeCard} onClose={() => setActiveCard(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#0E0F11] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#0E0F11] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-6 px-6"
        >
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              active={activeCard?.id === card.id}
              onClick={() => setActiveCard(card)}
            />
          ))}
        </div>

        {/* Scroll buttons */}
        <div className="flex justify-end gap-2 mt-3 pr-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canLeft}
            aria-label="Précédent"
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:border-purple-500/40 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canRight}
            aria-label="Suivant"
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:border-purple-500/40 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
