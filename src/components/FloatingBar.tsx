import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

export function FloatingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 inset-x-0 flex justify-center z-50"
        >
          <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl glass border border-white/10 shadow-2xl">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full border-2 border-purple-500/40 overflow-hidden">
                <img
                  src="/images/photo-pro 3.jpg"
                  alt="Axel Coudair"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0E0F11]">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
              </span>
            </div>

            {/* Name & status */}
            <div>
              <p className="text-sm font-semibold text-white leading-tight">
                Axel Coudair
              </p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                En ligne · Réponse sous 24h
              </p>
            </div>

            <div className="w-px h-8 bg-white/10 mx-1 hidden sm:block" />

            {/* CTA buttons */}
            <div className="flex items-center gap-2">
              <a
                href="tel:+33648180606"
                className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #2708a0, #653ad2)",
                }}
                title="Appeler"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Appeler</span>
              </a>

              <a
                href="https://wa.me/33648180606"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-full text-sm font-semibold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
