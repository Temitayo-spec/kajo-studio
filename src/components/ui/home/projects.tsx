"use client";
import { useRef, useLayoutEffect, FC } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { PROJECTS } from "@/constants/projects";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
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
      className="bg-inverse-1 min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <header className="w-[90%] mx-auto max-w-[1440px] py-[6rem] space-y-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-2xl text-white/60">
              (Selected Work)
            </p>
            <p className="font-gambetta text-2xl text-white/60">(01)</p>
          </div>

          <div>
            <h2 className="text-[15rem] font-anton-sc uppercase leading-[100%]">
              Projects
            </h2>
            <p className="text-[3.75rem] font-semibold leading-[120%] tracking-[-0.125rem]">
              <span>Explore our recent projects</span>
              <span>showcasing creativity, innovation,</span>
              <span>and impactful design solutions.</span>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 max-w-[1440px] mx-auto">
          {PROJECTS.map((project, index) => {
            return <ProjectCard key={index} {...project} />;
          })}
        </div>
      </main>
    </section>
  );
};

export default Projects;

const ProjectCard: FC<IProjects> = ({ image, name, year }) => {
  return (
    <article>
      <div>
        <Image src={image} alt={name} className="object-contain" />
      </div>

      <div className="p-8 flex items-center justify-between">
        <h4 className="text-[1.875rem] font-semibold leading-[140%] tracking-[-0.0625rem]">
          {name}
        </h4>
        <p className="font-gambetta text-2xl text-white/60 leading-[100%]">
          ({year})
        </p>
      </div>
    </article>
  );
};
