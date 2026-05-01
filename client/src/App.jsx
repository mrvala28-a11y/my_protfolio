import React, { useState } from 'react';
import IntroLoader from './components/IntroLoader';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './pages/Hero';
import Approach from './pages/Approach';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import FooterSignature from './components/FooterSignature';
import BackToTop from './components/BackToTop';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            
            <About />
            <Skills />
            <Approach />
            <Projects />
<Contact />
<FooterSignature />
            <BackToTop />
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      )}
    </>
  );
}

export default App;