"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { FC, ReactNode, useState } from "react";
import { Preloader } from "../common/preloader";
import { AnimatePresence, motion } from "framer-motion";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="bg-background min-h-screen">
      <ReactLenis root>
        <Preloader onComplete={() => setIsLoading(false)} />
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key="content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </ReactLenis>
    </main>
  );
};

export default Layout;