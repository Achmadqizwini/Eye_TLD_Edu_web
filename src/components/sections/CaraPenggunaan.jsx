// src/components/sections/CaraPenggunaan.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  ArrowLeft,
  Play,
  RotateCcw
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Persiapan',
    description: 'Pastikan TLD dalam kondisi baik sebelum digunakan',
    details: [
      'Periksa kondisi fisik TLD (tidak retak atau rusak)',
      'Pastikan TLD sudah di-reset/annealing oleh petugas',
      'Catat nomor identifikasi TLD yang akan digunakan',
      'Siapkan headband atau frame kacamata untuk pemasangan'
    ],
    tips: 'Selalu gunakan TLD yang sudah terdaftar atas nama Anda',
    image: '🔍'
  },
  {
    id: 2,
    title: 'Pemasangan',
    description: 'Pasang TLD pada posisi yang tepat di area mata',
    details: [
      'Posisikan TLD sedekat mungkin dengan mata (area alis)',
      'Gunakan headband khusus atau pasang pada frame kacamata',
      'Pastikan TLD tidak menghalangi pandangan',
      'Kristal TLD harus menghadap ke arah sumber radiasi'
    ],
    tips: 'TLD sebaiknya dipasang di sisi mata yang lebih dekat dengan sumber radiasi',
    image: '👁️'
  },
  {
    id: 3,
    title: 'Selama Bekerja',
    description: 'Gunakan TLD secara konsisten selama bekerja',
    details: [
      'Pakai TLD setiap kali bekerja dengan sumber radiasi',
      'Jangan melepas TLD selama prosedur berlangsung',
      'Hindari menyentuh atau menutupi area kristal TLD',
      'Jauhkan dari sumber panas dan sinar matahari langsung'
    ],
    tips: 'Konsistensi pemakaian adalah kunci akurasi pengukuran dosis',
    image: '⚕️'
  },
  {
    id: 4,
    title: 'Penyimpanan',
    description: 'Simpan TLD dengan benar saat tidak digunakan',
    details: [
      'Simpan di tempat yang disediakan (TLD storage)',
      'Jauhkan dari area dengan radiasi background tinggi',
      'Hindari paparan suhu ekstrem (panas/dingin)',
      'Jangan simpan bersama dengan sumber radioaktif'
    ],
    tips: 'Penyimpanan yang tepat mencegah pembacaan dosis palsu',
    image: '📦'
  },
  {
    id: 5,
    title: 'Pengembalian & Pembacaan',
    description: 'Kembalikan TLD sesuai jadwal untuk pembacaan',
    details: [
      'Kembalikan TLD sesuai periode pemantauan (biasanya 1-3 bulan)',
      'Serahkan ke petugas proteksi radiasi',
      'Tunggu hasil pembacaan dosis',
      'Review hasil dan dokumentasikan dalam catatan dosis personal'
    ],
    tips: 'Jangan lupa untuk mengambil TLD pengganti setelah pengembalian',
    image: '📊'
  }
];

const warnings = [
  'Jangan meminjamkan TLD kepada orang lain',
  'Jangan membawa TLD saat menjalani pemeriksaan radiologi sebagai pasien',
  'Laporkan segera jika TLD hilang atau rusak',
  'Jangan mencoba membuka atau memodifikasi TLD'
];

export default function CaraPenggunaan() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetSteps = () => {
    setCurrentStep(0);
  };

  return (
    <section id="penggunaan" className="py-20 md:py-32 bg-gradient-to-b from-cyan-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Panduan Praktis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Cara Penggunaan{' '}
            <span className="bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent">
              TLD Mata
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ikuti langkah-langkah berikut untuk memastikan TLD mata digunakan 
            dengan benar dan memberikan hasil pengukuran yang akurat.
          </p>
        </AnimatedSection>

        {/* Step Progress */}
        <AnimatedSection delay={0.2} className="mb-12">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                    : index < currentStep
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === currentStep
                    ? 'bg-white text-green-500'
                    : index < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-white'
                }`}>
                  {index < currentStep ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                </span>
                <span className="hidden md:inline text-sm font-medium">{step.title}</span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Step Content */}
        <AnimatedSection delay={0.3}>
          <div className="glass-card overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="p-8 md:p-12"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Visual */}
                  <div className="order-2 md:order-1">
                    <motion.div
                      className="bg-gradient-to-br from-green-100 to-cyan-100 rounded-3xl p-12 flex items-center justify-center"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, type: 'spring' }}
                    >
                      <motion.span
                        className="text-8xl"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {steps[currentStep].image}
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="order-1 md:order-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {steps[currentStep].id}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900">
                        {steps[currentStep].title}
                      </h3>
                    </div>

                    <p className="text-lg text-gray-600 mb-6">
                      {steps[currentStep].description}
                    </p>

                    <ul className="space-y-3 mb-6">
                      {steps[currentStep].details.map((detail, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tip Box */}
                    <div className="bg-gradient-to-r from-green-50 to-cyan-50 border-l-4 border-green-500 p-4 rounded-r-xl">
                      <p className="text-sm text-green-800">
                        <strong>💡 Tips:</strong> {steps[currentStep].tips}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="border-t border-gray-100 p-6 bg-gray-50 flex items-center justify-between">
              <motion.button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentStep === 0
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-white hover:shadow'
                }`}
                whileHover={currentStep !== 0 ? { x: -5 } : {}}
                whileTap={currentStep !== 0 ? { scale: 0.95 } : {}}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Sebelumnya</span>
              </motion.button>

              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={resetSteps}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all"
                  whileHover={{ rotate: -180 }}
                  transition={{ duration: 0.3 }}
                >
                  <RotateCcw className="w-5 h-5" />
                </motion.button>
                <span className="text-sm text-gray-500">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>

              <motion.button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  currentStep === steps.length - 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-500/30'
                }`}
                whileHover={currentStep !== steps.length - 1 ? { x: 5 } : {}}
                whileTap={currentStep !== steps.length - 1 ? { scale: 0.95 } : {}}
              >
                <span>Selanjutnya</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

        {/* Warning Section */}
        <AnimatedSection delay={0.4} className="mt-12">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-display font-bold text-red-800">
                Hal yang Harus Dihindari
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {warnings.map((warning, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-white rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-red-500 text-xl">✕</span>
                  <span className="text-gray-700 text-sm">{warning}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}