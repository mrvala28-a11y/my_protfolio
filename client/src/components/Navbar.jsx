import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

  const handleNavClick = (id) => {
    if (id === 'resume') {
      window.open('/Vivek_Vala_Resume.pdf', '_blank');
    } else {
      const element = document.getElementById(id.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileOpen(false);
  };

  // Lottery text effect component
  const LotteryLink = ({ text, onClick }) => {
    const [displayText, setDisplayText] = useState(text);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const [isAnimating, setIsAnimating] = useState(false);

    const handleMouseEnter = () => {
      if (isAnimating) return;
      setIsAnimating(true);
      
      let iteration = 0;
      const maxIterations = 8;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('')
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayText(text);
            setIsAnimating(false);
          }, 200);
        }
        
        iteration += 1 / 3;
      }, 30);
    };

    const handleClick = () => {
      // Trigger animation on click too for mobile
      if (!isAnimating) {
        handleMouseEnter();
      }
      setTimeout(() => onClick(), 600);
    };

    return (
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className="hover:text-primary text-gray-700 transition-colors duration-200 font-medium"
      >
        {displayText}
      </button>
    );
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className={`flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm rounded-full px-5 md:px-8 border border-gray-100 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
            <div 
              className="font-bold text-lg md:text-xl tracking-tight text-textPrimary cursor-pointer" 
              onClick={() => handleNavClick('home')}
            >
              Vivek's <span className="text-primary">Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium text-sm">
              {links.map((link) => (
                <li key={link}>
                  <LotteryLink text={link} onClick={() => handleNavClick(link)} />
                </li>
              ))}
              <li>
                <motion.a
                  href="/Vivek_Vala_Resume.pdf"
                  download="Vivek_Vala_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-gray-700 hover:text-primary transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </motion.a>
              </li>
            </ul>
            
            {/* Mobile Hamburger Button */}
            <button 
              className="md:hidden p-2 text-gray-700 focus:outline-none"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <motion.div
                animate={mobileOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-center items-center gap-1.5"
              >
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-gray-700 block rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-gray-700 block rounded-full"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-gray-700 block rounded-full"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
              {links.map((link, index) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleNavClick(link)}
                  className="text-2xl font-semibold text-gray-800 hover:text-primary transition-colors"
                >
                  {link}
                </motion.button>
              ))}
              <motion.a
                href="/Vivek_Vala_Resume.pdf"
                download="Vivek_Vala_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.1 }}
                className="inline-flex items-center gap-2 text-2xl font-semibold text-gray-800 hover:text-primary transition-colors"
              >
                Resume
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
