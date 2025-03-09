"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AnimationProvider({ children }) {
  const pathname = usePathname();
  
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
} 