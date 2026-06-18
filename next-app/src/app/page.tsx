import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import BrandScoreboard from "@/components/BrandScoreboard";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <StatsBar />
      <BrandScoreboard />
      <HowItWorks />
      <CTASection />
      <Footer />
    </>
  );
}
