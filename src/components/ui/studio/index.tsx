"use client";
import Header from "@/components/common/header";
import React from "react";
import HeroSection from "./hero-section";
import OurTeam from "./our-team";
import Awards from "./awards";
import Footer from "../home/footer";

const StudioInject = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <OurTeam />
      <Awards />
      <Footer />
    </div>
  );
};

export default StudioInject;
