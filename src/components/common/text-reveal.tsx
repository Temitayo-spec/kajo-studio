"use client";
import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

interface ClipPathTextRevealProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  stagger?: number;
  splitType?: "chars" | "words" | "lines" | "none";
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
}

const ClipPathTextReveal: React.FC<ClipPathTextRevealProps> = ({
  children,
  as: Component = "div",
  className = "",
  direction = "up",
  duration = 0.75,
  delay = 0,
  stagger = 0.05,
  splitType = "words",
  viewport = { once: true, margin: "-100px 0px" },
}) => {
  // Get clip-path variants based on direction
  const getClipPathVariants = (): Variants => {
    let initialClipPath: string;

    switch (direction) {
      case "up":
        initialClipPath = "inset(100% 0 0 0)";
        break;
      case "down":
        initialClipPath = "inset(0 0 100% 0)";
        break;
      case "left":
        initialClipPath = "inset(0 0 0 100%)";
        break;
      case "right":
        initialClipPath = "inset(0 100% 0 0)";
        break;
      default:
        initialClipPath = "inset(100% 0 0 0)";
    }

    return {
      hidden: {
        clipPath: initialClipPath,
        opacity: 0,
      },
      visible: (i = 0) => ({
        clipPath: "inset(0 0 0 0)",
        opacity: 1,
        transition: {
          clipPath: {
            duration,
            delay: delay + stagger * i,
            ease: [0.77, 0, 0.175, 1], // Custom ease for smooth reveal
          },
          opacity: {
            duration: duration * 0.5,
            delay: delay + stagger * i,
          },
        },
      }),
    };
  };

  // Split text based on splitType
  const renderContent = () => {
    if (splitType === "none") {
      return (
        <motion.span
          className="inline-block"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={getClipPathVariants()}
          style={{ willChange: "clip-path, opacity" }}
        >
          {children}
        </motion.span>
      );
    }

    // Handle unexpected non-string children
    if (typeof children !== "string") {
      return <span>{children}</span>;
    }

    // Split based on type
    if (splitType === "chars") {
      return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-label={children}
        >
          {children.split("").map((char, i) => (
            <motion.span
              key={`char-${i}`}
              className="inline-block"
              variants={getClipPathVariants()}
              custom={i}
              style={{ willChange: "clip-path, opacity" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    if (splitType === "words") {
      return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-label={children}
        >
          {children.split(" ").map((word, i) => (
            <motion.span
              key={`word-${i}`}
              className="inline-block mr-[0.25em]"
              variants={getClipPathVariants()}
              custom={i}
              style={{ willChange: "clip-path, opacity" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      );
    }

    if (splitType === "lines") {
      return (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-label={children}
        >
          {children.split("\n").map((line, i) => (
            <motion.div
              key={`line-${i}`}
              className="block"
              variants={getClipPathVariants()}
              custom={i}
              style={{ willChange: "clip-path, opacity" }}
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      );
    }

    // Fallback
    return <span>{children}</span>;
  };

  return <Component className={className}>{renderContent()}</Component>;
};

interface TextRevealProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  delay?: number;
  stagger?: number;
  splitType?: "chars" | "words" | "lines" | "none";
  viewport?: {
    once?: boolean;
    margin?: string;
    amount?: "some" | "all" | number;
  };
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  as: Component = "span",
  className = "",
  direction = "up",
  duration = 0.5,
  delay = 0,
  stagger = 0.05,
  splitType = "words",
  viewport = { once: true, margin: "-100px 0px" },
}) => {
  // Get animation variants based on direction
  const getVariants = (): Variants => {
    const initialProps = {
      y: direction === "up" ? "100%" : direction === "down" ? "-100%" : "0%",
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      opacity: 1,
    };

    return {
      hidden: initialProps,
      visible: (i = 0) => ({
        y: 0,
        x: 0,
        opacity: 1,
        transition: {
          duration,
          delay: delay + stagger * i,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    };
  };

  // Split text based on splitType with container wrappers
  const renderContent = () => {
    if (splitType === "none") {
      return (
        <div className="overflow-hidden">
          <motion.span
            className="inline-block"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={getVariants()}
          >
            {children}
          </motion.span>
        </div>
      );
    }

    // Handle unexpected non-string children
    if (typeof children !== "string") {
      return <span>{children}</span>;
    }

    // Split based on type
    if (splitType === "chars") {
      return (
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-label={children}
        >
          {children.split("").map((char, i) => (
            <span key={`char-container-${i}`} className="inline-block overflow-hidden">
              <motion.span
                key={`char-${i}`}
                className="inline-block"
                variants={getVariants()}
                custom={i}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      );
    }

    if (splitType === "words") {
      return (
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-label={children}
          className="flex flex-wrap"
        >
          {children.split(" ").map((word, i) => (
            <span key={`word-container-${i}`} className="overflow-hidden mr-[0.25em] mb-1">
              <motion.span
                key={`word-${i}`}
                className="inline-block"
                variants={getVariants()}
                custom={i}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.span>
      );
    }

    if (splitType === "lines") {
      return (
        <motion.span
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          aria-label={children}
        >
          {children.split("\n").map((line, i) => (
            <span key={`line-container-${i}`} className="block overflow-hidden">
              <motion.span
                key={`line-${i}`}
                className="block"
                variants={getVariants()}
                custom={i}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.span>
      );
    }

    // Fallback
    return <span>{children}</span>;
  };

  return <Component className={className}>{renderContent()}</Component>;
};

export { ClipPathTextReveal, TextReveal };