"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function ScrollHorizontal() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const totalDistance = (items.length - 1) * (ITEM_WIDTH + GAP);
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalDistance]);

  return (
    <div id="example">
      {/* BACKGROUND GLOW */}
      <div className="bg-glow glow-1" />
      <div className="bg-glow glow-2" />

      <section className="intro-section">
        <h1 className="impact">Tokyo Nights</h1>
        <p className="subtitle">A cinematic scroll experience</p>
      </section>

      <div ref={containerRef} className="scroll-container">
        <div className="sticky-wrapper">
          <motion.div className="gallery" style={{ x }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                style={
                  {
                    "--item-color": item.color,
                    backgroundImage: `url(${item.image})`,
                  } as React.CSSProperties
                }
              >
                <div className="item-overlay" />

                <div className="item-content">
                  <span className="item-number">0{item.id}</span>
                  <h2>{item.label}</h2>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <section className="outro-section">
        <p className="big">Fin</p>
      </section>

      <StyleSheet />
    </div>
  );
}

/* ================= STYLES ================= */

function StyleSheet() {
  return (
    <style>{`
body {
  margin: 0;
  background: #0b0f19;
  overflow-x: hidden;
  font-family: Inter, sans-serif;
  color: #fff;
}

#example {
  position: relative;
}

/* BACKGROUND GLOW */

.bg-glow {
  position: fixed;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.15;
  z-index: 0;
}

.glow-1 {
  background: #3b82f6;
  top: 10%;
  left: 10%;
}

.glow-2 {
  background: #8b5cf6;
  bottom: 10%;
  right: 10%;
}

/* INTRO */

.intro-section {
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding-bottom: 60px;
  position: relative;
  z-index: 2;
}

.impact {
  font-size: clamp(40px, 9vw, 80px);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 4px;
  background: linear-gradient(90deg,#fff,#aaa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  margin-top: 20px;
  color: rgba(255,255,255,0.6);
}

/* SCROLL */

.scroll-container {
  height: 300vh;
  position: relative;
  z-index: 2;
}

.sticky-wrapper {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  overflow: visible;
}

.gallery {
  display: flex;
  gap: 30px;
  will-change: transform;
}

/* ITEM */

.gallery-item {
  flex-shrink: 0;
  width: 400px;
  height: 520px;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  transition: transform 0.4s ease;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.item-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.8) 10%,
    rgba(0,0,0,0.2) 60%,
    transparent 100%
  );
}

.item-content {
  position: absolute;
  bottom: 30px;
  left: 30px;
  z-index: 2;
}

.item-number {
  font-size: 14px;
  color: var(--item-color);
  font-family: monospace;
  margin-bottom: 10px;
  display: block;
}

.gallery-item h2 {
  font-size: 30px;
  margin: 0;
  text-shadow: 0 0 20px rgba(0,0,0,0.7);
}

/* OUTRO */

.outro-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.big {
  font-size: 60px;
  color: rgba(255,255,255,0.2);
}

/* RESPONSIVE */

@media (max-width: 600px) {
  .sticky-wrapper {
    width: 280px;
  }

  .gallery {
    gap: 15px;
  }

  .gallery-item {
    width: 280px;
    height: 360px;
  }
}
`}</style>
  );
}

/* ================= DATA ================= */

const items = [
  {
    id: 1,
    color: "#ff0088",
    label: "Shinjuku Lights",
    image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    color: "#dd00ee",
    label: "Neon Alley",
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    color: "#9911ff",
    label: "Rain & Reflections",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    color: "#0d63f8",
    label: "Midnight Crossing",
    image:
      "https://images.unsplash.com/photo-1505060890536-8aeefb5d7c4e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    color: "#0cdcf7",
    label: "Blue Hour Tokyo",
    image:
      "https://images.unsplash.com/photo-1526481280691-7d0f9f5f4c0b?q=80&w=1200&auto=format&fit=crop",
  },
];

const ITEM_WIDTH = 400;
const GAP = 30;
