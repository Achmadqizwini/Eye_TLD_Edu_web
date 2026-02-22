// src/App.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/common/Navbar';
import ScrollProgress from './components/common/ScrollProgress';
import Footer from './components/common/Footer';

// Sections
import HeroSection from './components/sections/HeroSection';
import RisikoPaparan from './components/sections/RisikoPaparan';
import NBDSection from './components/sections/NBDSection';
import PeranTLDSection from './components/sections/PeranTLDSection';
import CaraPenggunaan from './components/sections/CaraPenggunaan';
import QuizSection from './components/sections/QuizSection';
import CTASection from './components/sections/CTASection';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <Navbar />
            <main>
              <HeroSection />
              <RisikoPaparan />
              <NBDSection />
              <PeranTLDSection />
              <CaraPenggunaan />
              <QuizSection />
              <CTASection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center z-50"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h2 className="text-white text-2xl font-display font-bold">
          Memuat Materi Edukasi...
        </h2>
        <p className="text-blue-200 mt-2">Proteksi Radiasi Lensa Mata</p>
      </motion.div>
    </motion.div>
  );
}

export default App;