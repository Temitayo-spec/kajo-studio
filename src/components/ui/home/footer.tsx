"use client";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FOOTER_LINKS } from "@/constants/footer";
import Link from "next/link";
import { TextReveal } from "@/components/common/text-reveal";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
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
    <footer
      ref={sectionRef}
      className="bg-white min-h-screen perspective-section relative z-20"
    >
      <div className="w-[90%] max-w-[1440px] mx-auto pt-[4.5rem] pb-12 flex flex-col justify-between h-full">
        <h2 className="font-anton-sc text-[11.37rem] uppercase text-background leading-[100%]">
          <TextReveal
            splitType="chars"
            direction="up"
            duration={0.7}
            stagger={0.08}
          >
            KAjO©
          </TextReveal>
        </h2>

        <div className="flex justify-between">
          {FOOTER_LINKS.map((links, index) => (
            <div key={index} className="space-y-6 flex flex-col">
              <h4 className="font-gambetta text-2xl text-footer-links">
                <TextReveal
                  splitType="words"
                  direction="up"
                  duration={0.7}
                  stagger={0.08}
                  delay={index * 0.05}
                >
                  {`(${links.category})`}
                </TextReveal>
              </h4>
              <div className="flex flex-col gap-4">
                {links?.links?.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-background text-xl leading-[130%] font-semibold"
                  >
                    <TextReveal
                      splitType="words"
                      direction="up"
                      duration={0.7}
                      stagger={0.08}
                      delay={index * 0.05}
                    >
                      {link.name}
                    </TextReveal>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
