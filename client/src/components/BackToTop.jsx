import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [trailSegments, setTrailSegments] = useState([]);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Calculate total scrollable distance
      const scrollableDistance = docHeight - windowHeight;
      const progress = scrollY / scrollableDistance;
      
      setScrollProgress(progress);
      
      // Show button when scrolled down > 200px
      setIsVisible(scrollY > 200);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate snake trail segments
  const generateTrail = useCallback(() => {
    const segments = [];
    const segmentCount = 12;
    
    for (let i = 0; i < segmentCount; i++) {
      const progress = i / segmentCount;
      const delay = (1 - progress) * 0.3;
      
      // Add slight wave/curve to the path
      const waveOffset = Math.sin(progress * Math.PI * 3) * 20;
      const scale = 1 - (progress * 0.5);
      const opacity = 1 - progress;
      
      segments.push({
        id: i,
        progress,
        delay,
        waveOffset,
        scale,
        opacity,
      });
    }
    
    return segments;
  }, []);

  const handleClick = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Generate the trail animation
    const segments = generateTrail();
    setTrailSegments(segments);
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // After scroll duration, hide trail
    setTimeout(() => {
      setTrailSegments([]);
      setIsAnimating(false);
      setIsVisible(false);
    }, 1500);
  };

  return (
    <>
      {/* SNAKE TRAIL ANIMATION */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-8 top-0 bottom-0 w-2 pointer-events-none z-[9990] hidden md:block"
            style={{
              transform: 'translateX(-50%)',
            }}
          >
            {/* Trail segments - flowing upward like a snake */}
            {trailSegments.map((segment, index) => (
              <motion.div
                key={segment.id}
                initial={{ 
                  y: '100%',
                  x: segment.waveOffset,
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{ 
                  y: `${segment.progress * 100}%`,
                  x: segment.waveOffset,
                  opacity: segment.opacity * 0.8,
                  scale: segment.scale,
                }}
                transition={{
                  duration: 0.8,
                  delay: segment.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="absolute left-0 w-3 h-3 rounded-full"
                style={{
                  backgroundColor: '#22c55e',
                  boxShadow: `0 0 ${12 * segment.scale}px rgba(34, 197, 94, ${segment.opacity * 0.8})`,
                }}
              />
            ))}
            
            {/* Glowing head of the snake */}
            <motion.div
              initial={{ y: '100%', opacity: 0, scale: 0 }}
              animate={{ y: '0%', opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary"
              style={{
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.9), 0 0 40px rgba(34, 197, 94, 0.4)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            onClick={handleClick}
            disabled={isAnimating}
            className="fixed bottom-8 right-8 z-50 group"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-30 transition-opacity duration-300"
              animate={{
                boxShadow: '0 0 30px rgba(34, 197, 94, 0.5)',
              }}
            />
            
            {/* Main button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-14 rounded-full bg-gray-900/90 backdrop-blur-md border border-gray-700 flex items-center justify-center shadow-lg overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              
              {/* Arrow icon */}
              <motion.div
                animate={isAnimating ? { y: -2 } : { y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowUp 
                  size={24} 
                  className={`text-primary transition-colors duration-300 ${
                    isAnimating ? 'animate-pulse' : ''
                  }`}
                />
              </motion.div>
              
              {/* Subtle glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackToTop;
