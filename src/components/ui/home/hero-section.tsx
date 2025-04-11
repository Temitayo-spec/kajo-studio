"use client";
import { COMPANIES, hero_banner } from "@/constants/images";
import Image from "next/image";
import { useContext, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TextReveal } from "@/components/common/text-reveal";
import {
  DiagonalReveal,
  SmallerImageBottomUpReveal,
} from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";
import Navigation from "@/components/common/navigation";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);

  useGSAP(
    () => {
      if (!isLoading && animationComplete) {
        ScrollTrigger.getAll().forEach((st) => st.kill());
        ScrollTrigger.refresh();

        setTimeout(() => {
          gsap.to(imageRef.current, {
            objectPosition: "85% center",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
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
      }
    },
    {
      dependencies: [isLoading, animationComplete],
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className="max-w-[1440px] mx-auto flex min-h-screen"
    >
      <div ref={leftSideRef} className="h-screen w-1/2 sticky top-0">
        <DiagonalReveal className="h-full" delay={1.5} duration={2}>
          <div className="relative h-full">
            <Image
              ref={imageRef}
              src={hero_banner}
              alt="hero banner"
              className="object-cover w-full h-full"
              priority
              quality={100}
              fill
              style={{ objectPosition: "15% center" }}
            />
          </div>
        </DiagonalReveal>
      </div>

      <div className="w-1/2 flex-1">
        <div ref={contentRef} className="transform-container">
          <Navigation isHomePage={true} />

          <div className="px-[4.5rem] pt-[4.37rem] pb-12">
            <h1 className="font-anton-sc text-[10rem] uppercase flex flex-col leading-[100%]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={1.5}
              >
                ©kajo
              </TextReveal>

              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                delay={1.7}
                stagger={0.08}
              >
                studio
              </TextReveal>
            </h1>

            <p className="text-4xl mt-32 -tracking-[0.02345rem] leading-[130%] font-semibold">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={1.9}
              >
                Crafting impactful brands and
              </TextReveal>
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                delay={2.1}
                stagger={0.08}
              >
                websites that drive growth and
              </TextReveal>
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                delay={2.3}
                stagger={0.08}
              >
                success.
              </TextReveal>
            </p>
          </div>

          <div className="px-[6rem] pt-[4.5rem] pb-[6rem] space-y-[8rem]">
            <div>
              <span className="font-gambetta leading-[100%] text-2xl mb-6">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                >
                  (About Us)
                </TextReveal>
              </span>
              <h2 className="flex flex-col leading-[110%] text-[4.25rem] font-anton-sc uppercase mb-4">
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                >
                  Creative Brands,
                </TextReveal>
                <TextReveal
                  splitType="chars"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={0.2}
                >
                  Powerful Websites
                </TextReveal>
              </h2>

              <p className="flex flex-col gap-8 text-xl text-white/60 font-normal leading-[170%]">
                <span>
                  {[
                    "We are passionate about creating meaningful",
                    "brands and dynamic websites that stand out in",
                    "today's competitive market. Our team",
                    "strategic thinking with creative design to craft",
                    "custom solutions that align with your business",
                    "goals. From developing a unique brand identity to",
                    "designing intuitive, responsive websites, we focus on",
                    "delivering experiences that engage and convert.",
                  ].map((lines, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={i}
                    >
                      {lines}
                    </TextReveal>
                  ))}
                </span>
                <span>
                  {[
                    "With every project, we ensure that your brand's story",
                    "is told in a way that resonates with your audience,",
                    "builds trust, and drives growth. Let us help you",
                    "transform your brand and take your digital presence",
                    "to the next level.",
                  ].map((lines, i) => (
                    <TextReveal
                      splitType="lines"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={i * 0.05}
                      key={i}
                    >
                      {lines}
                    </TextReveal>
                  ))}
                </span>
              </p>
            </div>

            <div>
              <span className="font-gambetta leading-[100%] text-2xl mb-6">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                >
                  (Companies we worked with)
                </TextReveal>
              </span>

              <div className="grid grid-cols-3 gap-8">
                {COMPANIES.map((company, index) => (
                  <div key={index}>
                    <SmallerImageBottomUpReveal
                      delay={index * 0.1}
                      duration={1}
                    >
                      <Image
                        src={company}
                        alt="company"
                        className="object-contain"
                      />
                    </SmallerImageBottomUpReveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
