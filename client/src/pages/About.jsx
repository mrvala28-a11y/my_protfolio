import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FaDownload, FaEnvelope, FaAward, FaCode, FaBrain, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { SiReact, SiJavascript, SiTailwindcss, SiNodedotjs, SiMongodb, SiExpress } from 'react-icons/si';

const About = () => {
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothTimelineProgress = useSpring(timelineScrollProgress, { stiffness: 100, damping: 30 });

  // Animated counters
  const [counters, setCounters] = useState({ projects: 0, experience: 0, hours: 0, passion: 0 });
  const [countersStarted, setCountersStarted] = useState(false);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const targetValues = { projects: 47, experience: 5, hours: 2800, passion: 100 };

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCounters({
        projects: Math.floor(targetValues.projects * easeOut),
        experience: parseFloat((targetValues.experience * easeOut).toFixed(1)),
        hours: Math.floor(targetValues.hours * easeOut),
        passion: Math.floor(targetValues.passion * easeOut),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            setCountersStarted(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countersStarted]);

  const features = [
    {
      icon: FaBrain,
      title: "Problem Solver",
      description: "I approach every challenge with analytical thinking and creative solutions, breaking complex problems into elegant, maintainable code.",
      color: "from-blue-500 to-cyan-500",
      glow: "rgba(59, 130, 246, 0.4)",
    },
    {
      icon: FaCode,
      title: "Creative Designer",
      description: "Beyond coding, I craft visually stunning interfaces with attention to detail, typography, and user experience that delights.",
      color: "from-purple-500 to-pink-500",
      glow: "rgba(168, 85, 247, 0.4)",
    },
    {
      icon: FaRocket,
      title: "Fast Developer",
      description: "Rapid prototyping and agile development allow me to ship features quickly without compromising on quality or performance.",
      color: "from-orange-500 to-red-500",
      glow: "rgba(249, 115, 22, 0.4)",
    },
    {
      icon: FaGraduationCap,
      title: "Continuous Learner",
      description: "The tech landscape evolves rapidly, and I'm committed to staying current with emerging technologies and best practices.",
      color: "from-green-500 to-emerald-500",
      glow: "rgba(34, 197, 94, 0.4)",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "Learning Started",
      description: "Began the journey into web development, mastering HTML, CSS, and JavaScript fundamentals with dedication.",
      icon: FaGraduationCap,
    },
    {
      year: "2020",
      title: "React Discovery",
      description: "Discovered React and fell in love with component-based architecture and modern frontend development.",
      icon: SiReact,
    },
    {
      year: "2021",
      title: "Building Projects",
      description: "Created multiple full-stack applications, from e-commerce platforms to productivity tools and dashboards.",
      icon: FaCode,
    },
    {
      year: "2022",
      title: "Backend Mastery",
      description: "Expanded into backend development with Node.js, Express, and databases like MongoDB and PostgreSQL.",
      icon: SiNodedotjs,
    },
    {
      year: "2023",
      title: "Professional Growth",
      description: "Started working with clients, delivering production-ready applications with focus on performance and UX.",
      icon: FaRocket,
    },
    {
      year: "2024",
      title: "Full Stack Expert",
      description: "Became proficient in end-to-end development, architecture design, and deployment strategies.",
      icon: FaCode,
    },
  ];

  const skills = [
    { name: "React", icon: SiReact, level: 95, color: "#61DAFB" },
    { name: "JavaScript", icon: SiJavascript, level: 92, color: "#F7DF1E" },
    { name: "Node.js", icon: SiNodedotjs, level: 88, color: "#339933" },
    { name: "MongoDB", icon: SiMongodb, level: 85, color: "#47A248" },
    { name: "Express", icon: SiExpress, level: 87, color: "#000000" },
    { name: "Tailwind CSS", icon: SiTailwindcss, level: 90, color: "#06B6D4" },
  ];

  return (
<section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f8f8] py-24 md:py-32"
      style={{ position: 'relative' }}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 50%, rgba(34, 197, 94, 0.08) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 40%),
                      radial-gradient(circle at 60% 80%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)`,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/4 left-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="absolute bottom-1/4 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
      />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* HERO SECTION - About intro with profile image */}
        <motion.div
          ref={heroRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
              },
            },
          }}
className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28"
        >
{/* LEFT: Profile Image - Clean circular, matching Hero */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30, scale: 0.95 },
              visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
            }}
            className="hidden md:flex justify-center lg:justify-start"
          >
            <div 
              className="rounded-full overflow-hidden border-2 border-gray-200 shadow-lg"
              style={{
                width: 'clamp(200px, 35vw, 320px)',
                height: 'clamp(200px, 35vw, 320px)',
              }}
            >
              <img
                src="/pro.jpeg"
                alt="Vivek Vala - Full Stack Developer"
                className="w-full h-full object-cover object-center"
                loading="eager"
                draggable="false"
              />
            </div>
          </motion.div>

          {/* RIGHT: Text Content */}
          <motion.div variants={{
            hidden: { opacity: 0, x: 30 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
          }}>
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
              className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-green-600 mb-4"
            >
              About Me
            </motion.span>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
            >
              Crafting digital
              <br />
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
                  experiences
                </span>
                <motion.svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                >
                  <path
                    d="M0,8 Q100,0 200,6 T300,10"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
              <br />
              <span className="text-primary">with passion & precision</span>
            </motion.h2>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
              }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl"
            >
              I'm a passionate full-stack developer who believes in creating meaningful digital experiences. 
              With a keen eye for detail and a relentless drive for excellence, I transform complex challenges 
              into elegant solutions that users love.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4, ease: "easeOut" } },
              }}
              className="text-gray-500 leading-relaxed mb-8"
            >
              Every line of code I write is infused with purpose. Whether I'm architecting scalable backend 
              systems or crafting pixel-perfect interfaces, my goal remains constant: build products that 
              not just function, but inspire.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* STATS SECTION */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-20"
        >
          {["projects", "experience", "hours", "passion"].map((key, index) => {
            const labels = {
              projects: { label: "Projects Completed", suffix: "+" },
              experience: { label: "Years Experience", suffix: "+" },
              hours: { label: "Learning Hours", suffix: "+" },
              passion: { label: "Passion %", suffix: "" },
            };
            const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

            return (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.15, ease: "easeOut" },
                  },
                }}
                className="relative bg-white rounded-[2rem] p-6 text-center border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(34,197,94,0.15)] transition-all duration-500 group overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Counter number */}
                <motion.div
                  className="text-4xl md:text-5xl font-extrabold mb-2"
                  style={{ color: colors[index] }}
                  animate={countersStarted ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 0.5, repeat: countersStarted ? Infinity : 0, delay: index * 0.1 }}
                >
                  {counters[key]}
                  <span className="text-lg md:text-xl ml-1">{labels[key].suffix}</span>
                </motion.div>

                <div className="text-gray-500 font-medium text-sm">{labels[key].label}</div>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors duration-300 flex items-center justify-center">
                  <FaAward className="text-green-400 text-sm group-hover:text-green-500 transition-colors duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15, delayChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}, transparent 70%)`,
                }}
              />

              {/* Glow ball */}
              <div
                className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${feature.glow}, transparent 70%)` }}
              />

              {/* Icon container */}
              <motion.div
                className="relative w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-white transition-colors duration-500"
                whileHover={{ rotate: 12, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="text-2xl text-gray-600 group-hover:text-gray-900 transition-colors duration-500" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 relative">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed relative">{feature.description}</p>

              {/* Arrow decoration */}
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* TIMELINE SECTION */}
        <motion.div
          ref={timelineRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-green-600 mb-4"
            >
              My Journey
            </motion.span>
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Timeline of Growth
            </motion.h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />

            {/* Animated progress line */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-400"
              style={{
                height: smoothTimelineProgress.get() * 100 + "%",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
            />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
                }}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-8 md:left-1/2 top-0 w-5 h-5 bg-white border-4 border-green-500 rounded-full -translate-x-1/2 shadow-lg hover:scale-125 transition-transform duration-300"
                  whileHover={{ scale: 1.3 }}
                />

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 inline-block min-w-[280px] md:min-w-[350px]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <item.icon className="text-green-500 text-lg" />
                    </div>
                    <span className="text-sm font-bold text-green-600">{item.year}</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SKILLS SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
              },
            },
          }}
        >
          <div className="text-center mb-12">
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="inline-block text-sm font-bold tracking-[0.2em] uppercase text-green-600 mb-4"
            >
              Technical Skills
            </motion.span>
            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } },
              }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Technologies & Expertise
            </motion.h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
                }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-green-50 transition-colors duration-300">
                    <skill.icon className="text-2xl text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{skill.name}</h4>
                    <div className="text-sm text-gray-500">{skill.level}%</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: skill.level + "%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.1 + 0.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}AA)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA BUTTONS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-20"
>
          <motion.a
            href="/Vivek_Vala_Resume.pdf"
            download="Vivek_Vala_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaDownload className="group-hover:animate-bounce transition-transform" />
              Download Resume
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -inset-px bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-green-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FaEnvelope className="group-hover:text-green-500 transition-colors" />
              Contact Me
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;