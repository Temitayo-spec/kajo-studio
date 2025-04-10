"use client";
import { useRef, FC, useContext, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "@/components/common/text-reveal";
import { LoadingContext } from "@/components/layout";
import ParallaxMarquee from "@/components/common/parallax-text";
import { AWARDS } from "@/constants/awards";

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
  const sectionRef = useRef(null);
  const { isLoading, animationComplete } = useContext(LoadingContext);
  const awardsRef = useRef(null);

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
    <section ref={sectionRef} className="bg-background min-h-screen z-20">
      <main>
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
                "We're a studio with diverse roots",
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

      <div className="flex flex-col md:flex-row relative" ref={awardsRef}>
        <div className={`h-screen w-full md:w-1/2 sticky top-0`}>
          <ParallaxMarquee />
        </div>

        <div className="w-full md:w-1/2 bg-inverse-1 p-[3rem] md:p-[6rem]">
          <div className="space-y-[6rem]">
            {AWARDS.map((award, i) => (
              <AwardRow key={i} {...award} index={i} />
            ))}
          </div>
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
> = ({ title, index, award }) => {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, {
    once: false,
    amount: 0.3,
    margin: "0px 0px -100px 0px", // Trigger animation a bit earlier
  });

  // Variants for the container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05 * index,
      },
    },
  };

  // Variants for title animation
  const titleVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const charVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Variants for award items
  const awardItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Variants for the divider line
  const dividerVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
        delay: 0.2,
      },
    },
  };

  return (
    <motion.article
      ref={rowRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="flex flex-col justify-between gap-8">
        <motion.h2
          className="font-anton-sc uppercase flex flex-col leading-[100%] text-[4.5rem]"
          variants={titleVariants}
        >
          {title.map((t, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span className="inline-block" variants={titleVariants}>
                {t.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    variants={charVariants}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </div>
          ))}
        </motion.h2>

        <div>
          {award.map((aw, i) => (
            <div key={i}>
              <motion.div
                className="flex items-center justify-between py-6"
                variants={awardItemVariants}
              >
                <p className="text-[1.5rem] font-semibold leading-[130%] tracking-[-0.03125rem]">
                  {aw.title}
                </p>
                <p className="text-[1.25rem] leading-[100%] font-gambetta text-white/60">
                  ({aw.year})
                </p>
              </motion.div>
              {i !== award.length - 1 && (
                <motion.div
                  className="w-full h-[0.125rem] bg-white/20"
                  variants={dividerVariants}
                ></motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
