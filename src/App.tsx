import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Portfolio2 } from "@/components/sections/Portfolio2";
import { SeoSection } from "@/components/sections/SeoSection";
import { Process } from "@/components/sections/Process";
import { Affiliation } from "@/components/sections/Affiliation";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingBar } from "@/components/FloatingBar";
import { MentionsLegales } from "@/pages/MentionsLegales";

function Landing() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="min-h-screen bg-[#0E0F11] text-white overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio2 />
        <SeoSection />
        <Process />
        <Affiliation />
        <Contact />
      </main>
      <Footer />
      <FloatingBar />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
    </Routes>
  );
}

export default App;
