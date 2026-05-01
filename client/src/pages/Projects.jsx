import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

// ============================================
// Projects Data - 3 Complete Projects
// ============================================
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Shopping Solution',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    year: '2024',
    role: 'Lead Developer',
    github: 'https://github.com',
    overview: 'A modern e-commerce platform enabling seamless online shopping with secure payment processing and inventory management.',
    challenge: 'Building a scalable architecture that handles high traffic while maintaining fast load times and secure transactions.',
    solution: 'Implemented microservices architecture with Redis caching, JWT authentication, and Stripe integration for payments.',
    results: [
      '99.9% uptime achieved',
      '40% faster page loads',
      'Secure payment processing'
    ],
    stats: [
      { value: '50+', label: 'Products' },
      { value: '100%', label: 'Responsive' },
      { value: 'Stripe', label: 'Payments' },
    ],
  },
  {
    id: 2,
    title: 'Task Management App',
    subtitle: 'Productivity Workflow Tool',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    techStack: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    year: '2024',
    role: 'Frontend Lead',
    github: 'https://github.com',
    overview: 'A collaborative task management application with real-time updates and drag-and-drop kanban boards.',
    challenge: 'Creating intuitive user experience while handling real-time sync across multiple users and devices.',
    solution: 'Built with Firebase Realtime Database for instant updates and custom drag-and-drop functionality.',
    results: [
      'Real-time collaboration',
      'Intuitive kanban boards',
      'Cross-platform support'
    ],
    stats: [
      { value: '10+', label: 'API Endpoints' },
      { value: '5+', label: 'Team Members' },
      { value: '24/7', label: 'Support' },
    ],
  },
  {
    id: 3,
    title: 'AI Content Generator',
    subtitle: '智能内容创作平台',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    techStack: ['Next.js', 'OpenAI API', 'Prisma', 'PostgreSQL'],
    year: '2023',
    role: 'Full-Stack Developer',
    github: 'https://github.com',
    overview: 'An AI-powered content generation platform that helps users create high-quality written content using GPT models.',
    challenge: 'Integrating AI capabilities with a performant frontend while managing API rate limits and user authentication.',
    solution: 'Built with Next.js API routes, OpenAI integration, and PostgreSQL database with Prisma ORM.',
    results: [
      '500+ active users',
      '10,000+ generations',
      '95% user satisfaction'
    ],
    stats: [
      { value: '5+', label: 'API Endpoints' },
      { value: '100%', label: 'Responsive' },
      { value: '<100ms', label: 'Latency' },
    ],
  },
];

// ============================================
// Sub-Components
// ============================================

// Tech Stack Badge Component
const TechBadge = ({ tech }) => (
  <span className="px-3 py-1 text-xs font-medium bg-rose-50 text-rose-600 rounded-full border border-rose-100">
    {tech}
  </span>
);

// Stats Card Component
const StatCard = ({ value, label }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-rose-50/50 transition-colors duration-300">
    <span className="text-2xl font-bold text-rose-600">{value}</span>
    <span className="text-xs text-gray-500 mt-1">{label}</span>
  </div>
);

// Case Study Section Component
const CaseStudySection = ({ number, title, description }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-sm font-semibold text-rose-400">0{number}</span>
      <h4 className="text-base font-semibold text-gray-800">{title}</h4>
    </div>
    <p className="text-sm text-gray-600 leading-relaxed ml-8">
      {description}
    </p>
  </div>
);

// Project Card Component (LEFT SIDE)
const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full lg:w-5/12"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
{/* Title & Subtitle */}
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.title}</h3>
          <p className="text-sm text-gray-500 mb-4">{project.subtitle}</p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, idx) => (
              <TechBadge key={idx} tech={tech} />
            ))}
          </div>

          {/* Year & Role */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-gray-500">{project.year}</span>
            <span className="text-gray-500">{project.role}</span>
          </div>

          {/* GitHub Button */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-rose-500 text-white rounded-xl font-medium transition-colors duration-300"
          >
            <FaGithub className="w-5 h-5" />
            GitHub Repo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Case Study Panel Component (RIGHT SIDE)
const CaseStudyPanel = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      className="w-full lg:w-6/12"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
        {/* Case Study Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Case Study</h3>
          <div className="h-1 w-20 bg-rose-400 rounded-full mt-2" />
        </div>

        {/* Content Sections */}
        <div className="space-y-1">
          <CaseStudySection number={1} title="Overview" description={project.overview} />
          <CaseStudySection number={2} title="Challenge" description={project.challenge} />
          <CaseStudySection number={3} title="Solution" description={project.solution} />
          
          {/* Results */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-semibold text-rose-400">04</span>
              <h4 className="text-base font-semibold text-gray-800">Results</h4>
            </div>
            <ul className="ml-8 space-y-2">
              {project.results.map((result, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-6" />

        {/* Stats Cards */}
        <div>
          <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Key Metrics</h4>
          <div className="grid grid-cols-3 gap-3">
            {project.stats.map((stat, idx) => (
              <StatCard key={idx} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// Main Projects Component
// ============================================
const Projects = () => {
  return (
    <section id="projects" className="min-h-screen py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-rose-500 uppercase tracking-widest mb-2">
            Things I've Built
          </p>
<h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
            My Works
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col lg:flex-row gap-8 items-start ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <ProjectCard project={project} index={index} />
              <CaseStudyPanel project={project} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
