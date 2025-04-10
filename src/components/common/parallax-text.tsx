import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import award_1 from "@/images/award_1.png";
import award_2 from "@/images/award_2.png";
import award_3 from "@/images/award_3.png";
import award_4 from "@/images/award_4.png";
import award_5 from "@/images/award_5.png";
import award_6 from "@/images/award_6.png";
import award_7 from "@/images/award_7.png";
import award_8 from "@/images/award_8.png";
import award_9 from "@/images/award_9.png";
import Image from "next/image";

export const CART_ONE = [award_1, award_2, award_3];
export const CART_TWO = [award_4, award_5, award_6];
export const CART_THREE = [award_7, award_8, award_9];

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseY = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const y = useTransform(baseY, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseY.set(baseY.get() + moveBy);
  });

  return (
    <div className="parallax-vertical">
      <motion.div className="scroller-vertical" style={{ y }}>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

export default function ParallaxMarquee() {
  return (
    <section className="flex w-full h-screen">
      <ParallaxText baseVelocity={2}>
        {CART_ONE.map((item, index) => (
          <Image key={index} src={item} alt="" />
        ))}
      </ParallaxText>
      <ParallaxText baseVelocity={-2}>
        {CART_TWO.map((item, index) => (
          <Image key={index} src={item} alt="" />
        ))}
      </ParallaxText>
      <ParallaxText baseVelocity={2}>
        {CART_THREE.map((item, index) => (
          <Image key={index} src={item} alt="" />
        ))}
      </ParallaxText>
    </section>
  );
}
