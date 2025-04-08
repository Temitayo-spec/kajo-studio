"use client";

import { FC, useRef, useState } from "react";
import { motion, useTransform, MotionValue, useMotionTemplate } from "framer-motion";
import Image from "next/image";

interface FallingCardProps extends ITestimonials {
  index: number;
  background: boolean;
  scrollYProgress: MotionValue<number>;
}

export const FallingCard: FC<FallingCardProps> = ({
  avatar,
  background,
  company,
  extra_comment,
  name,
  testimonial,
  index,
  scrollYProgress,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const start = index * 0.1;
  const end = start + 0.2;

  const y = useTransform(scrollYProgress, [start, end], [100, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const glareX = useMotionTemplate`${mousePosition.x * 100 + 50}%`;
  const glareY = useMotionTemplate`${mousePosition.y * 100 + 50}%`;
  const glareOpacity = useMotionTemplate`${Math.abs(mousePosition.x) + Math.abs(mousePosition.y) + 0.05}`;

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 relative"
    >
      <motion.article
        style={{
          rotateX: useMotionTemplate`${-mousePosition.y * 10}deg`,
          rotateY: useMotionTemplate`${mousePosition.x * 10}deg`,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`flex flex-col p-[3.75rem] will-change-transform relative
        ${background ? "bg-inverse-2" : "bg-inverse-1"} 
        overflow-hidden`}
      >
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%)`,
            opacity: glareOpacity
          }}
        />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="30"
          viewBox="0 0 48 30"
          fill="none"
          className="mb-[4.5rem] relative z-10"
        >
          <path
            d="M0 30V13.764L5.73034 0H17.5843L13.8764 13.2584H21.0112V30H0ZM26.3483 30V13.764L32.0787 0H43.9326L40.2247 13.2584H47.3596V30H26.3483Z"
            fill="white"
          />
        </svg>

        <div className="space-y-4 mb-9 relative z-10">
          <h3 className="text-3xl font-semibold leading-[140%] tracking-[-0.0625rem]">
            {testimonial}
          </h3>
          <p className="leading-[180%] text-[0.9375rem] text-white/60">
            {extra_comment}
          </p>
        </div>

        <div className="flex items-center gap-4 relative z-10">
          <Image
            src={avatar}
            alt={name}
            className="object-contain w-12 h-12"
            quality={100}
          />
          <div>
            <h4 className="text-xl leading-[130%] font-semibold">{name}</h4>
            <p className="font-gambetta text-white/60">({company})</p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};