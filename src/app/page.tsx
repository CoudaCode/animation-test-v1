"use client";

import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useRef, useState } from "react";

interface ImageTrail {
  id: number;
  x: number;
  y: number;
}

/* ✅ Déplacé hors du composant pour éviter la recréation */
const randomImages = [
  "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1459679749680-18eb1eb37418?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1585211969224-3e992986159d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1549144511-f099e773c147?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1494790108755-2616c27de8de?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1585211969224-3e992986159d?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1549144511-f099e773c147?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=300&h=300&fit=crop",
];

export default function Home() {
  const [images, setImages] = useState<ImageTrail[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lastPosition = useRef({ x: 0, y: 0 });
  const lastSpawn = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;

    mouseX.set(clientX);
    mouseY.set(clientY);

    const dx = clientX - lastPosition.current.x;
    const dy = clientY - lastPosition.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // 🔥 Ajuste ces valeurs si tu veux encore ralentir
    const DISTANCE_THRESHOLD = 140; // plus grand = moins d’images
    const TIME_THRESHOLD = 150; // ms entre chaque apparition

    if (
      distance > DISTANCE_THRESHOLD &&
      Date.now() - lastSpawn.current > TIME_THRESHOLD
    ) {
      const newImage = {
        id: Date.now(),
        x: clientX,
        y: clientY,
      };

      setImages((prev) => [...prev, newImage]);

      lastPosition.current = { x: clientX, y: clientY };
      lastSpawn.current = Date.now();

      setTimeout(() => {
        setImages((prev) => prev.filter((img) => img.id !== newImage.id));
      }, 1500);
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
          const randomImage =
            randomImages[Math.floor(Math.random() * randomImages.length)];

          return (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: Math.random() * 10 - 5,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 },
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
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
                alt="Trail"
                className="w-full h-full object-cover rounded-lg shadow-2xl"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Custom cursor */}
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
