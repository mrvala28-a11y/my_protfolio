import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { FiLayout, FiCode, FiGlobe, FiSmartphone, FiMonitor, FiLayers } from 'react-icons/fi';
import { SiCanva } from 'react-icons/si';

const Approach = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  // Background scroll progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });

  // Timeline scroll progress for steps
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const smoothProgress = useSpring(timelineScroll, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const stepProgress = useTransform(smoothProgress, [0, 1], [0, 6]);
  const [activeStep, setActiveStep] = useState(5); // Default active Step 06
  const [activeTab, setActiveTab] = useState(null);

  React.useEffect(() => {
    const unsubscribe = stepProgress.on('change', (value) => {
      if (timelineScroll.get() > 0) {
        const step = Math.max(0, Math.min(6, Math.round(value)));
        setActiveStep(step);
      }
    });
    return unsubscribe;
  }, [stepProgress]);

  const steps = [
    {
      id: '01',
      title: 'Understand the Goal',
      subtitle: 'Purpose & Target Users',
      icon: FiGlobe,
    },
    {
      id: '02',
      title: 'Research & Inspiration',
      subtitle: 'References & Best Practices',
      icon: FiLayout,
    },
    {
      id: '03',
      title: 'Plan Structure',
      subtitle: 'Layout & Responsiveness',
      icon: FiLayers,
    },
    {
      id: '04',
      title: 'Design UI',
      subtitle: 'Spacing, Colors & Typography',
      icon: FiMonitor,
    },
    {
      id: '05',
      title: 'Development',
      subtitle: 'Clean & Scalable Code',
      icon: FiCode,
    },
    {
      id: '06',
      title: 'Test & Optimize',
      subtitle: 'Performance & Accessibility',
      icon: FiSmartphone,
    },
    {
      id: '07',
      title: 'Deploy & Improve',
      subtitle: 'Launch & Continuous Updates',
      icon: FiGlobe,
    },
  ];

  const featureCards = [
    {
      title: 'Design',
      subtitle: 'UI / UX Design',
      icon: FiLayout,
      color: 'text-pink-500',
    },
    {
      title: 'Frontend',
      subtitle: 'Modern Development',
      icon: FiCode,
      color: 'text-blue-500',
    },
    {
      title: 'Deployment',
      subtitle: 'Web Hosting & SEO',
      icon: FiGlobe,
      color: 'text-green-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const smoothBgProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
<section
      id="approach"
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 md:py-32"
      style={{ position: 'relative' }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <motion.div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(34,197,94,0.03) 50%, transparent 100%)',
            y: useTransform(smoothBgProgress, [0, 1], ['-10%', '10%']),
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        
        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-24"
        >
          <motion.span
            variants={textVariants}
            className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-green-600 mb-4 pb-2 relative"
          >
            My Approach
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-green-500 rounded-full" />
          </motion.span>
<motion.h2
            variants={textVariants}
            className="text-3xl md:text-4xl font-semibold text-gray-900"
          >
            How I Create a{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
              Website
            </span>
          </motion.h2>
        </motion.div>

        {/* PROCESS STEPS TIMELINE */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative space-y-4 md:space-y-6 flex flex-col"
        >
          {steps.map((step, index) => {
            const isActive = index === activeStep;

            return (
              <motion.div
                key={step.id}
                custom={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                className={`group relative flex flex-col md:flex-row items-center md:justify-between p-6 md:p-8 rounded-[32px] transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm border
                  ${isActive 
                    ? 'bg-green-500 border-green-400 shadow-[0_20px_40px_-15px_rgba(34,197,94,0.4)]' 
                    : 'bg-white border-gray-100 shadow-sm hover:bg-green-50/50 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/10'
                  }
                `}
                animate={{ scale: isActive ? 1.02 : 1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Micro-interaction background glow on active */}
                {isActive && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-white/10 to-green-400/0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}

                <div className="flex items-center w-full md:w-auto relative z-10">
                  {/* Circular Step Number */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500
                    ${isActive 
                      ? 'bg-white text-green-500 shadow-inner' 
                      : 'bg-gray-50 text-gray-400 group-hover:bg-green-100 group-hover:text-green-600'
                    }
                  `}>
                    {step.id}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="ml-6 flex-grow">
<h3 className={`text-xl md:text-2xl font-semibold mb-1 transition-colors duration-500
                      ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-green-700'}
                    `}>
                      {step.title}
                    </h3>
                    <p className={`text-sm md:text-base font-medium transition-colors duration-500
                      ${isActive ? 'text-green-100' : 'text-gray-500 group-hover:text-green-600/70'}
                    `}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Right Icon */}
                <div className={`hidden md:flex flex-shrink-0 ml-8 w-14 h-14 rounded-2xl items-center justify-center transition-all duration-500 relative z-10
                  ${isActive ? 'bg-green-400/30 text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-green-100 group-hover:text-green-600'}
                `}>
                  <step.icon size={24} className={isActive ? 'animate-pulse' : ''} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BUTTONS SECTION - Proper Spacing */}
        <div className="mt-32 mb-16 flex flex-wrap justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(activeTab === 'design' ? null : 'design')}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-sm
              ${activeTab === 'design' 
                ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 ring-4 ring-gray-900/10' 
                : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-green-400 hover:text-green-600 hover:shadow-lg hover:shadow-green-500/10'}
            `}
          >
            <FiLayout className={activeTab === 'design' ? 'text-green-400' : ''} /> Design 🎨
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(activeTab === 'code' ? null : 'code')}
            className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-sm
              ${activeTab === 'code' 
                ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/20 ring-4 ring-gray-900/10' 
                : 'bg-white text-gray-700 border-2 border-gray-100 hover:border-green-400 hover:text-green-600 hover:shadow-lg hover:shadow-green-500/10'}
            `}
          >
            <FiCode className={activeTab === 'code' ? 'text-green-400' : ''} /> Code 💻
          </motion.button>
        </div>

        {/* DYNAMIC CONTENT FOR BUTTONS */}
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="mb-24 overflow-hidden"
            >
              <div className="bg-gray-50 rounded-[32px] p-8 md:p-12 border border-gray-100 shadow-inner max-w-4xl mx-auto">
                {activeTab === 'design' ? (
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                      <FiLayout size={40} />
                    </div>
                    <div>
<h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Creative & Intuitive UI</h4>
                      <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                        My design process involves deep research, wireframing, and creating high-fidelity prototypes. I focus on typography, color theory, and micro-interactions to ensure the user experience is not just functional, but delightful.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-3xl flex items-center justify-center flex-shrink-0">
                      <FiCode size={40} />
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Robust & Scalable Code</h4>
                      <p className="text-gray-600 leading-relaxed">
                        I write clean, modular, and performant code. Leveraging modern frameworks like React and Next.js alongside Tailwind CSS, I ensure that the architecture is scalable, accessible, and optimized for speed.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATEMENT TEXT */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-24 max-w-4xl mx-auto px-4"
        >
          <motion.p
            variants={textVariants}
className="text-3xl md:text-4xl font-semibold text-gray-800 leading-tight mb-8"
          >
            I love building intuitive and{' '}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400 relative inline-block px-2"
            >
              Elegant
              <motion.svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              >
                <path
                  d="M0,8 Q50,0 100,6 T200,8"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>{' '}
            designs.
          </motion.p>
          <motion.p
            variants={textVariants}
            className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
          >
            Every pixel is thoughtfully placed to create modern, responsive layouts that feel alive.
          </motion.p>
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="relative bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.15)] transition-all duration-500 group overflow-hidden"
              whileHover={{ y: -10 }}
            >
              {/* Glassmorphism gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center mb-8 bg-gray-50 ${card.color} group-hover:bg-white group-hover:shadow-md transition-all duration-500 relative z-10`}>
                <motion.div
                  transition={{ duration: 0.5 }}
                  className="group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"
                >
                  <card.icon size={36} />
                </motion.div>
              </div>

<h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 relative z-10">
                {card.title}
              </h4>
              <p className="text-base text-gray-500 font-medium relative z-10">{card.subtitle}</p>

              {index === 0 && (
                <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-30 transition-opacity duration-500 group-hover:rotate-180 transform">
                  <SiCanva size={40} className="text-blue-500" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default Approach;
