import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import Navbar from '../components/common/Navbar';
import ScrollProgress from '../components/common/ScrollProgress';
import Footer from '../components/common/Footer';

import HeroSection from '../components/sections/HeroSection';
import RisikoPaparan from '../components/sections/RisikoPaparan';
import NBDSection from '../components/sections/NBDSection';
import PeranTLDSection from '../components/sections/PeranTLDSection';
import CaraPenggunaan from '../components/sections/CaraPenggunaan';
import QuizSection from '../components/sections/QuizSection';
import CTASection from '../components/sections/CTASection';

export default function WebsitePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
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
            {/* Back Button */}
            <motion.button
              onClick={() => navigate('/')}
              className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-gray-700 hover:bg-white transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Kembali</span>
            </motion.button>

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
      >
        <motion.div
          className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <h2 className="text-white text-xl font-bold">Memuat Website...</h2>
      </motion.div>
    </motion.div>
  );
}