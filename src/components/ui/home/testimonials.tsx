"use client";
import { useRef, useLayoutEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { TESTIMONIALS } from "@/constants/testimonials";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
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
    <section
      ref={sectionRef}
      className="bg-background min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <header className="w-[90%] mx-auto max-w-[1440px] py-[6rem] space-y-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-2xl text-white/60">
              (Testimonials)
            </p>
            <p className="font-gambetta text-2xl text-white/60">(03)</p>
          </div>

          <div>
            <h2 className="text-[11.25rem] font-anton-sc uppercase leading-[100%]">
              <span>What our</span>
              <span>clients Say</span>
            </h2>
            <p className="text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
              <span>Hear our clients about their success</span>
              <span>stories and experiences with us.</span>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={i}
              {...t}
              background={i % 2 !== 0 ? true : false}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default Testimonials;

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
        <h3 className="text-3xl font-semibold leading-[140%] tracking-[-0.0625rem]">{testimonial}</h3>
        <p className="leading-[180%] text-[0.9375rem] text-white/60">{extra_comment}</p>
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
