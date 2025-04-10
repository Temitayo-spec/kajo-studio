"use client";
import { TextReveal } from "@/components/common/text-reveal";
import Image from "next/image";
import studio_banner from "@/images/studio_banner.png";
import { useContext, useEffect, useRef } from "react";
import { LoadingContext } from "@/components/layout";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useEffect(() => {
    if (!isLoading && animationComplete) {
      initializeGSAP();
    }
  }, [isLoading, animationComplete]);

  const initializeGSAP = () => {
    const ctx = gsap.context(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ScrollTrigger.refresh();

      setTimeout(() => {
        gsap.to(imageRef.current, {
          objectPosition: "50% 100%",
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom+=1000 bottom",
            scrub: true,
          },
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "bottom bottom-=300",
          end: "bottom top-=300",
          pin: true,
          pinSpacing: false,
          id: "hero-pin",
        });

        gsap.to(containerRef.current, {
          rotateX: "12deg",
          scale: 0.92,
          opacity: 0.8,
          transformOrigin: "center bottom",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom bottom-=300",
            end: "bottom bottom-=500",
            scrub: true,
          },
        });
      }, 100);
    }, containerRef);

    return () => ctx.revert();
  };

  return (
    <section ref={containerRef} className="space-y-[4.5rem]">
      <div className="w-[90%] mx-auto max-w-[1440px]">
        <div className="text-[15rem] font-anton-sc uppercase leading-[100%]">
          <TextReveal
            splitType="chars"
            direction="up"
            duration={0.7}
            stagger={0.08}
            delay={1.6}
          >
            Ahoj Kajo
          </TextReveal>
        </div>
        <p className="text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
          {[
            "Discover our mission, values, & the",
            "passionate team behind our success.",
          ].map((lines, i) => (
            <TextReveal
              splitType="lines"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={i === 0 ? 1.8 : i * 0.05 + 1.9}
              key={i}
            >
              {lines}
            </TextReveal>
          ))}
        </p>
      </div>

      <div className="h-[85vh] w-full relative overflow-hidden">
        <div
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          <Image
            ref={imageRef}
            src={studio_banner}
            alt="studio banner"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            style={{
              objectPosition: "50% 0%",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
