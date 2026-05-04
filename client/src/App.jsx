import React, { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './pages/Hero';
import Approach from './pages/Approach'; // ✅ ADD
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from './pages/About';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />
      {loading && <IntroLoader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="relative w-full">
          <Navbar />
          <main>
            <Hero />
            {/* ✅ NOW IT WILL SHOW */}
            <Skills />
            <Approach />
            <About/>
            <Projects />
            <Contact />
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      )}
    </>
  );
}

export default App;