"use client";
import { useRef, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { FOOTER_LINKS } from "@/constants/footer";
import Link from "next/link";
import { TextReveal } from "@/components/common/text-reveal";
import { useGSAPInit } from "@/hooks/useGsapInit";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  useGSAPInit(
    sectionRef as RefObject<HTMLElement>,
    contentRef as RefObject<HTMLElement>
  );

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
