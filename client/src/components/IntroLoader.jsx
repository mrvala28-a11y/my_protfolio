import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    let current = 0;

    // Sound
    audioRef.current = new Audio(
      "https://www.soundjay.com/button/sounds/button-16.mp3"
    );
    audioRef.current.volume = 0.2;

    const playTick = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    };

    // ⏱️ FAST PHASE → 0 to 98 in 4 sec
    const fastDuration = 4000; // 4 seconds
    const fastSteps = 98;
    const fastIntervalTime = fastDuration / fastSteps; // ~40ms

    const fastInterval = setInterval(() => {
      current += 1;

      // add slight jump feel
      if (Math.random() > 0.7 && current < 95) {
        current += 1;
      }

      if (current >= 98) {
        current = 98;
        clearInterval(fastInterval);
        slowFinish();
      }

      setCount(current);
      playTick();
    }, fastIntervalTime);

    // 🐢 SLOW PHASE → 98 to 100 in 1 sec
    const slowFinish = () => {
      const slowSteps = 2; // 98 → 99 → 100
      const slowDuration = 1000; // 1 second
      const slowIntervalTime = slowDuration / slowSteps; // 500ms

      const slowInterval = setInterval(() => {
        current += 1;
        setCount(current);
        playTick();

        if (current >= 100) {
          clearInterval(slowInterval);

          setTimeout(() => {
            onComplete();
          }, 500);
        }
      }, slowIntervalTime);
    };

  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">

          {/* NUMBER */}
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0.5, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.25 }}
            className="relative text-[120px] md:text-[180px] font-extrabold text-white mb-6 tabular-nums"
          >
            {/* Glitch layers */}
            <span className="absolute left-0 top-0 text-green-400 opacity-30 translate-x-1 -translate-y-1">
              {count}
            </span>
            <span className="absolute left-0 top-0 text-pink-500 opacity-30 -translate-x-1 translate-y-1">
              {count}
            </span>

            {count}
          </motion.div>

          {/* PROGRESS BAR */}
          <div className="relative w-72 h-1.5 bg-gray-800 rounded-full overflow-hidden mb-3">
            <motion.div
              className="h-full"
              style={{
                background:
                  "linear-gradient(90deg, #22c55e, #4ade80, #16a34a)",
              }}
              animate={{ width: `${count}%` }}
              transition={{
                ease: count < 98 ? "linear" : "easeOut",
                duration: count < 98 ? 0.05 : 0.4,
              }}
            />
          </div>

          {/* TEXT */}
          <p className="text-gray-400 text-xs uppercase tracking-[0.3em] font-medium">
            Vivek Vala Portfolio
          </p>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroLoader;