"use client";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="bg-background min-h-screen">
      <ReactLenis root>{children}</ReactLenis>
    </main>
  );
};

export default Layout;
