"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";

interface ImageTrail {
  id: number;
  x: number;
  y: number;
}

export default function Home() {
  const [images, setImages] = useState<ImageTrail[]>([]);
  const lastDistance = useRef(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);

    const distance = Math.sqrt(
      Math.pow(clientX - lastDistance.current, 2) +
      Math.pow(clientY - mouseY.get(), 2)
    );

    if (distance > 50) {
      const newImage = {
        id: Date.now(),
        x: clientX,
        y: clientY,
      };

      setImages((prev) => [...prev, newImage]);
      lastDistance.current = clientX;

      setTimeout(() => {
        setImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, 2000);
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-black overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h1 className="text-[120px] font-bold text-white tracking-wider">
          DEVCOUDA
        </h1>
      </div>

     
      <AnimatePresence>
        {images.map((image) => {
          const randomImages = [
            "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1459679749680-18eb1eb37418?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=300&h=300&fit=crop",
            "https://images.unsplash.com/photo-1585211969224-3e992986159d?w=300&h=300&fit=crop",
          ];
          const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];

          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: Math.random() * 40 - 20 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.5,
                transition: { duration: 0.5 }
              }}
              style={{
                position: "absolute",
                left: image.x - 75,
                top: image.y - 75,
                pointerEvents: "none",
              }}
              className="w-[150px] h-[150px]"
            >
              <img
                src={randomImage}
                alt="Amsterdam"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <motion.div
        className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50"
        style={{
          left: mouseX,
          top: mouseY,
          x: "-50%",
          y: "-50%",
        }}
      />
    </div>
  );
}
