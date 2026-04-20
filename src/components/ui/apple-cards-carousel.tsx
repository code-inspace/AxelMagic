import { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { ReferenceGallery } from "./ReferenceGallery";

const isVideoSrc = (src: string) => /\.(mov|mp4|webm)$/i.test(src);

function MediaPreview({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isVideoSrc(src)) return;
    const video = videoRef.current;
    if (!video) return;

    const capture = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPosterUrl(canvas.toDataURL("image/jpeg", 0.85));
      } catch {
        // cross-origin or decode error — no poster available
      }
    };

    video.preload = "auto";
    video.load();
    video.addEventListener("loadeddata", capture, { once: true });
    video.play().catch(() => setVideoFailed(true));

    return () => video.removeEventListener("loadeddata", capture);
  }, [src]);

  if (!isVideoSrc(src)) {
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className={className}
        style={{ pointerEvents: "none", display: videoFailed ? "none" : undefined }}
      >
        <track kind="captions" />
      </video>
      {videoFailed && posterUrl && (
        <img src={posterUrl} alt={alt} className={className} />
      )}
    </>
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

  // Extract a clean SEO description
  let rawDesc = card.title;
  if (card.content && typeof card.content === "object" && "props" in card.content) {
    if ((card.content.props as any).description) {
      rawDesc = (card.content.props as any).description;
    }
  }
  const seoDesc = typeof rawDesc === "string" 
    ? rawDesc.split("\n")[0].substring(0, 160) 
    : `Découvrez le projet ${card.title}`;

  return (
    <>
      <Helmet>
        <title>{card.title} | Axel Coudair - Étude de cas</title>
        <meta name="description" content={seoDesc} />
      </Helmet>
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
          id="modal-scroll-container"
          layoutId={`apple-card-${card.id}`}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl pointer-events-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              <div className="mt-16 w-full -mx-7" style={{ width: "calc(100% + 3.5rem)" }}>
                <ReferenceGallery images={card.gallery} />
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
      className="relative flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] h-80 rounded-3xl cursor-pointer select-none snap-start sm:snap-align-none"
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState<CardData | null>(null);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  // Sync state with URL parameter
  useEffect(() => {
    if (id) {
      const cardFromUrl = cards.find(c => c.id === id);
      if (cardFromUrl) {
        setActiveCard(cardFromUrl);
      } else {
        setActiveCard(null);
      }
    } else {
      setActiveCard(null);
    }
  }, [id, cards]);

  const handleClose = () => {
    navigate("/", { replace: false, preventScrollReset: true });
  };

  const handleCardClick = (card: CardData) => {
    navigate(`/realisation/${card.id}`, { preventScrollReset: true });
  };

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

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = window.innerWidth < 640 ? el.clientWidth : 290;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <>
      {mounted && createPortal(
        <AnimatePresence>
          {activeCard && (
            <CardModal card={activeCard} onClose={handleClose} />
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="relative">
        {/* Gradient masks — desktop only */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-[#0E0F11] to-transparent z-10 pointer-events-none" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-[#0E0F11] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-0 sm:gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-6 sm:px-6 snap-x snap-mandatory sm:snap-none"
        >
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              active={activeCard?.id === card.id}
              onClick={() => handleCardClick(card)}
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
