"use client";

import { motion } from "framer-motion";
// import Link from "next/link";

// export const RevealLinks = () => {
//   return (
//     <section className="grid place-content-center gap-2 bg-green-300 px-8 py-24 text-black">
//       <FlipLink href="#">Twitter</FlipLink>
//       <FlipLink href="#">Linkedin</FlipLink>
//       <FlipLink href="#">Facebook</FlipLink>
//       <FlipLink href="#">Instagram</FlipLink>
//     </section>
//   );
// };

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({
  children,
  href,
  onClick,
}: {
  children: string;
  href: string;
  onClick?: (e: any) => void;
}) => {
  return (
    <a href={href} onClick={onClick}>
      <motion.span
        initial="initial"
        whileHover="hovered"
        className="relative block overflow-hidden whitespace-nowrap"
        style={{
          lineHeight: 0.75,
        }}
      >
        <div>
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className="absolute inset-0">
          {children.split("").map((l, i) => (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
              }}
              className="inline-block"
              key={i}
            >
              {l}
            </motion.span>
          ))}
        </div>
      </motion.span>
    </a>
  );
};
