  
// src/components/sections/RisikoPaparan.jsx
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { AlertTriangle, Zap, Clock, Eye } from 'lucide-react';

const efekRadiasi = [
  {
    type: 'Efek Stokastik',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    description: 'Efek yang terjadi secara acak, tidak ada nilai ambang dosis. Peluang terjadinya meningkat seiring dosis.',
    examples: ['Katarak radiasi', 'Kerusakan DNA sel mata', 'Risiko kanker jangka panjang'],
    characteristics: [
      'Tidak ada ambang batas dosis',
      'Probabilitas meningkat dengan dosis',
      'Keparahan tidak tergantung dosis'
    ]
  },
  {
    type: 'Efek Non-Stokastik (Deterministik)',
    icon: Clock,
    color: 'from-purple-500 to-indigo-500',
    description: 'Efek yang pasti terjadi jika dosis melebihi ambang batas tertentu. Keparahan meningkat dengan dosis.',
    examples: ['Kekeruhan lensa (katarak)', 'Konjungtivitis radiasi', 'Kerusakan kornea'],
    characteristics: [
      'Ada ambang batas dosis',
      'Keparahan meningkat dengan dosis',
      'Waktu timbul tergantung dosis'
    ]
  }
];

export default function RisikoPaparan() {
  return (
    <section id="risiko" className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <AlertTriangle className="w-4 h-4" />
            <span>Penting untuk Dipahami</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Risiko Paparan{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Radiasi Lensa Mata
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lensa mata merupakan organ yang sangat sensitif terhadap radiasi. 
            Paparan berulang dapat menyebabkan kerusakan permanen.
          </p>
        </AnimatedSection>

        {/* Eye Anatomy Visualization */}
        <AnimatedSection className="mb-16" delay={0.2}>
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Eye Illustration */}
              <div className="relative">
                <motion.div
                  className="relative w-full max-w-sm mx-auto"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Simple Eye SVG */}
                  <svg viewBox="0 0 200 200" className="w-full h-auto">
                    {/* Outer eye shape */}
                    <ellipse cx="100" cy="100" rx="90" ry="60" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2"/>
                    {/* Iris */}
                    <circle cx="100" cy="100" r="35" fill="#1e40af"/>
                    {/* Pupil */}
                    <circle cx="100" cy="100" r="15" fill="#0f172a"/>
                    {/* Lens highlight */}
                    <ellipse cx="92" cy="92" rx="8" ry="6" fill="rgba(255,255,255,0.6)"/>
                    {/* Lens area indicator */}
                    <motion.ellipse 
                      cx="100" cy="100" rx="25" ry="25" 
                      fill="none" 
                      stroke="#ef4444" 
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      animate={{ 
                        strokeDashoffset: [0, 20],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </svg>
                  
                  {/* Radiation indicator */}
                  <motion.div
                    className="absolute top-4 right-4 flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-medium"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-3 h-3" />
                    <span>Area Sensitif</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Info */}
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  Mengapa Lensa Mata Rentan?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Sel lensa tidak memiliki kemampuan regenerasi',
                    'Akumulasi dosis radiasi bersifat permanen',
                    'Kerusakan dapat terjadi tanpa gejala awal',
                    'Katarak radiasi dapat berkembang bertahun-tahun kemudian'
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Efek Radiasi Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {efekRadiasi.map((efek, index) => (
            <AnimatedSection 
              key={index}
              animation={index === 0 ? 'slideLeft' : 'slideRight'}
              delay={0.3 + index * 0.2}
            >
              <motion.div
                className="glass-card h-full overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${efek.color} p-6`}>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <efek.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white">
                      {efek.type}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6">{efek.description}</p>

                  {/* Characteristics */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Karakteristik
                    </h4>
                    <ul className="space-y-2">
                      {efek.characteristics.map((char, i) => (
                        <li key={i} className="flex items-center space-x-2 text-sm text-gray-700">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span>{char}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Examples */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Contoh Efek
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {efek.examples.map((example, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        {/* Warning Box */}
        <AnimatedSection className="mt-12" delay={0.5}>
          <motion.div
            className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-6 rounded-r-2xl"
            whileHover={{ x: 5 }}
          >
            <div className="flex items-start space-x-4">
              <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-red-800 mb-2">
                  Perhatian Penting!
                </h4>
                <p className="text-red-700">
                  Batas dosis lensa mata telah diperketat oleh ICRP dari 150 mSv/tahun menjadi 
                  <strong> 20 mSv/tahun</strong> (rata-rata 5 tahun) untuk mencegah katarak radiasi. 
                  Pemantauan dosis mata sangat penting bagi pekerja radiasi.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}