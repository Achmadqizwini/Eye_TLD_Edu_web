// src/components/sections/PeranTLDSection.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { Eye, HelpCircle, Settings, Heart, ChevronDown } from 'lucide-react';

const tldContent = [
  {
    id: 'pengertian',
    icon: HelpCircle,
    title: 'Pengertian TLD Mata',
    color: 'blue',
    content: `TLD (Thermoluminescent Dosimeter) Mata adalah alat pengukur dosis radiasi yang bekerja berdasarkan prinsip thermoluminiscence. Saat dipanaskan, elektron dilepaskan dan memancarkan cahaya (luminesensi) yang intensitasnya sebanding dengan dosis radiasi yang diterima pekerja. TLD mata adalah komponen penting dalam sistem pemantauan dosis personal yang dirancang khusus untuk memantau paparan radiasi pada lensa mata.`,
    features: [
      'Menggunakan kristal thermoluminescent (LiF:Mg,Ti atau LiF:Mg,Cu,P)',
      'Mampu mengukur dosis dari 0.01 mSv hingga 10 Sv',
      'Dapat digunakan berulang kali setelah pembacaan',
      'Respon energi yang baik untuk berbagai jenis radiasi'
    ]
  },
  {
    id: 'fungsi',
    icon: Settings,
    title: 'Fungsi TLD Mata',
    color: 'cyan',
    content: 'TLD mata memiliki beberapa fungsi penting dalam sistem proteksi radiasi:',
    functions: [
      {
        title: 'Pemantauan Dosis Personal',
        desc: 'Mengukur dosis radiasi yang diterima oleh lensa mata pekerja secara individual'
      },
      {
        title: 'Verifikasi Kepatuhan NBD',
        desc: 'Memastikan dosis tidak melebihi nilai batas dosis yang ditetapkan'
      },
      {
        title: 'Evaluasi Kondisi Kerja',
        desc: 'Memberikan data untuk mengevaluasi efektivitas alat pelindung dan prosedur kerja'
      },
      {
        title: 'Dokumentasi Legal',
        desc: 'Menyediakan catatan dosis resmi untuk keperluan regulasi dan medikolegal'
      }
    ]
  },
  {
    id: 'manfaat',
    icon: Heart,
    title: 'Manfaat Penggunaan',
    color: 'green',
    content: 'Penggunaan TLD mata memberikan berbagai manfaat:',
    benefits: [
      {
        title: 'Proteksi Kesehatan',
        desc: 'Mencegah paparan berlebih yang dapat menyebabkan katarak radiasi',
        icon: '🛡️'
      },
      {
        title: 'Ketenangan Kerja',
        desc: 'Memberikan kepastian bahwa paparan dalam batas aman',
        icon: '😌'
      },
      {
        title: 'Data Akurat',
        desc: 'Pengukuran lebih tepat dibanding estimasi dari TLD badan',
        icon: '📊'
      },
      {
        title: 'Deteksi Dini',
        desc: 'Mendeteksi peningkatan paparan sebelum mencapai batas berbahaya',
        icon: '⚠️'
      }
    ]
  }
];

export default function PeranTLDSection() {
  const [openAccordion, setOpenAccordion] = useState('pengertian');

  return (
    <section id="tld" className="py-20 md:py-32 bg-gradient-to-b from-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-cyan-100 text-cyan-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Eye className="w-4 h-4" />
            <span>Alat Pemantauan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Peran{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              TLD Mata
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            TLD mata adalah komponen penting dalam sistem pemantauan dosis personal 
            untuk melindungi lensa mata dari paparan radiasi berlebih.
          </p>
        </AnimatedSection>

        {/* TLD Visual
        <AnimatedSection className="mb-16" delay={0.2}>
          <div className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* TLD Illustration }
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-8 relative overflow-hidden">
                  {/* Simplified TLD representation }
                  <div className="flex justify-center items-center">
                    <motion.div
                      className="relative"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {/* TLD Badge representation }
                      <div className="w-32 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center relative">
                        <div className="absolute inset-2 border-2 border-dashed border-cyan-300 rounded-lg" />
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse" />
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-300 rounded-full" />
                      </div>
                      
                      {/* Radiation waves }
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400/30 rounded-full"
                          style={{ width: 60 + i * 30, height: 60 + i * 30 }}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Labels }
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-cyan-700">
                    <span>Kristal TLD</span>
                    <span>Deteksi Radiasi</span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Info }
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-gray-900">
                  Bagaimana TLD Bekerja?
                </h3>
                <div className="space-y-4">
                  {[
                    { step: 1, text: 'Kristal TLD menyerap energi radiasi' },
                    { step: 2, text: 'Elektron tereksitasi dan terperangkap' },
                    { step: 3, text: 'Saat dipanaskan, elektron melepas cahaya' },
                    { step: 4, text: 'Intensitas cahaya diukur sebagai dosis' }
                  ].map((item) => (
                    <motion.div
                      key={item.step}
                      className="flex items-center space-x-4"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: item.step * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <span className="text-gray-700">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection> */}

        {/* Accordion Content */}
        <div className="space-y-4">
          {tldContent.map((item, index) => (
            <AnimatedSection key={item.id} delay={0.3 + index * 0.1}>
              <motion.div
                className="glass-card overflow-hidden"
                layout
              >
                {/* Accordion Header */}
                <motion.button
                  className={`w-full p-6 flex items-center justify-between transition-colors ${
                    openAccordion === item.id 
                      ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white` 
                      : 'bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      openAccordion === item.id 
                        ? 'bg-white/20' 
                        : `bg-${item.color}-100`
                    }`}>
                      <item.icon className={`w-6 h-6 ${
                        openAccordion === item.id 
                          ? 'text-white' 
                          : `text-${item.color}-600`
                      }`} />
                    </div>
                    <h3 className={`text-lg font-bold ${
                      openAccordion === item.id ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openAccordion === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`w-6 h-6 ${
                      openAccordion === item.id ? 'text-white' : 'text-gray-400'
                    }`} />
                  </motion.div>
                </motion.button>

                {/* Accordion Content */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openAccordion === item.id ? 'auto' : 0,
                    opacity: openAccordion === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-gray-50">
                    <p className="text-gray-700 mb-6">{item.content}</p>

                    {/* Pengertian Content */}
                    {item.id === 'pengertian' && item.features && (
                      <div className="grid sm:grid-cols-2 gap-3">
                        {item.features.map((feature, i) => (
                          <div key={i} className="flex items-start space-x-2 p-3 bg-white rounded-lg">
                            <span className="text-blue-500 mt-1">•</span>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Fungsi Content */}
                    {item.id === 'fungsi' && item.functions && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {item.functions.map((func, i) => (
                          <motion.div
                            key={i}
                            className="p-4 bg-white rounded-xl border-l-4 border-cyan-500"
                            whileHover={{ x: 5 }}
                          >
                            <h4 className="font-bold text-gray-900 mb-1">{func.title}</h4>
                            <p className="text-sm text-gray-600">{func.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Manfaat Content */}
                    {item.id === 'manfaat' && item.benefits && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {item.benefits.map((benefit, i) => (
                          <motion.div
                            key={i}
                            className="p-4 bg-white rounded-xl flex items-start space-x-3"
                            whileHover={{ scale: 1.02 }}
                          >
                            <span className="text-2xl">{benefit.icon}</span>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                              <p className="text-sm text-gray-600">{benefit.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}