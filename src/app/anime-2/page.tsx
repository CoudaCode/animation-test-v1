"use client";

import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState } from "react";

function TimelineItem({ 
  year, 
  text, 
  imageSrc, 
  imageAlt, 
  isLeft = false, 
  delay = 0 
}: {
  year: string;
  text: string;
  imageSrc: string;
  imageAlt: string;
  isLeft?: boolean;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`flex items-center gap-8 md:gap-16 mb-20 md:mb-32 ${
        isLeft ? 'flex-row-reverse' : 'flex-row'
      }`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100
      }}
    >
      <motion.div
        className="relative flex-shrink-0"
        whileHover={{ scale: 1.05, rotateY: isLeft ? -5 : 5 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ filter: 'blur(20px)' }}
        />
        
        {/* Image container */}
        <motion.div
          className="relative w-80 h-52 md:w-96 md:h-64 rounded-2xl overflow-hidden bg-gray-800"
          style={{ transformStyle: "preserve-3d" }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Timeline dot et ligne */}
      <div className="relative flex-shrink-0">
        {/* Ligne verticale */}
        <motion.div
          className="absolute left-1/2 top-8 w-0.5 h-32 bg-gradient-to-b from-blue-500 to-transparent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ delay: delay + 0.3, duration: 0.6 }}
          style={{ transformOrigin: "top" }}
        />
        
        {/* Dot animé */}
        <motion.div
          className="relative w-4 h-4 bg-blue-500 rounded-full"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ 
            delay: delay + 0.2, 
            duration: 0.5,
            type: "spring",
            stiffness: 200
          }}
        >
          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-blue-500 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.8, 0, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Contenu texte */}
      <motion.div
        className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}
        initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? 50 : -50 }}
        transition={{ delay: delay + 0.4, duration: 0.6 }}
      >
        {/* Année avec effet de compteur */}
        <motion.h3
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
          whileHover={{ scale: 1.05, color: "#3b82f6" }}
        >
          {year}
        </motion.h3>
        
        {/* Texte avec animation de typing */}
        <motion.p
          className="text-gray-400 text-lg leading-relaxed max-w-md"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.6, duration: 0.8 }}
        >
          {text}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// Composant pour les particules flottantes
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Composant pour l'effet de parallax sur le background
function ParallaxBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const opacity = useTransform(scrollY, [0, 500], [0.3, 0.1]);

  return (
    <>
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full"
        style={{ y: y1, opacity }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full"
        style={{ y: y2, opacity }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}

export default function AnimePage() {
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Données de la timeline
  const timelineData = [
    {
      year: "2021",
      text: "In 2021, we saw our first transaction on a Slash card, marking the beginning of our journey. That same year, we graduated from Y Combinator's S21 batch, setting the stage for everything that followed.",
      imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Team working in office 2021",
      isLeft: false
    },
    {
      year: "2022",
      text: "By 2022, we secured $10M in Seed Series A funding led by NEA, launched our mobile app, introduced a new rewards program, and grew our Discord community to 20,000+ members.",
      imageSrc: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Team collaboration 2022",
      isLeft: true
    },
    {
      year: "2023",
      text: "In 2023, we expanded with a Rewards Program, Outgoing Payments, Multi Entity support, QBO integration, and Business Banking, enhancing our platform for diverse industries.",
      imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Business meeting 2023",
      isLeft: false
    },
    {
      year: "2024",
      text: "2024 was a milestone year — we launched Accounts 2.0, API, Global Payments, Reporting, Reconciliation, and Real-Time Payments, secured $40.6M in Series B funding led by Bessemer Capital, and surpassed $1B in annualized volume.",
      imageSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Team celebration 2024",
      isLeft: true
    },
    {
      year: "2025",
      text: "By 2025, Slash hit $3B in annualized volume. So many of our biggest launches ever are coming this year — we can't wait to share them with you.",
      imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=faces",
      imageAlt: "Future vision 2025",
      isLeft: false
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background effects */}
      <ParallaxBackground />
      <FloatingParticles />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center pt-20 pb-16 px-4"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our story
          </motion.h1>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              text={item.text}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              isLeft={item.isLeft}
              delay={index * 0.2}
            />
          ))}
        </div>

        
      </div>
    </div>
  );
}