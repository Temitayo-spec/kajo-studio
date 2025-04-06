"use client";
import HeroSection from "./hero-section";
import Projects from "./projects";
import Services from "./services";
import Testimonials from "./testimonials";

const HomeInject = () => {
  return (
    <main className="relative perspective-wrapper">
      <HeroSection />
      <Projects />
      <Services />
      <Testimonials />
    </main>
  );
};

export default HomeInject;
