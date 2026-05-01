import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FooterSignature = () => {
  return (
    <footer className="w-full bg-[#f5f5f5] py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        
        {/* Large Name Signature */}
        <motion.div 
          className="relative mb-8 group cursor-default"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 
            className="font-black text-primary relative select-none"
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              fontSize: 'clamp(70px, 15vw, 220px)',
              fontWeight: 900,
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '2.5px #22c55e',
              textStroke: '2.5px #22c55e',
              lineHeight: 1,
              transition: 'all 0.7s ease',
            }}
          >
            {/* Fill layer - appears on hover */}
            <span 
              className="absolute inset-0 text-primary pointer-events-none"
              style={{
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontSize: 'clamp(70px, 15vw, 220px)',
                fontWeight: 900,
                WebkitTextFillColor: '#22c55e',
                WebkitBackgroundClip: 'text',
                background: 'linear-gradient(90deg, #22c55e 0%, #22c55e 100%)',
                backgroundSize: '0% 100%',
                transition: 'background-size 0.7s ease',
                clipPath: 'inset(0 100% 0 0)',
                lineHeight: 1,
              }}
            >
              Vivek Vala
            </span>
            Vivek Vala
          </h1>
          
          {/* Hover overlay for fill effect */}
          <span 
            className="absolute inset-0 pointer-events-auto cursor-pointer"
            style={{
              fontFamily: "'Poppins', 'Inter', sans-serif",
              fontSize: 'clamp(70px, 15vw, 220px)',
              fontWeight: 900,
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              background: 'linear-gradient(90deg, #22c55e 0%, #22c55e 100%)',
              backgroundSize: '200% 100%',
              backgroundPosition: '100% 0',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              transition: 'background-position 0.7s ease',
              lineHeight: 1,
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              e.target.style.opacity = '1';
              e.target.style.backgroundPosition = '0% 0%';
            }}
            onMouseLeave={(e) => {
              e.target.style.opacity = '0';
              e.target.style.backgroundPosition = '100% 0%';
            }}
          >
            Vivek Vala
          </span>
        </motion.div>

        {/* Copyright Text */}
        <motion.div 
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600 text-sm md:text-base font-medium">
            Copyright © 2026 Vivek Vala
          </p>
          <p className="text-gray-600 text-sm md:text-base font-medium flex items-center justify-center gap-2">
            created with 
            <motion.span
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <Heart 
                size={16} 
                className="text-primary fill-primary" 
              />
            </motion.span>
            by me
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default FooterSignature;
