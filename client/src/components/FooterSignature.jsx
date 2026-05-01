import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FooterSignature = () => {
  return (
    <footer className="w-full bg-[#f5f5f5] py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">

        {/* Large Name Signature */}
        <motion.div
          className="relative mb-8 flex items-center justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block">

            {/* Main Outline Text */}
            <h1
              className="font-black text-primary relative select-none text-center"
              style={{
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontSize: 'clamp(70px, 15vw, 220px)',
                fontWeight: 900,
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '2.5px #22c55e',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Vivek Vala
            </h1>

            {/* Hover Fill Effect */}
            <motion.h1
              className="absolute inset-0 font-black text-center pointer-events-none"
              style={{
                fontFamily: "'Poppins', 'Inter', sans-serif",
                fontSize: 'clamp(70px, 15vw, 220px)',
                fontWeight: 900,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                color: '#22c55e',
                clipPath: 'inset(0 100% 0 0)',
              }}
              whileHover={{
                clipPath: 'inset(0 0% 0 0)',
              }}
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
              }}
            >
              Vivek Vala
            </motion.h1>

          </div>
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