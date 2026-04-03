import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StandsSection from "@/components/StandsSection";
import InscriptionSection from "@/components/InscriptionSection";
import AnimationsSection from "@/components/AnimationsSection";
import ProgrammeSection from "@/components/ProgrammeSection";
import RestaurationSection from "@/components/RestaurationSection";
import PlanSection from "@/components/PlanSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <InscriptionSection />
      <StandsSection />
      <AnimationsSection />
      <ProgrammeSection />
      <RestaurationSection />
      <PlanSection />
      <Footer />
    </main>
  );
}
