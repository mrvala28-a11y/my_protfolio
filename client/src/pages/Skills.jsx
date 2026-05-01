import React from 'react';
import { motion } from 'framer-motion';

// Importing icons
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaFigma, FaGithub, FaCode, FaBrain } from 'react-icons/fa';
import { SiTailwindcss, SiExpress, SiMongodb, SiCanva, SiVercel } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';
import { IoLogoJavascript } from 'react-icons/io5';
import { MdAnimation, MdTrendingUp, MdOutlineDesignServices } from 'react-icons/md';
import { BiPalette } from 'react-icons/bi';

// Skill Data Categories
const developmentSkills = [
  { name: 'HTML5', icon: FaHtml5, color: 'text-orange-500' },
  { name: 'CSS3', icon: FaCss3Alt, color: 'text-blue-500' },
  { name: 'JavaScript', icon: IoLogoJavascript, color: 'text-yellow-400' },
  { name: 'React.js', icon: FaReact, color: 'text-cyan-400' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: 'text-teal-400' },
  { name: 'Node.js', icon: FaNodeJs, color: 'text-green-500' },
  { name: 'Express.js', icon: SiExpress, color: 'text-gray-700' },
  { name: 'MongoDB', icon: SiMongodb, color: 'text-green-600' },
];

const designingSkills = [
  { name: 'Canva', icon: SiCanva, color: 'text-blue-500' },
  { name: 'Figma', icon: FaFigma, color: 'text-pink-500' },
];

const toolsSkills = [
  { name: 'VS Code', icon: VscVscode, color: 'text-blue-600' },
  { name: 'GitHub', icon: FaGithub, color: 'text-gray-800' },
  { name: 'Vercel', icon: SiVercel, color: 'text-black' },
];

const interests = [
  { name: 'Web Animation', icon: MdAnimation, color: 'text-purple-500' },
  { name: 'UI Research', icon: MdOutlineDesignServices, color: 'text-indigo-500' },
  { name: 'AI Tools', icon: FaBrain, color: 'text-pink-600' },
  { name: 'Creative Coding', icon: FaCode, color: 'text-green-500' },
  { name: 'Tech Trends', icon: MdTrendingUp, color: 'text-blue-500' },
  { name: 'Clean Design', icon: BiPalette, color: 'text-orange-500' },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

const SkillCard = ({ name, icon: Icon, color, large }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ scale: 1.05, y: -5 }}
    className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer ${large ? 'h-40' : 'h-32'}`}
  >
    <div className={`mb-3 transform group-hover:-translate-y-1 transition-transform duration-300 ${color}`}>
      <Icon size={large ? 48 : 36} />
    </div>
    <h3 className="font-medium text-gray-800 text-sm md:text-base">{name}</h3>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-[#f8f8f8] relative">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
            What I'm good at
          </span>
<h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Skills & Interests</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-20">
          {/* 1. Development Section */}
          <div>
<h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 border-l-4 border-primary pl-4">Development</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6"
            >
              {developmentSkills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </motion.div>
          </div>

          {/* 2. Designing Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 border-l-4 border-primary pl-4">Designing</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {designingSkills.map((skill) => (
                <SkillCard key={skill.name} {...skill} large />
              ))}
            </motion.div>
          </div>

          {/* 3. Tools Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 border-l-4 border-primary pl-4">Tools</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6"
            >
              {toolsSkills.map((skill) => (
                <SkillCard key={skill.name} {...skill} />
              ))}
            </motion.div>
          </div>

          {/* 4. Interests Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 border-l-4 border-primary pl-4">Interests</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
            >
              {interests.map((interest) => (
                <SkillCard key={interest.name} {...interest} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
