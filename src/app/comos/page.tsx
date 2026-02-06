"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ConnectIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const DesignIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v7z" />
  </svg>
);

const HostingIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
  </svg>
);

const SEOIcon = () => (
  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

function FeatureItem({ icon, text, delay = 0 }: { icon: React.ReactNode; text: string; delay?: number }) {
  return (
    <motion.div
      className="flex items-center space-x-3 text-sm text-gray-300"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 5, transition: { duration: 0.2 } }}
    >
      <motion.div
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <span>{text}</span>
    </motion.div>
  );
}

function PricingCard({ 
  title, 
  subtitle, 
  price, 
  period, 
  features, 
  buttonText, 
  isPopular = false,
  delay = 0,
  badge = null
}: {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  features: Array<{ icon: React.ReactNode; text: string }>;
  buttonText: string;
  isPopular?: boolean;
  delay?: number;
  badge?: string | null;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
        isPopular 
          ? 'border-blue-500/50 bg-gradient-to-b from-blue-500/10 to-blue-600/5' 
          : 'border-gray-800 bg-gray-900/50'
      }`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay, 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {badge && (
        <motion.div
          className="absolute -top-3 right-6 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: delay + 0.3, type: "spring", stiffness: 200 }}
        >
          {badge}
        </motion.div>
      )}

      <motion.div
        className={`absolute inset-0 rounded-2xl opacity-0 ${
          isPopular ? 'bg-blue-500/20' : 'bg-white/5'
        }`}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ filter: 'blur(20px)' }}
      />

      <div className="relative z-10">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.4, type: "spring", stiffness: 200 }}
        >
          <div className="flex items-baseline">
            <motion.span 
              className="text-4xl font-bold text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {price}
            </motion.span>
            <span className="text-gray-400 ml-2">{period}</span>
          </div>
        </motion.div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              text={feature.text}
              delay={delay + 0.6 + index * 0.1}
            />
          ))}
        </div>

        <motion.button
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 relative overflow-hidden ${
            isPopular
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/25'
              : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 1 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
          <span className="relative z-10">{buttonText}</span>
        </motion.button>
      </div>
    </motion.div>
  );
}

function EnterpriseCard({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="p-6 rounded-2xl border border-gray-800 bg-gray-900/30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Enterprise</h3>
          <p className="text-sm text-gray-400">
            For teams that need custom limits, enterprise security, and dedicated support.
          </p>
        </div>
        <motion.button
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Request trial
        </motion.button>
      </div>
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function CosmosPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  const plans = [
    {
      title: "Basic",
      subtitle: "Creative personal sites",
      price: "$10",
      period: "per month",
      features: [
        { icon: <ConnectIcon />, text: "Connect your own domain" },
        { icon: <DesignIcon />, text: "AI-powered design tools" },
        { icon: <HostingIcon />, text: "Fast and secure hosting" },
        { icon: <SEOIcon />, text: "Built-in SEO" },
      ],
      buttonText: "Start with Basic",
      badge: "ANNUAL"
    },
    {
      title: "Pro",
      subtitle: "Growing professional sites",
      price: "$30",
      period: "per month",
      features: [
        { icon: <CheckIcon />, text: "Everything from Basic, plus:" },
        { icon: <CheckIcon />, text: "Staging and instant rollback" },
        { icon: <CheckIcon />, text: "Roles and permissions" },
        { icon: <CheckIcon />, text: "Relational CMS" },
        { icon: <CheckIcon />, text: "Site redirects" },
        { icon: <CheckIcon />, text: "Multiple locales (add-on)" },
      ],
      buttonText: "Start with Pro",
      isPopular: true,
      badge: "ANNUAL"
    },
    {
      title: "Scale",
      subtitle: "Advanced, high-traffic sites",
      price: "$100",
      period: "per month, plus usage",
      features: [
        { icon: <CheckIcon />, text: "Everything from Pro, plus:" },
        { icon: <CheckIcon />, text: "Custom locale regions" },
        { icon: <CheckIcon />, text: "Events and funnels" },
        { icon: <CheckIcon />, text: "Priority support" },
        { icon: <CheckIcon />, text: "Premium CDN" },
        { icon: <CheckIcon />, text: "Flexible limits" },
        { icon: <CheckIcon />, text: "A/B testing (add-on)" },
        { icon: <CheckIcon />, text: "Custom proxy setup (add-on)" },
      ],
      buttonText: "Start with Scale",
      badge: "ANNUAL ONLY"
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="relative z-10">
        <motion.div 
          className="text-center pt-20 pb-16 px-4"
          style={{ y, opacity }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            Pricing
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Start designing for free. Choose a plan
            <br />
            to unlock features and increase limits.
          </motion.p>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.title}
                title={plan.title}
                subtitle={plan.subtitle}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                buttonText={plan.buttonText}
                isPopular={plan.isPopular}
                delay={index * 0.2}
                badge={plan.badge}
              />
            ))}
          </div>

          <EnterpriseCard delay={0.8} />
        </div>

      </div>
    </div>
  );
}