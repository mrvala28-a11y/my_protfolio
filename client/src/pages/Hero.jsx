import React from 'react';
import { motion } from 'framer-motion';
import { Send, Download } from 'lucide-react';

const Hero = ({ aboutRef }) => {
  const handleContactClick = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="min-h-[85vh] md:min-h-[90vh] flex items-center justify-center pt-0 px-6 overflow-hidden relative"
    >
      {/* Background soft orbs */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* LEFT: Text content */}
        <motion.div
          className="flex-1 space-y-3 md:space-y-4 text-center md:text-left order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-gray-500">
            Hey There,
          </h2>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-textPrimary leading-tight">
            I'm <span className="text-primary relative inline-block">
              Vivek Vala
              <motion.span
                className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed">
            I design and develop high-quality website experiences that make people's lives simpler through code and creativity.
          </p>

          <div className="pt-4 flex justify-center md:justify-start gap-4">
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-medium shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              Say Hello
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.button>
            <motion.a
              href="/Vivek_Vala_Resume.pdf"
              download="Vivek_Vala_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Resume
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>

        {/* RIGHT: Profile Image - Animated AFTER text */}
        <motion.div
          className="flex-1 flex justify-center order-2 md:order-2"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div 
            className="rounded-full overflow-hidden border-2 border-gray-200 shadow-lg"
            style={{
              width: 'clamp(200px, 35vw, 320px)',
              height: 'clamp(200px, 35vw, 320px)',
            }}
          >
            <motion.img
              src="/pro.jpeg"
              alt="Vivek Vala - Full Stack Developer"
              className="w-full h-full object-cover object-center"
              loading="eager"
              draggable="false"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;