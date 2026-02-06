"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";

function SpendingCard() {
  const [currentAmount, setCurrentAmount] = useState(0);
  const targetAmount = 1586;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentAmount < targetAmount) {
        setCurrentAmount(prev => Math.min(prev + 50, targetAmount));
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [currentAmount, targetAmount]);

  const calendarData = [
    { day: 1, amount: null },
    { day: 2, amount: 80, color: "bg-blue-400" },
    { day: 3, amount: null },
    { day: 4, amount: 134, color: "bg-green-400" },
    { day: 5, amount: 64, color: "bg-yellow-400" },
    { day: 6, amount: 102, color: "bg-purple-400" },
    { day: 7, amount: 32, color: "bg-pink-400" },
    { day: 8, amount: null },
    { day: 9, amount: null },
    { day: 10, amount: null },
    { day: 11, amount: null },
    { day: 12, amount: null },
    { day: 13, amount: null },
    { day: 14, amount: null },
    { day: 15, amount: null },
    { day: 16, amount: null },
    { day: 17, amount: null },
    { day: 18, amount: null },
    { day: 19, amount: null },
    { day: 20, amount: null },
    { day: 21, amount: null },
    { day: 22, amount: null },
    { day: 23, amount: null },
    { day: 24, amount: null },
    { day: 25, amount: null },
    { day: 26, amount: null },
    { day: 27, amount: null },
    { day: 28, amount: null },
    { day: 29, amount: null },
    { day: 30, amount: null },
    { day: 31, amount: null }
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-3xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.02,
        rotateY: -2,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-gray-400 text-sm">
            <span>SPEND THIS MONTH</span>
            <div className="flex space-x-1">
              <div className="w-4 h-4 border border-gray-500 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-500"></div>
              </div>
              <div className="w-4 h-4 border border-gray-500 rounded"></div>
              <div className="w-4 h-4 border border-gray-500 rounded flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full ml-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          className="text-4xl font-bold text-white mb-8"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          ${currentAmount.toLocaleString()}
        </motion.div>

        <div className="grid grid-cols-7 gap-2">
          {calendarData.map((item, index) => (
            <motion.div
              key={item.day}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm relative ${
                item.amount ? 'text-white' : 'text-gray-500 bg-gray-800/50'
              }`}
              style={{
                backgroundColor: item.amount ? undefined : undefined
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.02 }}
              whileHover={item.amount ? { scale: 1.1, z: 10 } : {}}
            >
              {item.amount && (
                <motion.div
                  className={`absolute inset-0 rounded-lg ${item.color}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.02, type: "spring" }}
                />
              )}
              <span className="relative z-10 font-medium">{item.day}</span>
              {item.amount && (
                <motion.div
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100"
                  initial={{ opacity: 0, y: 5 }}
                  whileHover={{ opacity: 1, y: 0 }}
                >
                  ${item.amount}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 pt-6 border-t border-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-white font-semibold mb-2">Monitor your spending</h3>
          <p className="text-gray-400 text-sm">
            See every transaction, automatically categorized.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function BudgetCard() {
  const budgetItems = [
    { name: "Total Budget", amount: 2234, total: 5000, percentage: 44.7, color: "bg-gray-400" },
    { name: "Food", amount: null, percentage: 41.1, color: "bg-white" },
    { name: "Auto & Transport", amount: null, percentage: 8.3, color: "bg-gray-300" },
    { name: "Everything Else", amount: null, percentage: 47.6, color: "bg-gray-500" }
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-3xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="text-gray-300 text-sm mb-6 tracking-wider">BUDGET</div>

        <div className="space-y-6">
          {budgetItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className={`w-3 h-3 rounded-full ${item.color}`}
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="text-white text-sm">{item.name}</span>
                </div>
                <div className="text-right">
                  {item.amount && (
                    <div className="text-white font-semibold">
                      ${item.amount.toLocaleString()} of ${item.total?.toLocaleString()}
                    </div>
                  )}
                  <div className="text-gray-300 text-sm">{item.percentage}%</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full ${item.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8 pt-6 border-t border-amber-600/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <h3 className="text-white font-semibold mb-2">Build a budget</h3>
          <p className="text-amber-200 text-sm">
            AI sets up your budget and helps you track progress all month long.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TransactionsCard() {
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const calendarDays = [
    [27, 28, 29, 30, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10]
  ];

  const transactions = [
    { day: 28, amount: null },
    { day: 1, amount: null },
    { day: 2, amount: 21.99, color: "bg-red-500" },
    { day: 5, amount: null },
    { day: 7, amount: 2.3, color: "bg-blue-500" },
    { day: 8, amount: 144.99, color: "bg-green-500" },
    { day: 9, amount: 9.99, color: "bg-purple-500" }
  ];

  return (
    <motion.div
      className="bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 rounded-3xl p-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 50, rotateX: 15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.02,
        rotateY: -2,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <div className="text-teal-300 text-sm mb-6 tracking-wider">UPCOMING TRANSACTIONS</div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs text-teal-400 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {calendarDays.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {week.map((day, dayIndex) => {
                const transaction = transactions.find(t => t.day === day);
                return (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className="aspect-square rounded-lg flex items-center justify-center text-sm relative bg-teal-800/50"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + (weekIndex * 7 + dayIndex) * 0.02 }}
                    whileHover={transaction ? { scale: 1.1, z: 10 } : {}}
                  >
                    {transaction && (
                      <motion.div
                        className={`absolute inset-1 rounded-lg ${transaction.color}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + (weekIndex * 7 + dayIndex) * 0.02, type: "spring" }}
                      />
                    )}
                    <span className={`relative z-10 font-medium ${transaction ? 'text-white' : 'text-teal-400'}`}>
                      {day}
                    </span>
                    {transaction && transaction.amount && (
                      <motion.div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0"
                        whileHover={{ opacity: 1 }}
                      >
                        ${transaction.amount}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 pt-6 border-t border-teal-600/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          <h3 className="text-white font-semibold mb-2">Cancel unwanted subscriptions</h3>
          <p className="text-teal-200 text-sm">
            Find, manage, and cancel subscriptions in seconds.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.9]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <FloatingParticles />
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"
        animate={{
          background: [
            "radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 15,
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
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="italic">Track</span> everything
          </motion.h1>
          
          <motion.div
            className="space-y-2 text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-lg">Sync all your finances.</p>
            <p className="text-lg">
              Connect all your accounts to see your finances in one
              <br />
              place - easy to find, easy to understand.
            </p>
          </motion.div>

          <motion.button
            className="mt-8 px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-600 text-sm tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            MORE ABOUT SPENDING
          </motion.button>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            <SpendingCard />
            <BudgetCard />
            <TransactionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}