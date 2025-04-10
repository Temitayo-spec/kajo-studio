"use client";
import { useRef, FC, useContext, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextReveal } from "@/components/common/text-reveal";
import { DiagonalReveal } from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";
import ParallaxMarquee from "@/components/common/parallax-text";
import { AWARDS } from "@/constants/awards";

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
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
                (What we achieved)
              </TextReveal>
            </p>
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.2}
              >
                (02)
              </TextReveal>
            </p>
          </div>

          <div>
            <h2 className="text-[11.25rem] font-anton-sc uppercase leading-[100%]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.4}
              >
                Awards &
              </TextReveal>
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.4}
              >
                Recognition
              </TextReveal>
            </h2>
            <p className="text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
              {[
                "We’re a studio with diverse roots",
                "that want to help companies.",
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
      </main>
      <div className="flex">
        <ParallaxMarquee />
        <div className="flex flex-col gap-[6rem] w-[50%] bg-inverse-1">
          {AWARDS.map((award, i) => (
            <AwardRow key={i} {...award} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;

const AwardRow: FC<
  IAwards & {
    index: number;
  }
> = ({ title, index }) => {
  return (
    <article className={``}>
      <div className="p-[6rem] flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="font-anton-sc uppercase flex flex-col leading-[100%] text-[4.5rem]">
            {title.map((t, i) => (
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                key={i}
                delay={i * 0.1}
              >
                {t}
              </TextReveal>
            ))}
          </h2>
        </div>
      </div>
    </article>
  );
};
