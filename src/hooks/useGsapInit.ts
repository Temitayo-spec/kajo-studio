"use client";
import { useEffect, useState, RefObject } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLoadingContext } from "@/components/layout";

gsap.registerPlugin(ScrollTrigger);

type AnimationFunction = () => void;

export const useGSAPInit = (
  sectionRef: RefObject<HTMLElement>,
  contentRef: RefObject<HTMLElement>,
  customAnimations: AnimationFunction[] = []
) => {
  const { isLoading, animationComplete } = useLoadingContext();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isInitialized || isLoading || !animationComplete) return;

    const initTimeout = setTimeout(() => {
      initializeGSAP();
      setIsInitialized(true);
    }, 100);

    return () => clearTimeout(initTimeout);
  }, [isLoading, animationComplete, isInitialized]);

  const initializeGSAP = () => {
    ScrollTrigger.getAll().forEach((st) => st.kill());

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
        id: `pin-${sectionRef.current?.id || "section"}`,
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

      if (customAnimations && customAnimations.length > 0) {
        customAnimations.forEach((animation) => animation());
      }

      ScrollTrigger.refresh(true);
    }, sectionRef);

    return () => ctx.revert();
  };

  return { isInitialized };
};
