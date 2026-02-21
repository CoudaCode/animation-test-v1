"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

// Premium easing curves
const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  snappy: [0.16, 1, 0.3, 1] as const,
  elegant: [0.4, 0, 0.2, 1] as const,
};

// Timing constants
const timing = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.1,
};

const ScrollZoomHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);

  // Text animations
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[15s0vh] overflow-hidden">
      {/* Background Image with Scroll Effects */}
      <div className="sticky top-0 h-screen w-full">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            scale,
            opacity,
            filter: useTransform(blur, (value) => `blur(${value}px)`),
          }}
        >
          {/* Hero Background Image - Prague night scene */}
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1541849546-216549ae216d?w=1920&h=1080&fit=crop&crop=entropy&q=80')",
            }}
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Hero Content - Just PRAGUE title */}
        <motion.div
          className="relative z-10 flex items-center justify-center h-full"
          style={{ y: textY, opacity: textOpacity }}
        >
          <div className="text-center text-white">
            <motion.h1
              className="text-8xl md:text-9xl font-black leading-none tracking-wider"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: timing.slow,
                ease: easings.smooth,
              }}
            >
              PRAGUE
            </motion.h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const EndSection = () => {
  return (
    <div className="relative z-20 bg-gray-900 h-screen flex items-center justify-center">
      <motion.div
        className="text-center text-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: timing.slow, ease: easings.smooth }}
        viewport={{ once: true }}
      >
        <h2 className="text-6xl md:text-7xl font-light text-gray-400">Fin</h2>
      </motion.div>
    </div>
  );
};

export default function PragueScrollZoomPage() {
  return (
    <div className="min-h-screen">
      {/* Prague Scroll Zoom Hero */}
      <ScrollZoomHero />

      {/* End Section */}
      <EndSection />
    </div>
  );
}
