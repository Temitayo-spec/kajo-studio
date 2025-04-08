"use client";
import { useRef, useEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SERVICES } from "@/constants/projects";
import Image from "next/image";
import { TextReveal } from "@/components/common/text-reveal";
import { DiagonalReveal } from "@/components/common/image-reveal";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
                (What we do)
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
            <h2 className="text-[15rem] font-anton-sc uppercase leading-[100%]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
                delay={0.4}
              >
                Services
              </TextReveal>
            </h2>
            <p className="text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
              {[
                "Discover our tailored services",
                "designed to elevate your brand,",
                "enhance user experience.",
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

        <div>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={i}
              {...s}
              position={i === 1 ? "left" : "right"}
              index={i}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Services;

const ServiceCard: FC<
  IServices & {
    position: string;
    index: number;
  }
> = ({ description, details, image, position, title, index }) => {
  return (
    <article
      className={`bg-inverse-1 flex h-screen ${
        position === "left" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="w-[40%] h-full">
        <DiagonalReveal className="" duration={2} delay={index * 0.1}>
          <Image
            src={image}
            alt={title[0] + title[1]}
            className="object-cover"
          />
        </DiagonalReveal>
      </div>
      <div className="w-[60%] p-[6rem] flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="font-anton-sc uppercase flex flex-col leading-[100%] text-[6rem]">
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
          <p className="font-semibold text-[2rem] tracking-[-0.0625rem] leading-[140%]">
            <TextReveal
              splitType="lines"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={0.4}
            >
              {description}
            </TextReveal>
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-2xl text-white/60 font-gambetta">
            <TextReveal
              key={`details-title-${details.title}`}
              splitType="lines"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={0.6}
            >
              {`(${details.title})`}
            </TextReveal>
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {details.services.map((service, i) => (
              <p key={i} className="text-2xl font-semibold leading-[130%]">
                <TextReveal
                  splitType="lines"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  key={i}
                  delay={i * 0.2}
                >
                  {service}
                </TextReveal>
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
