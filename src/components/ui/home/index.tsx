"use client";
import HeroSection from "./hero-section";
import Projects from "./projects";
import Services from "./services";

const HomeInject = () => {
  return (
    <main className="relative perspective-wrapper">
      <HeroSection />
      <Projects />
      <Services />
    </main>
  );
};

export default HomeInject;
