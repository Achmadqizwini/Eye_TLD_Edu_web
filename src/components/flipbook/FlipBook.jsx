import { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home,
  X,
  BookOpen,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ==================== PAGE COMPONENTS ====================

// Cover Page
const CoverPage = ({ height }) => (
  <div 
    className="w-full bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
    style={{ height }}
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%">
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>

    {/* Radiation symbol animation */}
    <div className="absolute top-8 right-8 opacity-20">
      <motion.svg viewBox="0 0 60 60" className="w-16 h-16" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        <circle cx="30" cy="30" r="8" fill="white"/>
        {[0, 120, 240].map((angle, i) => (
          <path key={i} d="M30 30 L22 8 A25 25 0 0 1 38 8 Z" fill="white" transform={`rotate(${angle} 30 30)`}/>
        ))}
      </motion.svg>
    </div>
    
    {/* Eye Illustration */}
    <motion.div
      className="relative mb-6"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <svg viewBox="0 0 140 140" className="w-32 h-32 sm:w-36 sm:h-36">
        {/* Outer glow rings */}
        <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
        <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        {/* Main eye glow */}
        <circle cx="70" cy="70" r="50" fill="rgba(255,255,255,0.1)"/>
        {/* Eye white */}
        <ellipse cx="70" cy="70" rx="42" ry="28" fill="white"/>
        {/* Iris gradient */}
        <defs>
          <radialGradient id="irisGrad" cx="40%" cy="40%">
            <stop offset="0%" stopColor="#5eead4"/>
            <stop offset="100%" stopColor="#0d9488"/>
          </radialGradient>
        </defs>
        <circle cx="70" cy="70" r="20" fill="url(#irisGrad)"/>
        {/* Pupil */}
        <circle cx="70" cy="70" r="9" fill="#134e4a"/>
        {/* Highlight */}
        <circle cx="63" cy="63" r="4" fill="rgba(255,255,255,0.9)"/>
        <circle cx="75" cy="75" r="2" fill="rgba(255,255,255,0.5)"/>
        {/* Animated radiation ring */}
        <circle cx="70" cy="70" r="35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="8,4">
          <animateTransform attributeName="transform" type="rotate" from="0 70 70" to="360 70 70" dur="10s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </motion.div>
    
    {/* Title */}
    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
      Proteksi Radiasi
    </h1>
    <h2 className="text-xl sm:text-2xl font-bold text-emerald-200 mb-4">
      Lensa Mata
    </h2>
    
    {/* Subtitle */}
    <div className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full mb-4">
      <p className="text-white text-sm font-medium">
        📚 Panduan Penggunaan TLD Mata
      </p>
    </div>

    {/* Additional info */}
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {['Pekerja Radiasi', 'Rumah Sakit', 'Industri'].map((tag, i) => (
        <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-white/80 text-xs">
          {tag}
        </span>
      ))}
    </div>
    
    {/* Swipe hint */}
    <motion.div 
      className="absolute bottom-6 flex items-center space-x-2 text-white/70 text-sm"
      animate={{ x: [0, 10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      <span>Geser untuk mulai</span>
      <ChevronRight className="w-4 h-4" />
    </motion.div>
  </div>
);

// Table of Contents Page
const TOCPage = ({ height }) => (
  <div 
    className="w-full bg-gradient-to-br from-white to-slate-50 p-5 flex flex-col"
    style={{ height }}
  >
    {/* Header */}
    <div className="flex items-center space-x-3 border-b-2 border-emerald-500 pb-3 mb-4">
      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
        <BookOpen className="w-5 h-5 text-emerald-600" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">Daftar Isi</h2>
        <p className="text-xs text-slate-500">14 Halaman Materi</p>
      </div>
    </div>
    
    {/* TOC Items */}
    <div className="flex-1 space-y-2 overflow-auto">
      {[
        { num: '01', title: 'Mengapa Mata Perlu Dilindungi?', pages: '3-4' },
        { num: '02', title: 'Anatomi Lensa Mata', pages: '5' },
        { num: '03', title: 'Efek Stokastik Radiasi', pages: '6' },
        { num: '04', title: 'Efek Deterministik Radiasi', pages: '7' },
        { num: '05', title: 'Nilai Batas Dosis (NBD)', pages: '8' },
        { num: '06', title: 'Apa itu TLD Mata?', pages: '9' },
        { num: '07', title: 'Cara Kerja TLD', pages: '10' },
        { num: '08', title: 'Panduan Penggunaan TLD', pages: '11' },
        { num: '09', title: 'Yang Harus Dihindari', pages: '12' },
        { num: '10', title: 'Ringkasan & Tips', pages: '13' },
      ].map((item, i) => (
        <div key={i} className="flex items-center space-x-2 group">
          <span className="text-lg font-bold text-emerald-500 w-8">{item.num}</span>
          <span className="text-slate-700 text-sm flex-1">{item.title}</span>
          <div className="flex-1 border-b border-dotted border-slate-300 mx-1" />
          <span className="text-slate-400 text-xs">{item.pages}</span>
        </div>
      ))}
    </div>
    
    {/* Footer note */}
    <div className="mt-3 pt-3 border-t border-slate-200">
      <p className="text-xs text-slate-500 text-center italic">
        "Keselamatan adalah prioritas utama dalam bekerja dengan radiasi"
      </p>
    </div>

    <div className="text-right text-slate-400 text-xs mt-2">2</div>
  </div>
);

// Mengapa Mata Perlu Dilindungi - Page 1
const WhyProtect1Page = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">Bab 1</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Mengapa Mata Perlu Dilindungi?</h2>
      
      {/* Illustration */}
      <div className="flex justify-center mb-3">
        <svg viewBox="0 0 200 100" className="w-44 h-auto">
          {/* Eye */}
          <ellipse cx="100" cy="50" rx="55" ry="32" fill="#fee2e2" stroke="#ef4444" strokeWidth="2"/>
          <ellipse cx="100" cy="50" rx="40" ry="24" fill="white" stroke="#fca5a5" strokeWidth="1"/>
          <circle cx="100" cy="50" r="16" fill="#fca5a5"/>
          <circle cx="100" cy="50" r="8" fill="#ef4444"/>
          <circle cx="95" cy="45" r="3" fill="white"/>
          {/* Radiation waves hitting eye */}
          {[0, 15, 30, -15, -30].map((angle, i) => (
            <g key={i}>
              <line 
                x1={20 + i * 3} y1={30 + Math.abs(angle/2)} 
                x2={45} y2={50} 
                stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.6"
              />
              <circle cx={20 + i * 3} cy={30 + Math.abs(angle/2)} r="2" fill="#ef4444" opacity="0.6"/>
            </g>
          ))}
          {/* Warning sign */}
          <g transform="translate(155, 25)">
            <polygon points="15,0 30,26 0,26" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1"/>
            <text x="15" y="20" fontSize="14" fill="#78350f" textAnchor="middle" fontWeight="bold">!</text>
          </g>
        </svg>
      </div>
      
      {/* Key Facts */}
      <div className="bg-red-50 rounded-xl p-3 mb-3">
        <p className="font-bold text-red-800 text-sm mb-2">⚠️ Fakta Penting:</p>
        <ul className="space-y-1.5">
          {[
            'Lensa mata adalah organ PALING SENSITIF terhadap radiasi',
            'Sel lensa TIDAK DAPAT beregenerasi seperti sel lain',
            'Kerusakan bersifat KUMULATIF dan PERMANEN',
            'Efek bisa muncul 5-20 TAHUN kemudian',
          ].map((item, i) => (
            <li key={i} className="flex items-start space-x-2 text-xs text-red-700">
              <span className="text-red-500 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-2xl font-bold text-red-500">20%</p>
          <p className="text-xs text-slate-600">Pekerja radiasi berisiko katarak</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2 text-center">
          <p className="text-2xl font-bold text-red-500">5-20</p>
          <p className="text-xs text-slate-600">Tahun masa laten efek radiasi</p>
        </div>
      </div>

      {/* Who is at risk */}
      <div className="bg-amber-50 rounded-lg p-2">
        <p className="font-semibold text-amber-800 text-xs mb-1">👥 Siapa yang Berisiko?</p>
        <div className="flex flex-wrap gap-1">
          {['Radiolog', 'Kardiolog Intervensi', 'Teknisi Radiologi', 'Perawat Cath Lab', 'Dokter Bedah'].map((role, i) => (
            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs text-amber-700">{role}</span>
          ))}
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">3</span>
    </div>
  </div>
);

// Mengapa Mata Perlu Dilindungi - Page 2
const WhyProtect2Page = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">Bab 1 (Lanjutan)</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Proses Kerusakan Lensa</h2>
      
      {/* Process diagram */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3 mb-3">
        <div className="space-y-2">
          {[
            { step: 1, title: 'Paparan Radiasi', desc: 'Radiasi pengion mengenai lensa mata', icon: '☢️' },
            { step: 2, title: 'Kerusakan Sel', desc: 'DNA sel lensa mengalami kerusakan', icon: '🧬' },
            { step: 3, title: 'Akumulasi', desc: 'Kerusakan menumpuk seiring waktu', icon: '📈' },
            { step: 4, title: 'Katarak', desc: 'Lensa menjadi keruh (katarak radiasi)', icon: '👁️' },
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm text-sm">
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 text-xs">{item.title}</p>
                <p className="text-slate-600 text-xs">{item.desc}</p>
              </div>
              {i < 3 && <span className="text-red-400">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: Protected vs Not Protected */}
      <p className="font-semibold text-slate-700 text-sm mb-2">Perbandingan:</p>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-green-50 rounded-lg p-2 border border-green-200">
          <p className="font-bold text-green-700 text-xs text-center mb-1">✅ Dilindungi</p>
          <ul className="text-xs text-green-600 space-y-0.5">
            <li>• Dosis terpantau</li>
            <li>• Risiko minimal</li>
            <li>• Mata tetap sehat</li>
          </ul>
        </div>
        <div className="bg-red-50 rounded-lg p-2 border border-red-200">
          <p className="font-bold text-red-700 text-xs text-center mb-1">❌ Tidak Dilindungi</p>
          <ul className="text-xs text-red-600 space-y-0.5">
            <li>• Dosis tidak diketahui</li>
            <li>• Risiko tinggi</li>
            <li>• Potensi katarak</li>
          </ul>
        </div>
      </div>

      {/* Warning box */}
      <div className="bg-red-100 border-l-4 border-red-500 rounded-r-lg p-2">
        <p className="text-red-800 text-xs">
          <strong>⚠️ Peringatan:</strong> Katarak radiasi TIDAK DAPAT disembuhkan dengan obat. 
          Satu-satunya pengobatan adalah OPERASI penggantian lensa.
        </p>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">4</span>
    </div>
  </div>
);

// Anatomi Mata Page
const AnatomyPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Bab 2</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Anatomi Lensa Mata</h2>
      
      {/* Eye anatomy illustration */}
      <div className="flex justify-center mb-3">
        <svg viewBox="0 0 220 120" className="w-full max-w-[200px] h-auto">
          {/* Eyeball cross section */}
          <ellipse cx="110" cy="60" rx="80" ry="50" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth="2"/>
          
          {/* Cornea */}
          <path d="M 30 60 Q 30 30 60 30 Q 90 30 90 60 Q 90 90 60 90 Q 30 90 30 60" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5"/>
          <text x="60" y="105" fontSize="7" fill="#0369a1" textAnchor="middle">Kornea</text>
          
          {/* Lens - highlighted */}
          <ellipse cx="85" cy="60" rx="15" ry="25" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
          <text x="85" y="95" fontSize="7" fill="#d97706" textAnchor="middle" fontWeight="bold">LENSA</text>
          
          {/* Iris */}
          <ellipse cx="65" cy="60" rx="8" ry="18" fill="#6366f1" opacity="0.7"/>
          <text x="50" y="45" fontSize="6" fill="#4f46e5">Iris</text>
          
          {/* Pupil */}
          <ellipse cx="65" cy="60" rx="4" ry="10" fill="#1e1b4b"/>
          
          {/* Retina */}
          <path d="M 100 25 Q 180 25 185 60 Q 180 95 100 95" fill="none" stroke="#ef4444" strokeWidth="2"/>
          <text x="165" y="35" fontSize="6" fill="#dc2626">Retina</text>
          
          {/* Optic nerve */}
          <ellipse cx="190" cy="60" rx="8" ry="12" fill="#fda4af"/>
          <text x="200" y="75" fontSize="5" fill="#be123c">Saraf</text>
          
          {/* Radiation arrow pointing to lens */}
          <g>
            <path d="M 10 60 L 65 60" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
            <text x="5" y="50" fontSize="6" fill="#ef4444">Radiasi</text>
          </g>
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#ef4444"/>
            </marker>
          </defs>
        </svg>
      </div>
      
      {/* Lens information */}
      <div className="bg-amber-50 rounded-xl p-3 mb-3">
        <p className="font-bold text-amber-800 text-sm mb-2">🔍 Tentang Lensa Mata:</p>
        <ul className="space-y-1 text-xs text-amber-700">
          <li>• Terletak di belakang iris dan pupil</li>
          <li>• Berfungsi memfokuskan cahaya ke retina</li>
          <li>• Terdiri dari sel-sel khusus yang TRANSPARAN</li>
          <li>• Tidak memiliki pembuluh darah</li>
          <li>• Sel lensa TIDAK DAPAT membelah/regenerasi</li>
        </ul>
      </div>

      {/* Why lens is vulnerable */}
      <div className="bg-blue-50 rounded-lg p-2">
        <p className="font-semibold text-blue-800 text-xs mb-1">💡 Mengapa Lensa Rentan?</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-blue-700">
          <div className="bg-white rounded p-1">Posisi di depan mata</div>
          <div className="bg-white rounded p-1">Tidak ada pelindung alami</div>
          <div className="bg-white rounded p-1">Sel tidak regenerasi</div>
          <div className="bg-white rounded p-1">Sensitif terhadap radiasi</div>
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">5</span>
    </div>
  </div>
);

// Efek Stokastik Page
const StokastikPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">Bab 3</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Efek Stokastik Radiasi</h2>
      
      {/* Illustration */}
      <div className="flex justify-center mb-3">
        <svg viewBox="0 0 200 70" className="w-44 h-auto">
          {/* X-axis */}
          <line x1="20" y1="55" x2="180" y2="55" stroke="#94a3b8" strokeWidth="1"/>
          <text x="100" y="68" fontSize="7" fill="#64748b" textAnchor="middle">Dosis Radiasi →</text>
          
          {/* Y-axis */}
          <line x1="20" y1="55" x2="20" y2="10" stroke="#94a3b8" strokeWidth="1"/>
          <text x="10" y="35" fontSize="6" fill="#64748b" transform="rotate(-90, 10, 35)">Probabilitas</text>
          
          {/* Linear curve - no threshold */}
          <path d="M 20 55 L 170 15" fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
          
          {/* Random dots showing stochastic nature */}
          {[[40,48], [60,42], [50,45], [80,38], [90,32], [100,35], [120,28], [130,22], [150,20], [160,18]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r="3" fill="#fbbf24" opacity="0.7"/>
          ))}
          
          {/* Label */}
          <text x="140" y="10" fontSize="7" fill="#d97706" fontWeight="bold">Tidak ada threshold!</text>
        </svg>
      </div>
      
      {/* Definition */}
      <div className="bg-amber-100 rounded-xl p-3 mb-3">
        <p className="font-bold text-amber-800 text-sm">📖 Definisi:</p>
        <p className="text-amber-700 text-xs mt-1">
          Efek stokastik adalah efek radiasi yang terjadi secara <strong>ACAK</strong>, 
          dimana <strong>TIDAK ADA</strong> nilai ambang batas dosis yang aman.
        </p>
      </div>

      {/* Characteristics */}
      <div className="space-y-1.5 mb-3">
        <p className="font-semibold text-slate-700 text-xs">Karakteristik Utama:</p>
        {[
          { title: 'Tanpa Ambang Batas', desc: 'Dosis sekecil apapun tetap berisiko', color: 'amber' },
          { title: 'Probabilitas ↑', desc: 'Makin tinggi dosis, makin besar kemungkinan', color: 'orange' },
          { title: 'Keparahan Tetap', desc: 'Jika terjadi, tingkat keparahan sama', color: 'red' },
        ].map((item, i) => (
          <div key={i} className={`flex items-center space-x-2 bg-${item.color}-50 p-2 rounded-lg`}>
            <span className={`w-5 h-5 bg-${item.color}-500 text-white rounded-full flex items-center justify-center text-xs font-bold`}>{i+1}</span>
            <div>
              <p className="font-bold text-slate-800 text-xs">{item.title}</p>
              <p className="text-slate-600 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Examples */}
      <div className="bg-slate-50 rounded-lg p-2">
        <p className="font-semibold text-slate-700 text-xs mb-1">📌 Contoh Efek Stokastik pada Mata:</p>
        <div className="flex flex-wrap gap-1">
          {['Katarak Radiasi', 'Kerusakan DNA', 'Mutasi Sel', 'Kanker (jarang)'].map((ex, i) => (
            <span key={i} className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs">{ex}</span>
          ))}
        </div>
      </div>
</div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">6</span>
    </div>
  </div>
);

// Efek Deterministik Page
const DeterministikPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">Bab 4</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Efek Deterministik Radiasi</h2>
      
      {/* Illustration */}
      <div className="flex justify-center mb-3">
        <svg viewBox="0 0 200 70" className="w-44 h-auto">
          {/* X-axis */}
          <line x1="20" y1="55" x2="180" y2="55" stroke="#94a3b8" strokeWidth="1"/>
          <text x="100" y="68" fontSize="7" fill="#64748b" textAnchor="middle">Dosis Radiasi →</text>
          
          {/* Y-axis */}
          <line x1="20" y1="55" x2="20" y2="10" stroke="#94a3b8" strokeWidth="1"/>
          <text x="10" y="35" fontSize="6" fill="#64748b" transform="rotate(-90, 10, 35)">Keparahan</text>
          
          {/* Threshold line */}
          <line x1="70" y1="55" x2="70" y2="10" stroke="#a855f7" strokeWidth="1" strokeDasharray="4,2"/>
          <text x="70" y="62" fontSize="6" fill="#a855f7" textAnchor="middle">Threshold</text>
          
          {/* Curve - flat then rising */}
          <path d="M 20 55 L 70 55 Q 85 55 100 40 L 170 10" fill="none" stroke="#a855f7" strokeWidth="2.5"/>
          
          {/* Safe zone */}
          <rect x="20" y="10" width="50" height="45" fill="#22c55e" opacity="0.1"/>
          <text x="45" y="25" fontSize="6" fill="#16a34a" textAnchor="middle">AMAN</text>
          
          {/* Danger zone */}
          <rect x="70" y="10" width="110" height="45" fill="#ef4444" opacity="0.1"/>
          <text x="130" y="25" fontSize="6" fill="#dc2626" textAnchor="middle">BAHAYA</text>
        </svg>
      </div>
      
      {/* Definition */}
      <div className="bg-purple-100 rounded-xl p-3 mb-3">
        <p className="font-bold text-purple-800 text-sm">📖 Definisi:</p>
        <p className="text-purple-700 text-xs mt-1">
          Efek deterministik adalah efek radiasi yang <strong>PASTI TERJADI</strong> jika 
          dosis melebihi nilai ambang batas tertentu. Keparahan <strong>MENINGKAT</strong> seiring dosis.
        </p>
      </div>

      {/* Characteristics */}
      <div className="space-y-1.5 mb-3">
        <p className="font-semibold text-slate-700 text-xs">Karakteristik Utama:</p>
        {[
          { title: 'Ada Ambang Batas', desc: 'Di bawah threshold = aman', color: 'bg-purple-50' },
          { title: 'Keparahan ↑ dengan Dosis', desc: 'Makin tinggi dosis, makin parah', color: 'bg-pink-50' },
          { title: 'Waktu Timbul Bervariasi', desc: 'Tergantung besarnya dosis', color: 'bg-fuchsia-50' },
        ].map((item, i) => (
          <div key={i} className={`flex items-center space-x-2 ${item.color} p-2 rounded-lg`}>
            <span className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{i+1}</span>
            <div>
              <p className="font-bold text-slate-800 text-xs">{item.title}</p>
              <p className="text-slate-600 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Examples with threshold */}
      <div className="bg-slate-50 rounded-lg p-2">
        <p className="font-semibold text-slate-700 text-xs mb-1">📌 Contoh & Ambang Batas:</p>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between bg-white p-1.5 rounded">
            <span className="text-slate-700">Kekeruhan lensa minor</span>
            <span className="text-purple-600 font-mono font-bold">~500 mSv</span>
          </div>
          <div className="flex justify-between bg-white p-1.5 rounded">
            <span className="text-slate-700">Katarak yang terdeteksi</span>
            <span className="text-purple-600 font-mono font-bold">~2000 mSv</span>
          </div>
          <div className="flex justify-between bg-white p-1.5 rounded">
            <span className="text-slate-700">Katarak yang mengganggu</span>
            <span className="text-purple-600 font-mono font-bold">~5000 mSv</span>
          </div>
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">7</span>
    </div>
  </div>
);

// NBD Page
const NBDPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Bab 5</p>
      <h2 className="text-lg font-bold text-slate-800 mb-2">Nilai Batas Dosis (NBD)</h2>
      
      {/* Definition */}
      <div className="bg-blue-50 rounded-lg p-2 mb-3">
        <p className="text-blue-800 text-xs">
          <strong>NBD</strong> adalah batas dosis maksimum yang diizinkan untuk pekerja radiasi 
          guna mencegah efek deterministik dan meminimalkan risiko efek stokastik.
        </p>
      </div>
      
      {/* Table */}
      <div className="rounded-xl overflow-hidden border border-blue-200 mb-3">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <th className="px-2 py-1.5 text-left">Organ/Jaringan</th>
              <th className="px-2 py-1.5 text-right">NBD/Tahun</th>
            </tr>
          </thead>
          <tbody>
            {[
              { organ: 'Seluruh Tubuh (efektif)', limit: '20 mSv', hl: false },
              { organ: '👁️ Lensa Mata', limit: '20 mSv', hl: true },
              { organ: 'Kulit (rata-rata)', limit: '500 mSv', hl: false },
              { organ: 'Tangan dan Kaki', limit: '500 mSv', hl: false },
              { organ: 'Masyarakat Umum', limit: '1 mSv', hl: false },
            ].map((row, i) => (
              <tr key={i} className={row.hl ? 'bg-blue-100' : (i % 2 === 0 ? 'bg-white' : 'bg-slate-50')}>
                <td className={`px-2 py-1.5 ${row.hl ? 'font-bold text-blue-700' : 'text-slate-700'}`}>{row.organ}</td>
                <td className={`px-2 py-1.5 text-right font-mono ${row.hl ? 'font-bold text-blue-700' : ''}`}>{row.limit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Important change */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2 mb-3">
        <p className="font-bold text-amber-800 text-xs mb-1">⚠️ Perubahan Penting!</p>
        <p className="text-amber-700 text-xs">
          ICRP 2011 menurunkan batas lensa mata dari <strong className="line-through">150 mSv</strong> menjadi <strong>20 mSv/tahun</strong> 
          (rata-rata 5 tahun, maksimum 50 mSv dalam 1 tahun).
        </p>
      </div>

      {/* Why the change */}
      <div className="bg-slate-50 rounded-lg p-2 mb-2">
        <p className="font-semibold text-slate-700 text-xs mb-1">📊 Mengapa Diperketat?</p>
        <ul className="text-xs text-slate-600 space-y-0.5">
          <li>• Penelitian terbaru: katarak terjadi pada dosis lebih rendah</li>
          <li>• Studi epidemiologi pada korban Chernobyl & pekerja radiasi</li>
          <li>• Lensa mata lebih sensitif dari perkiraan sebelumnya</li>
        </ul>
      </div>

      {/* Reference */}
      <div className="bg-indigo-50 rounded-lg p-2">
        <p className="text-indigo-700 text-xs text-center">
          📚 Referensi: ICRP Publication 118 (2012) & Perka BAPETEN
        </p>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">8</span>
    </div>
  </div>
);

// TLD Introduction Page
const TLDIntroPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Bab 6</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Apa itu TLD Mata?</h2>
      
      {/* TLD Illustration */}
      <div className="flex justify-center mb-3">
        <svg viewBox="0 0 160 100" className="w-36 h-auto">
          {/* TLD Badge body */}
          <rect x="25" y="20" width="110" height="60" rx="8" fill="white" stroke="#10b981" strokeWidth="2.5"/>
          
          {/* Inner border dashed */}
          <rect x="33" y="28" width="94" height="44" rx="4" fill="none" stroke="#6ee7b7" strokeWidth="1" strokeDasharray="5,3"/>
          
          {/* Crystal - glowing */}
          <defs>
            <radialGradient id="crystalGlow" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#6ee7b7"/>
              <stop offset="50%" stopColor="#10b981"/>
              <stop offset="100%" stopColor="#047857"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="80" cy="50" r="14" fill="url(#crystalGlow)" filter="url(#glow)"/>
          <circle cx="80" cy="50" r="7" fill="#a7f3d0" opacity="0.5"/>
          
          {/* Clip */}
          <rect x="68" y="8" width="24" height="16" rx="4" fill="#64748b"/>
          <circle cx="80" cy="16" r="4" fill="#94a3b8"/>
          <circle cx="80" cy="16" r="2" fill="#64748b"/>
          
          {/* Label */}
          <rect x="55" y="68" width="50" height="12" rx="2" fill="#f1f5f9"/>
          <text x="80" y="77" fontSize="7" fill="#10b981" textAnchor="middle" fontWeight="bold">TLD-100</text>
          
          {/* ID */}
          <text x="80" y="90" fontSize="5" fill="#94a3b8" textAnchor="middle">ID: 2024-001</text>
        </svg>
      </div>
      
      {/* Definition */}
      <div className="bg-emerald-100 rounded-xl p-3 mb-3">
        <p className="font-bold text-emerald-800 text-sm">TLD = Thermoluminescent Dosimeter</p>
        <p className="text-emerald-700 text-xs mt-1">
          Alat pengukur dosis radiasi yang dirancang <strong>khusus</strong> untuk memantau 
          paparan radiasi pada <strong>lensa mata</strong> pekerja radiasi.
        </p>
      </div>

      {/* Key Features */}
      <p className="font-semibold text-slate-700 text-xs mb-2">🔧 Komponen Utama:</p>
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {[
          { icon: '💎', title: 'Kristal TL', desc: 'LiF:Mg,Ti atau LiF:Mg,Cu,P' },
          { icon: '🏷️', title: 'Badge Holder', desc: 'Wadah pelindung kristal' },
          { icon: '📎', title: 'Clip/Penjepit', desc: 'Untuk dipasang di kepala' },
          { icon: '🔢', title: 'Nomor ID', desc: 'Identifikasi unik tiap TLD' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-50 p-2 rounded-lg">
            <div className="flex items-center space-x-1 mb-0.5">
              <span className="text-sm">{item.icon}</span>
              <span className="font-bold text-slate-800 text-xs">{item.title}</span>
            </div>
            <p className="text-slate-600 text-xs">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Advantages */}
      <div className="bg-teal-50 rounded-lg p-2">
        <p className="font-semibold text-teal-700 text-xs mb-1">✅ Keunggulan TLD:</p>
        <div className="flex flex-wrap gap-1">
          {['Akurat', 'Ringan', 'Reusable', 'Pasif', 'Ekonomis'].map((adv, i) => (
            <span key={i} className="bg-white px-2 py-0.5 rounded text-xs text-teal-600">{adv}</span>
          ))}
        </div>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">9</span>
    </div>
  </div>
);

// TLD How it Works Page
const TLDWorkPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Bab 7</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Cara Kerja TLD</h2>
      
      {/* Process Illustration */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 mb-3">
        <p className="font-semibold text-emerald-800 text-xs mb-2">⚡ Prinsip Thermoluminescence:</p>
        <div className="space-y-2">
          {[
            { step: 1, title: 'Paparan Radiasi', desc: 'Radiasi mengenai kristal TLD, elektron tereksitasi', icon: '☢️', color: 'bg-amber-100' },
            { step: 2, title: 'Penyimpanan Energi', desc: 'Elektron terperangkap dalam "electron trap"', icon: '🔋', color: 'bg-blue-100' },
            { step: 3, title: 'Pemanasan', desc: 'TLD dipanaskan di TLD Reader', icon: '🔥', color: 'bg-orange-100' },
            { step: 4, title: 'Emisi Cahaya', desc: 'Elektron lepas, memancarkan cahaya', icon: '💡', color: 'bg-yellow-100' },
            { step: 5, title: 'Pengukuran', desc: 'Intensitas cahaya = dosis radiasi', icon: '📊', color: 'bg-green-100' },
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${item.color} rounded-full flex items-center justify-center text-sm flex-shrink-0`}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-800 text-xs">{item.step}. {item.title}</p>
                <p className="text-slate-600 text-xs truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TLD Specifications */}
      <p className="font-semibold text-slate-700 text-xs mb-2">📋 Spesifikasi TLD Mata:</p>
      <div className="space-y-1 mb-3">
        {[
          { label: 'Rentang Pengukuran', value: '0.01 mSv - 10 Sv' },
          { label: 'Jenis Kristal', value: 'LiF:Mg,Cu,P (TLD-100H)' },
          { label: 'Respon Energi', value: '15 keV - 3 MeV' },
          { label: 'Periode Monitoring', value: '1-3 bulan' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between bg-slate-50 p-1.5 rounded text-xs">
            <span className="text-slate-600">{item.label}</span>
            <span className="text-emerald-700 font-medium">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Important Note */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2">
        <p className="text-amber-800 text-xs">
          <strong>💡 Catatan:</strong> TLD mata berbeda dengan TLD badan. TLD mata harus dipasang 
          <strong> sedekat mungkin dengan mata</strong> untuk pengukuran yang akurat.
        </p>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">10</span>
    </div>
  </div>
);

// Panduan Penggunaan Page
const UsagePage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1">Bab 8</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Panduan Penggunaan TLD</h2>
      
      {/* Steps */}
      <div className="space-y-2 mb-3">
        {[
          { 
            step: 1, 
            title: 'Persiapan', 
            icon: '🔍',
            points: ['Periksa kondisi fisik TLD', 'Pastikan TLD sudah di-reset', 'Catat nomor ID TLD']
          },
          { 
            step: 2, 
            title: 'Pemasangan', 
            icon: '👁️',
            points: ['Pasang di area dekat mata (alis)', 'Gunakan headband atau frame kacamata', 'Kristal menghadap sumber radiasi']
          },
          { 
            step: 3, 
            title: 'Selama Bekerja', 
            icon: '⚕️',
            points: ['Pakai konsisten saat kerja', 'Jangan dilepas selama prosedur', 'Hindari menutupi kristal TLD']
          },
          { 
            step: 4, 
            title: 'Setelah Bekerja', 
            icon: '📦',
            points: ['Simpan di tempat khusus', 'Jauhkan dari sumber radiasi', 'Hindari panas/sinar matahari']
          },
          { 
            step: 5, 
            title: 'Pengembalian', 
            icon: '📊',
            points: ['Kembalikan sesuai jadwal (1-3 bulan)', 'Serahkan ke PPR', 'Ambil TLD pengganti']
          },
        ].map((item) => (
          <div key={item.step} className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-2">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-7 h-7 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                {item.step}
              </div>
              <span className="text-sm">{item.icon}</span>
              <span className="font-bold text-slate-800 text-sm">{item.title}</span>
            </div>
            <ul className="ml-9 space-y-0.5">
              {item.points.map((point, i) => (
                <li key={i} className="text-xs text-slate-600 flex items-start space-x-1">
                  <span className="text-cyan-500">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tip */}
      <div className="bg-emerald-50 rounded-lg p-2">
        <p className="text-emerald-800 text-xs">
          <strong>💡 Tips:</strong> Pasang TLD di sisi mata yang lebih dekat dengan sumber radiasi 
          untuk pengukuran dosis maksimum yang diterima.
        </p>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">11</span>
    </div>
  </div>
);

// Warning Page
const WarningPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-red-500 to-rose-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-red-600 mb-1">Bab 9</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Yang Harus Dihindari</h2>
      
      {/* Don'ts */}
      <div className="space-y-2 mb-3">
        {[
          { 
            title: 'Meminjamkan TLD', 
            desc: 'TLD bersifat personal, data dosis harus akurat untuk setiap individu',
            icon: '🚫'
          },
          { 
            title: 'Membawa saat Rontgen sebagai Pasien', 
            desc: 'Akan memberikan pembacaan dosis palsu yang tidak terkait pekerjaan',
            icon: '🏥'
          },
          { 
            title: 'Menyimpan di Dekat Sumber Radiasi', 
            desc: 'TLD akan mencatat dosis background yang tidak akurat',
            icon: '☢️'
          },
          { 
            title: 'Membuka atau Memodifikasi', 
            desc: 'Dapat merusak kristal dan membuat TLD tidak valid',
            icon: '🔧'
          },
          { 
            title: 'Mengabaikan Jadwal Pengembalian', 
            desc: 'Data dosis bisa hilang, periode pemantauan tidak tercatat',
            icon: '📅'
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start space-x-2 bg-red-50 border border-red-100 p-2 rounded-lg">
            <div className="w-7 h-7 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <X className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-bold text-red-800 text-xs">{item.title}</p>
              <p className="text-red-600 text-xs">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* What to do if... */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2">
        <p className="font-bold text-amber-800 text-xs mb-1">⚠️ Jika TLD Hilang atau Rusak:</p>
        <ol className="text-amber-700 text-xs space-y-0.5 list-decimal list-inside">
          <li>Segera laporkan ke Petugas Proteksi Radiasi (PPR)</li>
          <li>Isi formulir laporan kehilangan/kerusakan</li>
          <li>Minta TLD pengganti</li>
<li>Estimasi dosis akan dilakukan oleh PPR</li>
        </ol>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">12</span>
    </div>
  </div>
);

// Summary & Tips Page
const SummaryPage = ({ height }) => (
  <div className="w-full bg-white flex flex-col" style={{ height }}>
    <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500 flex-shrink-0" />
    
    <div className="flex-1 p-4 flex flex-col overflow-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Bab 10</p>
      <h2 className="text-lg font-bold text-slate-800 mb-3">Ringkasan & Tips</h2>
      
      {/* Key Points Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 mb-3">
        <p className="font-bold text-indigo-800 text-sm mb-2">📝 Poin-Poin Penting:</p>
        <div className="space-y-1.5">
          {[
            { icon: '👁️', text: 'Lensa mata sangat sensitif terhadap radiasi' },
            { icon: '⚠️', text: 'Kerusakan bersifat kumulatif & permanen' },
            { icon: '📊', text: 'NBD lensa mata: 20 mSv/tahun' },
            { icon: '🔬', text: 'TLD mata wajib untuk pekerja radiasi' },
            { icon: '✅', text: 'Konsistensi pemakaian adalah kunci' },
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-2 bg-white p-1.5 rounded-lg">
              <span className="text-sm">{item.icon}</span>
              <span className="text-slate-700 text-xs">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <p className="font-semibold text-slate-700 text-xs mb-2">✨ Tips Praktis:</p>
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {[
          { title: 'Rutin Cek', desc: 'Periksa kondisi TLD tiap hari' },
          { title: 'Posisi Tepat', desc: 'Pasang di area alis/pelipis' },
          { title: 'Simpan Benar', desc: 'Di tempat khusus, jauh dari radiasi' },
          { title: 'Tepat Waktu', desc: 'Kembalikan sesuai jadwal' },
          { title: 'Lapor Segera', desc: 'Jika TLD hilang/rusak' },
          { title: 'Review Hasil', desc: 'Pantau rekam dosis Anda' },
        ].map((tip, i) => (
          <div key={i} className="bg-slate-50 p-2 rounded-lg">
            <p className="font-bold text-indigo-700 text-xs">{tip.title}</p>
            <p className="text-slate-600 text-xs">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div className="bg-emerald-50 rounded-lg p-2 mb-2">
        <p className="font-semibold text-emerald-800 text-xs mb-1">✅ Checklist Harian:</p>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {[
            'TLD dalam kondisi baik',
            'Posisi pemasangan benar',
            'Tidak terhalang benda',
            'Kristal menghadap sumber',
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-1 text-emerald-700">
              <CheckCircle className="w-3 h-3" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-blue-50 rounded-lg p-2">
        <p className="text-blue-800 text-xs text-center">
          <strong>📞 Pertanyaan?</strong> Hubungi Petugas Proteksi Radiasi (PPR) di unit kerja Anda
        </p>
      </div>
    </div>
    
    <div className="absolute bottom-2 right-3 w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
      <span className="text-white text-xs font-bold">13</span>
    </div>
  </div>
);

// Back Cover
const BackCover = ({ height }) => (
  <div 
    className="w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
    style={{ height }}
  >
    {/* Background pattern */}
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%">
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="white"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </div>

    {/* Animated radiation symbol */}
    <div className="absolute top-10 left-10 opacity-10">
      <motion.svg viewBox="0 0 50 50" className="w-12 h-12" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        <circle cx="25" cy="25" r="6" fill="white"/>
        {[0, 120, 240].map((angle, i) => (
          <path key={i} d="M25 25 L18 6 A20 20 0 0 1 32 6 Z" fill="white" transform={`rotate(${angle} 25 25)`}/>
        ))}
      </motion.svg>
    </div>
    
    <div className="relative z-10">
      {/* Shield icon */}
      <motion.div 
        className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      </motion.div>
      
      <h2 className="text-2xl font-bold text-white mb-2">Terima Kasih</h2>
      <p className="text-emerald-300 text-sm mb-4">Lindungi Mata Anda dari Radiasi</p>
      
      {/* Quote */}
      <div className="bg-white/10 backdrop-blur-sm px-5 py-3 rounded-xl mb-6 max-w-xs mx-auto">
        <p className="text-white/90 text-sm italic">
          "Keselamatan bukan sekadar aturan, tapi investasi untuk masa depan Anda"
        </p>
      </div>

      {/* Key message */}
      <div className="space-y-2 mb-6">
        {[
          '✓ Gunakan TLD mata secara konsisten',
          '✓ Patuhi prosedur keselamatan radiasi',
          '✓ Pantau rekam dosis Anda secara berkala',
        ].map((msg, i) => (
          <p key={i} className="text-emerald-200 text-xs">{msg}</p>
        ))}
      </div>

      {/* Logos/Credits area */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-lg">🏥</span>
        </div>
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-lg">☢️</span>
        </div>
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <span className="text-lg">👁️</span>
        </div>
      </div>
    </div>
    
    {/* Footer */}
    <div className="absolute bottom-4 left-0 right-0 text-center">
      <p className="text-slate-500 text-xs">
        © 2024 Edukasi Proteksi Radiasi
      </p>
      <p className="text-slate-600 text-xs mt-1">
        Materi disusun berdasarkan ICRP 118 & Peraturan BAPETEN
      </p>
    </div>
  </div>
);

// ==================== MAIN FLIPBOOK COMPONENT ====================

export default function FlipBook() {
  const navigate = useNavigate();
  const bookRef = useRef(null);
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 350, height: 500 });
  const [isReady, setIsReady] = useState(false);

  // Calculate full screen dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const navHeight = 60;
      const availableHeight = window.innerHeight - navHeight;
      const availableWidth = window.innerWidth;
      const aspectRatio = 0.7;
      
      let width, height;
      
      if (availableWidth * (1/aspectRatio) <= availableHeight) {
        width = availableWidth;
        height = width / aspectRatio;
      } else {
        height = availableHeight;
        width = height * aspectRatio;
      }
      
      width = Math.max(width, 280);
      height = Math.max(height, 400);
      
      setDimensions({ 
        width: Math.floor(width), 
        height: Math.floor(height) 
      });
      setIsReady(true);
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const goToPrevPage = () => bookRef.current?.pageFlip()?.flipPrev();
  const goToNextPage = () => bookRef.current?.pageFlip()?.flipNext();
  const onFlip = (e) => setCurrentPage(e.data);
  const onInit = (e) => setTotalPages(e.data.pageCount);

  // All pages - 14 halaman total
  const pages = [
    { id: 'cover', component: CoverPage },
    { id: 'toc', component: TOCPage },
    { id: 'why1', component: WhyProtect1Page },
    { id: 'why2', component: WhyProtect2Page },
    { id: 'anatomy', component: AnatomyPage },
    { id: 'stokastik', component: StokastikPage },
    { id: 'deterministik', component: DeterministikPage },
    { id: 'nbd', component: NBDPage },
    { id: 'tld-intro', component: TLDIntroPage },
    { id: 'tld-work', component: TLDWorkPage },
    { id: 'usage', component: UsagePage },
    { id: 'warning', component: WarningPage },
    { id: 'summary', component: SummaryPage },
    { id: 'back', component: BackCover },
  ];

  if (!isReady) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Memuat flipbook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flipbook-container bg-slate-900 flex flex-col">
      
      {/* Home Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-3 left-3 z-50 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        whileTap={{ scale: 0.9 }}
      >
        <Home className="w-5 h-5" />
      </motion.button>

      {/* Page Title Indicator */}
      <div className="absolute top-3 right-3 z-50 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <span className="text-white/80 text-xs font-medium">
          {currentPage + 1} / {totalPages}
        </span>
      </div>

      {/* Flipbook Container */}
      <div 
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden"
      >
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={280}
          maxWidth={dimensions.width}
          minHeight={400}
          maxHeight={dimensions.height}
          showCover={true}
          mobileScrollSupport={false}
          onFlip={onFlip}
          onInit={onInit}
          className="shadow-2xl"
          startPage={0}
          drawShadow={true}
          flippingTime={600}
          usePortrait={true}
          startZIndex={0}
          autoSize={false}
          maxShadowOpacity={0.5}
          showPageCorners={true}
          disableFlipByClick={false}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
        >
          {pages.map((page) => {
            const PageComponent = page.component;
            return (
              <div key={page.id} className="overflow-hidden bg-white">
                <PageComponent height={dimensions.height} />
              </div>
            );
          })}
        </HTMLFlipBook>
      </div>

      {/* Bottom Navigation */}
      <div className="flex-shrink-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 px-4 py-3 safe-area-bottom">
        <div className="flex items-center justify-between max-w-md mx-auto">
          
          {/* Prev Button */}
          <motion.button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentPage === 0 
                ? 'bg-white/5 text-white/20' 
                : 'bg-white/10 text-white active:bg-white/20'
            }`}
            whileTap={currentPage !== 0 ? { scale: 0.9 } : {}}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Page Indicator */}
          <div className="flex flex-col items-center">
            <div className="flex space-x-0.5 mb-1">
              {pages.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentPage 
                      ? 'w-4 bg-emerald-400' 
                      : 'w-1 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/50 text-xs">
              Halaman {currentPage + 1}
            </span>
          </div>

          {/* Next Button */}
          <motion.button
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              currentPage >= totalPages - 1 
                ? 'bg-white/5 text-white/20' 
                : 'bg-emerald-500 text-white active:bg-emerald-400'
            }`}
            whileTap={currentPage < totalPages - 1 ? { scale: 0.9 } : {}}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* First time hint */}
      <AnimatePresence>
        {currentPage === 0 && (
          <motion.div
            className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-none"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-xs flex items-center space-x-2"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <span>👆</span>
              <span>Geser atau tap sudut untuk membalik</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}