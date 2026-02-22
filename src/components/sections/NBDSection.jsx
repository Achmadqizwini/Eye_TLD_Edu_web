  
// src/components/sections/NBDSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { Info, ChevronRight, AlertCircle, CheckCircle, Target } from 'lucide-react';

const nbdData = {
  pengertian: {
    title: 'Pengertian NBD',
    icon: Info,
    content: `NBD (Nilai Batas Dosis) adalah batas dosis radiasi yang ditetapkan oleh badan regulasi untuk melindungi pekerja radiasi dari efek berbahaya radiasi pengion. NBD bukan ambang batas aman, melainkan batas risiko yang dapat diterima.`,
    keyPoints: [
      'Ditetapkan berdasarkan rekomendasi ICRP',
      'Diatur dalam Peraturan Pemerintah RI',
      'Berlaku untuk pekerja radiasi dan masyarakat umum',
      'Ditinjau dan diperbarui secara berkala'
    ]
  },
  batas: {
    title: 'Batas NBD',
    icon: Target,
    content: 'Berikut adalah nilai batas dosis untuk berbagai organ dan kelompok berdasarkan regulasi terkini:',
    limits: [
      { organ: 'Seluruh Tubuh (Efektif)', pekerja: '20 mSv/tahun*', masyarakat: '1 mSv/tahun' },
      { organ: 'Lensa Mata', pekerja: '20 mSv/tahun*', masyarakat: '15 mSv/tahun' },
      { organ: 'Kulit', pekerja: '500 mSv/tahun', masyarakat: '50 mSv/tahun' },
      { organ: 'Tangan & Kaki', pekerja: '500 mSv/tahun', masyarakat: '-' },
    ],
    note: '*Rata-rata selama 5 tahun berturut-turut, tidak boleh melebihi 50 mSv dalam 1 tahun tertentu'
  },
  pentingnya: {
    title: 'Pentingnya Pemantauan Dosis',
    icon: AlertCircle,
    content: 'Pemantauan dosis radiasi secara rutin sangat penting untuk memastikan keselamatan kerja:',
    reasons: [
      {
        title: 'Pencegahan Efek Kesehatan',
        description: 'Mendeteksi dini potensi paparan berlebih sebelum menimbulkan efek kesehatan'
      },
      {
        title: 'Kepatuhan Regulasi',
        description: 'Memenuhi persyaratan hukum dan regulasi keselamatan radiasi'
      },
      {
        title: 'Evaluasi Proteksi',
        description: 'Mengevaluasi efektivitas program proteksi radiasi yang diterapkan'
      },
      {
        title: 'Dokumentasi Riwayat',
        description: 'Menyimpan catatan dosis kumulatif sepanjang karir sebagai pekerja radiasi'
      }
    ]
  }
};

const tabs = [
  { id: 'pengertian', label: 'Pengertian' },
  { id: 'batas', label: 'Batas NBD' },
  { id: 'pentingnya', label: 'Pentingnya' },
];

export default function NBDSection() {
  const [activeTab, setActiveTab] = useState('pengertian');

  return (
    <section id="nbd" className="py-20 md:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            <span>Standar Keselamatan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Nilai Batas Dosis{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              (NBD)
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Memahami NBD adalah langkah penting dalam menjaga keselamatan kerja 
            dan memastikan paparan radiasi tetap dalam batas aman.
          </p>
        </AnimatedSection>

        {/* Tab Navigation */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'pengertian' && (
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-blue-100 rounded-2xl">
                    <Info className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    {nbdData.pengertian.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  {nbdData.pengertian.content}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {nbdData.pengertian.keyPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'batas' && (
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-cyan-100 rounded-2xl">
                    <Target className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    {nbdData.batas.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-8">{nbdData.batas.content}</p>

                {/* Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                        <th className="px-6 py-4 text-left rounded-tl-xl">Organ/Jaringan</th>
                        <th className="px-6 py-4 text-center">Pekerja Radiasi</th>
                        <th className="px-6 py-4 text-center rounded-tr-xl">Masyarakat Umum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nbdData.batas.limits.map((limit, index) => (
                        <motion.tr
                          key={index}
                          className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <td className="px-6 py-4 font-medium text-gray-900">{limit.organ}</td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              limit.organ === 'Lensa Mata' 
                                ? 'bg-yellow-100 text-yellow-700' 
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {limit.pekerja}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              {limit.masyarakat}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                  <p className="text-sm text-yellow-800">
                    <strong>Catatan:</strong> {nbdData.batas.note}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'pentingnya' && (
              <div className="glass-card p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-4 bg-green-100 rounded-2xl">
                    <AlertCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    {nbdData.pentingnya.title}
                  </h3>
                </div>
                <p className="text-gray-700 mb-8">{nbdData.pentingnya.content}</p>

                <div className="grid sm:grid-cols-2 gap-6">
                  {nbdData.pentingnya.reasons.map((reason, index) => (
                    <motion.div
                      key={index}
                      className="group p-6 bg-gradient-to-br from-white to-green-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-gray-900">{reason.title}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{reason.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}