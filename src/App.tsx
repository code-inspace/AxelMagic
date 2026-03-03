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

function App() {
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

export default App;
