"use client";
import { useRef, useEffect, useContext } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { TESTIMONIALS } from "@/constants/testimonials";
import { TextReveal } from "@/components/common/text-reveal";
import { FallingCard } from "./falling-card";
import { useScroll } from "framer-motion";
import { LoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const testimonialRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: testimonialRef,
    offset: ["start end", "end start"],
  });

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
        gsap.to(contentRef.current, {
          rotateX: "0deg",
          scale: 1,
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom-=300",
          end: "bottom top-=300",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(sectionRef.current, {
          rotateX: "12deg",
          scale: 0.92,
          opacity: 0.8,
          transformOrigin: "center bottom",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom-=300",
            end: "bottom bottom-=500",
            scrub: true,
          },
        });
      }, 100);
    }, sectionRef);

    return () => ctx.revert();
  };

  return (
    <section
      ref={sectionRef}
      className="bg-background min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <header className="w-[90%] mx-auto max-w-[1440px] py-[6rem] space-y-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                (Testimonials)
              </TextReveal>
            </p>
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                (03)
              </TextReveal>
            </p>
          </div>

          <div>
            <h2 className="text-[11.25rem] font-anton-sc uppercase leading-[100%]">
              {["What our", "clients say"].map((char, i) => (
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={i * 0.2}
                  key={i}
                >
                  {char}
                </TextReveal>
              ))}
            </h2>
            <p className="text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
              {[
                "Hear our clients about their success",
                "stories and experiences with us.",
              ].map((lines, i) => (
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={i === 0 ? 0.05 : i * 0.1}
                  key={i}
                >
                  {lines}
                </TextReveal>
              ))}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3" ref={testimonialRef}>
          {TESTIMONIALS.map((t, i) => (
            <FallingCard
              key={i}
              index={i}
              scrollYProgress={scrollYProgress}
              {...t}
              background={i % 2 !== 0}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Testimonials;
