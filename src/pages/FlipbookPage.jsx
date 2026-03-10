// src/pages/FlipbookPage.jsx
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function FlipbookPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen">
      
      {/* Tombol Kembali */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-4 left-4 z-50 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 text-gray-700 hover:bg-white transition-colors"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">Kembali</span>
      </motion.button>

      {/* Flipbook iframe */}
      <iframe
        src="/flipbook.html"
        className="w-full h-screen border-0"
        title="Flipbook Edukasi"
      />

    </div>
  );
}
