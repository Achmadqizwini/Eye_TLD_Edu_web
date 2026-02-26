// src/pages/LandingPage.jsx
import { motion } from 'framer-motion';
import { BookOpen, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const options = [
    {
      id: 'flipbook',
      title: 'Flipbook Digital',
      description: 'Pengalaman membaca seperti buku fisik dengan animasi membalik halaman yang interaktif',
      icon: BookOpen,
      path: '/flipbook',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      features: ['Animasi flip halaman', 'Gestur swipe', 'Tampilan buku nyata']
    },
    {
      id: 'website',
      title: 'Website Interaktif',
      description: 'Eksplorasi konten dengan scrolling modern, animasi halus, dan fitur interaktif',
      icon: Globe,
      path: '/website',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      features: ['Scroll animasi', 'Quiz interaktif', 'Simulator dosis']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 md:p-8">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Platform Edukasi Interaktif
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Proteksi Radiasi
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Lensa Mata
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Pilih format pembelajaran yang sesuai dengan preferensi Anda
          </p>
        </motion.div>

        {/* Options Grid - FLIPBOOK FIRST (LEFT/TOP), WEBSITE SECOND (RIGHT/BOTTOM) */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {options.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
            >
              <Link to={option.path}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden bg-gradient-to-br ${option.bgGradient} rounded-3xl p-8 md:p-10 cursor-pointer group border border-white/20 shadow-2xl`}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <option.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                    {option.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {option.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/60 rounded-full text-sm text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className={`inline-flex items-center gap-2 text-transparent bg-gradient-to-r ${option.gradient} bg-clip-text font-semibold`}>
                    Mulai Eksplorasi
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ArrowRight className={`w-5 h-5 text-${option.gradient.split('-')[1]}-500`} />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-white/50 text-sm mt-8"
        >
          Kedua format berisi materi edukasi yang sama dengan pengalaman berbeda
        </motion.p>
      </div>
    </div>
  );
}