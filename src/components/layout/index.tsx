"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { FC, ReactNode, useState, createContext, useContext } from "react";
import { Preloader } from "../common/preloader";
import { motion } from "framer-motion";

// Create a context to share loading state across components
export const LoadingContext = createContext({
  isLoading: true,
  animationComplete: false,
  setAnimationComplete: (value: boolean) => {}
});

export const useLoadingContext = () => useContext(LoadingContext);

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const contentVariants = {
    hidden: {
      y: "100%",
    },
    visible: {
      y: 0,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
        onComplete: () => setAnimationComplete(true)
      },
    },
  };

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      animationComplete, 
      setAnimationComplete 
    }}>
      <main className="bg-background min-h-screen">
        <ReactLenis root options={{ smoothWheel: true }}>
          <Preloader onComplete={() => setIsLoading(false)} />
          <motion.div
            className="content-container"
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate={!isLoading ? "visible" : undefined}
          >
            {children}
          </motion.div>
        </ReactLenis>
      </main>
    </LoadingContext.Provider>
  );
};

export default Layout;