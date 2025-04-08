"use client";
import { useRef, useLayoutEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SERVICES } from "@/constants/projects";
import Image from "next/image";
import { TESTIMONIALS } from "@/constants/testimonials";
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

const TestimonialCard: FC<
  ITestimonials & {
    background: boolean;
  }
> = ({ avatar, background, company, extra_comment, name, testimonial }) => {
  return (
    <article
      className={` flex flex-col p-[3.75rem] ${
        background ? "bg-inverse-2" : "bg-inverse-1"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="30"
        viewBox="0 0 48 30"
        fill="none"
        className="mb-[4.5rem]"
      >
        <path
          d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z"
          fill="white"
        />
      </svg>

      <div className="space-y-4 mb-9">
        <h3 className="text-3xl font-semibold leading-[140%] tracking-[-0.0625rem]">
          {testimonial}
        </h3>
        <p className="leading-[180%] text-[0.9375rem] text-white/60">
          {extra_comment}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <Image
            src={avatar}
            alt={name}
            className="object-contain w-12 h-12"
            quality={100}
          />
        </div>
        <div>
          <h4 className="text-xl leading-[130%] font-semibold">{name}</h4>
          <p className="font-gambetta text-white/60">({company})</p>
        </div>
      </div>
    </article>
  );
};
