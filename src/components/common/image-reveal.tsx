"use client";
import React from "react";
import { motion } from "framer-motion";

interface RevealWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
}

const SmallerImageBottomUpReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  viewport = { once: true, margin: "-10px" },
}: RevealWrapperProps) => {
  const contentVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay,
        duration: duration * 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      className={`${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={contentVariants}
    >
      {children}
    </motion.div>
  );
};

// Bottom to Up Reveal Wrapper
const BottomUpReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1.2,
  viewport = { once: true, margin: "-100px 0px" },
}: RevealWrapperProps) => {
  const contentVariants = {
    hidden: { scale: 1.1 },
    visible: {
      scale: 1,
      transition: {
        delay,
        duration,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const revealVariants = {
    hidden: { y: "0%" },
    visible: {
      y: "-100%",
      transition: {
        delay,
        duration,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.div variants={contentVariants} className="relative h-full">
        {children}
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-background origin-bottom z-10"
        variants={revealVariants}
      />
    </motion.div>
  );
};

// Diagonal Clippath Reveal Wrapper
const DiagonalReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1.5,
  viewport = { once: true },
}: RevealWrapperProps) => {
  const variants = {
    hidden: {
      clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
    },
    visible: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: {
        delay,
        duration,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  const contentVariants = {
    hidden: { scale: 1.5 },
    visible: {
      scale: 1,
      transition: {
        delay,
        duration,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      style={{ willChange: "clip-path" }}
    >
      <motion.div variants={contentVariants} className="relative h-full">
        {children}
      </motion.div>
    </motion.div>
  );
};

// ClipPath Reveal Wrapper
interface ClipPathRevealProps extends RevealWrapperProps {
  initialClipPath?: string;
  finalClipPath?: string;
  overlayColor?: string;
  revealMode?: "content" | "overlay";
}

const ClipPathReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 1.5,
  initialClipPath = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
  finalClipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  overlayColor = "black",
  revealMode = "content",
  viewport = { once: true, margin: "-100px 0px" },
}: ClipPathRevealProps) => {
  const contentVariants = {
    hidden:
      revealMode === "content"
        ? {
            clipPath: initialClipPath,
          }
        : { opacity: 1 },
    visible:
      revealMode === "content"
        ? {
            clipPath: finalClipPath,
            transition: {
              delay,
              duration,
              ease: [0.76, 0, 0.24, 1],
            },
          }
        : { opacity: 1 },
  };

  const overlayVariants = {
    hidden:
      revealMode === "overlay"
        ? {
            clipPath: finalClipPath,
          }
        : { clipPath: initialClipPath },
    visible:
      revealMode === "overlay"
        ? {
            clipPath: initialClipPath,
            transition: {
              delay,
              duration,
              ease: [0.76, 0, 0.24, 1],
            },
          }
        : { clipPath: initialClipPath },
  };

  return (
    <div className={`relative ${className}`}>
      {revealMode === "content" ? (
        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={contentVariants}
          style={{ willChange: "clip-path" }}
        >
          {children}
        </motion.div>
      ) : (
        <>
          <div className="relative">{children}</div>
          <motion.div
            className="absolute inset-0 z-10"
            style={{ backgroundColor: overlayColor, willChange: "clip-path" }}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={overlayVariants}
          />
        </>
      )}
    </div>
  );
};

export {
  BottomUpReveal,
  DiagonalReveal,
  ClipPathReveal,
  SmallerImageBottomUpReveal,
};
