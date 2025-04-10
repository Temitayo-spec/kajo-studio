"use client";
import { useRef, useEffect, FC, useContext } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { TextReveal } from "@/components/common/text-reveal";
import { DiagonalReveal } from "@/components/common/image-reveal";
import { LoadingContext } from "@/components/layout";
import { OUR_TEAM } from "@/constants/our-team";
import Link from "next/link";
import { MotionValue, useScroll, useTransform, motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const OurTeam = () => {
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
  const teamRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: teamRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="bg-inverse-1 min-h-screen perspective-section relative z-20"
    >
      <main ref={contentRef} className="transform-container">
        <header className="w-[90%] mx-auto max-w-[1440px] pt-[6rem] space-y-[6rem]">
          <div className="flex items-center justify-between">
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                (Our Team)
              </TextReveal>
            </p>
            <p className="font-gambetta text-2xl text-white/60">
              <TextReveal
                splitType="lines"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                (01)
              </TextReveal>
            </p>
          </div>

          <div>
            <div className="text-[11.25rem] font-anton-sc uppercase leading-[100%]">
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                Creative Minds
              </TextReveal>
              <TextReveal
                splitType="chars"
                direction="up"
                duration={0.7}
                stagger={0.08}
              >
                Behind Success
              </TextReveal>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 pt-[8rem]" ref={teamRef}>
          {OUR_TEAM.map((team, i) => (
            <TeamCard
              key={i}
              {...team}
              index={i}
              background={i % 2 !== 0}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </main>
    </section>
  );
};

export default OurTeam;

const TeamCard: FC<
  IOurTeam & {
    index: number;
    background?: boolean;
    scrollYProgress: MotionValue<number>;
  }
> = ({
  image,
  name,
  index,
  description,
  role,
  socials,
  background,
  scrollYProgress,
}) => {
  const start = index * 0.06;
  const end = start + 0.2;

  const y = useTransform(scrollYProgress, [start, end], [100, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  return (
    <motion.article
      className={`${background ? "bg-inverse-2" : "bg-inverse-1"}`}
      style={{ y, opacity }}
    >
      <DiagonalReveal className="" duration={2} delay={index * 0.1}>
        <div className="relative">
          <Image
            src={image}
            alt={name[0]}
            className="object-contain w-full h-auto"
          />

          <div className="absolute bottom-0 right-0 flex items-center">
            {socials.map((social, i) => (
              <Link
                href={social.link}
                target="_blank"
                key={i}
                className="bg-white w-[2.75rem] h-[2.75rem] inline-flex items-center justify-center"
              >
                <Image src={social.icon} alt="" />
              </Link>
            ))}
          </div>
        </div>
      </DiagonalReveal>

      <div className="p-[3.75rem] flex flex-col">
        <p className="font-gambetta text-xl text-white/60 leading-[100%] mb-9">
          <TextReveal splitType="lines" direction="up" duration={0.7}>
            {role}
          </TextReveal>
        </p>
        <h4 className="text-5xl flex flex-col font-semibold leading-[110%] font-anton-sc uppercase mb-4">
          {name.map((n, i) => (
            <TextReveal
              splitType="chars"
              direction="up"
              duration={0.7}
              stagger={0.08}
              delay={i * 0.05}
              key={i}
            >
              {n}
            </TextReveal>
          ))}
        </h4>

        <p className="text-base text-white/60 leading-[170%]">
          <TextReveal
            splitType="lines"
            direction="up"
            duration={0.7}
            stagger={0.08}
            delay={0.2}
          >
            {description}
          </TextReveal>
        </p>
      </div>
    </motion.article>
  );
};
