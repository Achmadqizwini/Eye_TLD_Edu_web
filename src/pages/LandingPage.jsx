import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Monitor, BookOpen, Eye, Shield, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full">
        
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Eye className="w-10 h-10 text-cyan-400" />
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Edukasi Proteksi{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Radiasi Mata
            </span>
          </h1>
          
          <p className="text-blue-200 text-lg max-w-xl mx-auto">
            Pilih format yang Anda inginkan untuk mempelajari materi proteksi radiasi lensa mata
          </p>
        </motion.div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Option 1: Website */}
          <motion.button
            onClick={() => navigate('/website')}
            className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-left overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Website Interaktif
              </h2>
              
              <p className="text-blue-200 mb-4">
                Jelajahi materi dengan animasi interaktif, quiz, dan navigasi modern
              </p>
              
              <ul className="space-y-2">
                {['Animasi Interaktif', 'Quiz & Evaluasi', 'Navigasi Mudah'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-blue-300">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center text-cyan-400 font-semibold">
                <span>Buka Website</span>
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.button>

          {/* Option 2: Flipbook */}
          <motion.button
            onClick={() => navigate('/flipbook')}
            className="group relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-left overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3">
                Flipbook Digital
              </h2>
              
              <p className="text-blue-200 mb-4">
                Baca materi seperti buku dengan efek flip halaman yang realistis
              </p>
              
              <ul className="space-y-2">
                {['Efek Flip Halaman', 'Tampilan Seperti Buku', 'Mudah Dibaca'].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2 text-sm text-blue-300">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center text-green-400 font-semibold">
                <span>Buka Flipbook</span>
                <motion.span 
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* Footer */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 text-blue-300 text-sm">
            <Shield className="w-4 h-4" />
            <span>Materi Edukasi Proteksi Radiasi</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}