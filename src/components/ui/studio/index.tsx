"use client";
import HeroSection from "./hero-section";
import OurTeam from "./our-team";
import Awards from "./awards";
import Footer from "../home/footer";
import Navigation from "@/components/common/navigation";

const StudioInject = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <OurTeam />
      <Awards />
      <Footer />
    </div>
  );
};

export default StudioInject;
