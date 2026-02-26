import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  X,
  BookOpen,
  Eye,
  AlertTriangle,
  Shield,
  Activity,
  CheckCircle,
  Info,
  Zap,
  Target,
  Users,
  FileText,
  HelpCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Page content data
const pages = [
  {
    id: 1,
    type: 'cover',
    title: 'Proteksi Radiasi Lensa Mata',
    subtitle: 'Panduan Lengkap untuk Pekerja Radiasi',
    icon: Eye,
    bgGradient: 'from-blue-600 via-blue-700 to-indigo-800',
  },
  {
    id: 2,
    type: 'content',
    title: 'Mengapa Mata Perlu Dilindungi?',
    icon: AlertTriangle,
    bgGradient: 'from-amber-500 to-orange-600',
    content: [
      {
        subtitle: 'Fakta Penting',
        text: 'Lensa mata adalah salah satu organ paling sensitif terhadap radiasi pengion. Berbeda dengan organ lain, lensa mata memiliki kemampuan regenerasi yang sangat terbatas.'
      },
      {
        subtitle: 'Risiko Utama',
        text: 'Paparan radiasi kumulatif dapat menyebabkan kekeruhan lensa (katarak) yang bersifat permanen dan dapat mengganggu penglihatan secara signifikan.'
      }
    ]
  },
  {
    id: 3,
    type: 'content',
    title: 'Batas Dosis Lensa Mata',
    icon: Target,
    bgGradient: 'from-red-500 to-pink-600',
    content: [
      {
        subtitle: 'Standar ICRP 2011',
        text: 'International Commission on Radiological Protection merekomendasikan batas dosis ekuivalen untuk lensa mata sebesar 20 mSv per tahun, dirata-ratakan selama 5 tahun.'
      },
      {
        subtitle: 'Perubahan Signifikan',
        text: 'Batas ini turun drastis dari rekomendasi sebelumnya yaitu 150 mSv/tahun, berdasarkan bukti ilmiah terbaru tentang sensitivitas lensa mata.'
      }
    ],
    highlight: {
      value: '20 mSv/tahun',
      label: 'Batas Dosis Baru'
    }
  },
  {
    id: 4,
    type: 'content',
    title: 'Apa itu NBD?',
    icon: Info,
    bgGradient: 'from-cyan-500 to-blue-600',
    content: [
      {
        subtitle: 'Nilai Batas Dosis',
        text: 'NBD adalah batas dosis efektif atau dosis ekuivalen bagi individu yang tidak boleh dilampaui dalam periode waktu tertentu sesuai ketentuan peraturan.'
      },
      {
        subtitle: 'Tujuan NBD',
        text: 'NBD bertujuan untuk memastikan bahwa paparan radiasi yang diterima pekerja tetap pada tingkat yang aman dan tidak menimbulkan efek deterministik.'
      }
    ]
  },
  {
    id: 5,
    type: 'content',
    title: 'NBD untuk Pekerja Radiasi',
    icon: Users,
    bgGradient: 'from-green-500 to-emerald-600',
    content: [
      {
        subtitle: 'Dosis Efektif',
        text: '20 mSv per tahun dirata-ratakan selama 5 tahun berturut-turut (100 mSv dalam 5 tahun), dengan syarat tidak melebihi 50 mSv dalam satu tahun tertentu.'
      },
      {
        subtitle: 'Dosis Ekuivalen Lensa Mata',
        text: '20 mSv per tahun dirata-ratakan selama 5 tahun berturut-turut, tidak melebihi 50 mSv dalam satu tahun tertentu.'
      }
    ],
    table: [
      { organ: 'Seluruh Tubuh', limit: '20 mSv/tahun*' },
      { organ: 'Lensa Mata', limit: '20 mSv/tahun*' },
      { organ: 'Kulit', limit: '500 mSv/tahun' },
      { organ: 'Tangan & Kaki', limit: '500 mSv/tahun' },
    ]
  },
  {
    id: 6,
    type: 'content',
    title: 'Apa itu TLD?',
    icon: Zap,
    bgGradient: 'from-purple-500 to-violet-600',
    content: [
      {
        subtitle: 'Thermoluminescent Dosimeter',
        text: 'TLD adalah alat ukur dosis radiasi yang bekerja berdasarkan prinsip thermoluminescence - emisi cahaya dari material kristal ketika dipanaskan setelah terpapar radiasi.'
      },
      {
        subtitle: 'Material Umum',
        text: 'TLD umumnya menggunakan kristal seperti Lithium Fluoride (LiF), Calcium Fluoride (CaF2), atau Lithium Borate (Li2B4O7) yang sensitif terhadap radiasi.'
      }
    ]
  },
  {
    id: 7,
    type: 'content',
    title: 'Cara Kerja TLD',
    icon: Activity,
    bgGradient: 'from-indigo-500 to-blue-600',
    content: [
      {
        subtitle: 'Proses Penyimpanan Energi',
        text: 'Ketika radiasi mengenai kristal TLD, elektron tereksitasi dan terperangkap dalam "lubang" pada struktur kristal, menyimpan energi radiasi.'
      },
      {
        subtitle: 'Proses Pembacaan',
        text: 'Saat dipanaskan, elektron yang terperangkap dilepaskan dan kembali ke keadaan dasar sambil memancarkan cahaya. Intensitas cahaya sebanding dengan dosis radiasi.'
      }
    ],
    steps: [
      'Radiasi mengenai kristal TLD',
      'Elektron terperangkap dalam kristal',
      'TLD dipanaskan di reader',
      'Cahaya dipancarkan dan diukur',
      'Dosis radiasi dihitung'
    ]
  },
  {
    id: 8,
    type: 'content',
    title: 'Jenis-Jenis TLD',
    icon: FileText,
    bgGradient: 'from-teal-500 to-cyan-600',
    content: [
      {
        subtitle: 'TLD Badge (Dada)',
        text: 'Digunakan untuk mengukur dosis radiasi seluruh tubuh, dipakai di area dada bagian luar apron.'
      },
      {
        subtitle: 'TLD Ring (Cincin)',
        text: 'Digunakan untuk mengukur dosis di ekstremitas (tangan), penting untuk prosedur yang memerlukan kedekatan tangan dengan sumber radiasi.'
      },
      {
        subtitle: 'TLD Mata (Eye Dosimeter)',
        text: 'Didesain khusus untuk mengukur dosis di area mata, biasanya berbentuk headband atau clip yang dipasang di dekat mata.'
      }
    ]
  },
  {
    id: 9,
    type: 'content',
    title: 'Mengapa TLD Mata Penting?',
    icon: Eye,
    bgGradient: 'from-rose-500 to-red-600',
    content: [
      {
        subtitle: 'Dosis Mata ≠ Dosis Tubuh',
        text: 'Penelitian menunjukkan bahwa dosis yang diterima lensa mata bisa berbeda signifikan dari dosis di dada, terutama pada prosedur fluoroskopi intervensional.'
      },
      {
        subtitle: 'Underestimasi Risiko',
        text: 'Tanpa monitoring khusus mata, ada risiko underestimasi paparan lensa mata yang dapat menyebabkan katarak radiasi tanpa disadari.'
      }
    ],
    alert: {
      type: 'warning',
      text: 'Pekerja yang melakukan prosedur fluoroskopi dapat menerima dosis mata 2-10 kali lebih tinggi dari dosis di badge dada!'
    }
  },
  {
    id: 10,
    type: 'content',
    title: 'Cara Pemakaian TLD Mata',
    icon: CheckCircle,
    bgGradient: 'from-green-500 to-teal-600',
    content: [
      {
        subtitle: 'Posisi Pemasangan',
        text: 'TLD mata harus dipasang sedekat mungkin dengan mata, idealnya di area pelipis atau dahi, di bawah pelindung mata jika digunakan.'
      },
      {
        subtitle: 'Konsistensi Pemakaian',
        text: 'Selalu gunakan TLD mata setiap kali bekerja dengan radiasi. Ketidakkonsistenan akan menghasilkan data dosis yang tidak akurat.'
      }
    ],
    checklist: [
      'Pastikan TLD dalam kondisi baik',
      'Pasang di posisi yang benar (dekat mata)',
      'Gunakan selama seluruh prosedur',
      'Simpan di tempat bebas radiasi saat tidak digunakan',
      'Kembalikan tepat waktu untuk pembacaan'
    ]
  },
  {
    id: 11,
    type: 'content',
    title: 'Tips Perlindungan Mata',
    icon: Shield,
    bgGradient: 'from-blue-500 to-indigo-600',
    content: [
      {
        subtitle: 'Gunakan Kacamata Proteksi',
        text: 'Kacamata dengan lead-equivalent 0.5-0.75 mm dapat mengurangi dosis mata hingga 90%.'
      },
      {
        subtitle: 'Optimalkan Teknik Kerja',
        text: 'Minimalkan waktu paparan, maksimalkan jarak dari sumber, dan manfaatkan shielding yang tersedia.'
      }
    ],
    tips: [
      { icon: '🥽', text: 'Pakai kacamata Pb saat fluoroskopi' },
      { icon: '📏', text: 'Jaga jarak dari sumber radiasi' },
      { icon: '⏱️', text: 'Minimalkan waktu paparan' },
      { icon: '🛡️', text: 'Gunakan ceiling-suspended shield' },
    ]
  },
  {
    id: 12,
    type: 'quiz',
    title: 'Uji Pemahaman',
    icon: HelpCircle,
    bgGradient: 'from-amber-500 to-orange-600',
    questions: [
      {
        q: 'Berapa batas dosis ekuivalen lensa mata menurut ICRP 2011?',
        options: ['150 mSv/tahun', '50 mSv/tahun', '20 mSv/tahun', '500 mSv/tahun'],
        correct: 2
      },
      {
        q: 'Apa kepanjangan dari TLD?',
        options: ['Total Light Dosimeter', 'Thermoluminescent Dosimeter', 'Thermal Lens Detector', 'Transparent Light Device'],
        correct: 1
      },
      {
        q: 'Mengapa TLD mata penting digunakan?',
        options: ['Karena lebih murah', 'Karena dosis mata bisa berbeda dari dosis tubuh', 'Karena wajib secara hukum', 'Karena lebih mudah dibaca'],
        correct: 1
      }
    ]
  },
  {
    id: 13,
    type: 'closing',
    title: 'Lindungi Mata Anda!',
    subtitle: 'Penglihatan adalah anugerah yang tak ternilai',
    icon: Eye,
    bgGradient: 'from-blue-600 via-purple-600 to-pink-600',
    message: 'Dengan memahami dan menerapkan prinsip proteksi radiasi, Anda dapat melindungi kesehatan mata dan memastikan karir yang panjang dan aman dalam bidang radiologi.',
    callToAction: 'Mulai praktikkan hari ini!'
  }
];

// Page Components
function CoverPage({ page }) {
  const Icon = page.icon;
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-white p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="mb-8"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
          <Icon className="w-12 h-12 md:w-16 md:h-16" />
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
      >
        {page.title}
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-lg md:text-xl text-white/80"
      >
        {page.subtitle}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-0 right-0 text-white/60 text-sm"
      >
        Swipe untuk memulai →
      </motion.div>
    </div>
  );
}

function ContentPage({ page }) {
  const Icon = page.icon;
  
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">{page.title}</h2>
      </div>

      {/* Content Sections */}
      <div className="space-y-4">
        {page.content?.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
          >
            <h3 className="font-semibold text-white/90 mb-2">{section.subtitle}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{section.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Highlight Box */}
      {page.highlight && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center"
        >
          <div className="text-3xl md:text-4xl font-bold mb-2">{page.highlight.value}</div>
          <div className="text-white/70 text-sm">{page.highlight.label}</div>
        </motion.div>
      )}

      {/* Table */}
      {page.table && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden"
        >
          {page.table.map((row, idx) => (
            <div 
              key={idx}
              className={`flex justify-between p-3 ${idx !== page.table.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <span className="text-white/80 text-sm">{row.organ}</span>
              <span className="font-semibold text-sm">{row.limit}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Steps */}
      {page.steps && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 space-y-2"
        >
          {page.steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/10 rounded-lg p-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </div>
              <span className="text-sm text-white/80">{step}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Checklist */}
      {page.checklist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 space-y-2"
        >
          {page.checklist.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
              <span className="text-white/80">{item}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Alert */}
      {page.alert && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-100 text-sm">{page.alert.text}</p>
          </div>
        </motion.div>
      )}

      {/* Tips */}
      {page.tips && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 grid grid-cols-2 gap-3"
        >
          {page.tips.map((tip, idx) => (
            <div key={idx} className="bg-white/10 rounded-xl p-3 text-center">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <p className="text-xs text-white/80">{tip.text}</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function QuizPage({ page }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const Icon = page.icon;

  const handleAnswer = (optionIdx) => {
    if (selected !== null) return;
    setSelected(optionIdx);
    if (optionIdx === page.questions[currentQ].correct) {
      setScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQ < page.questions.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  if (showResult) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-white p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6"
        >
          {score >= page.questions.length / 2 ? '🎉' : '📚'}
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Quiz Selesai!</h2>
        <p className="text-4xl font-bold mb-4">{score}/{page.questions.length}</p>
        <p className="text-white/70">
          {score === page.questions.length 
            ? 'Sempurna! Anda menguasai materi dengan baik!'
            : score >= page.questions.length / 2
            ? 'Bagus! Terus tingkatkan pemahaman Anda.'
            : 'Pelajari kembali materi untuk pemahaman lebih baik.'}
        </p>
        <button
          onClick={() => {
            setCurrentQ(0);
            setSelected(null);
            setScore(0);
            setShowResult(false);
          }}
          className="mt-6 px-6 py-2 bg-white/20 rounded-full text-sm hover:bg-white/30 transition-colors"
        >
          Ulangi Quiz
        </button>
      </div>
    );
  }

  const question = page.questions[currentQ];

  return (
    <div className="h-full flex flex-col p-4 md:p-6 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold">{page.title}</h2>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {page.questions.map((_, idx) => (
          <div
            key={idx}
            className={`h-1 flex-1 rounded-full ${
              idx < currentQ ? 'bg-green-400' : idx === currentQ ? 'bg-white' : 'bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col">
        <p className="text-sm text-white/60 mb-2">Pertanyaan {currentQ + 1}/{page.questions.length}</p>
        <h3 className="text-lg font-semibold mb-6">{question.q}</h3>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(idx)}
              disabled={selected !== null}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selected === null
                  ? 'bg-white/10 hover:bg-white/20'
                  : idx === question.correct
                  ? 'bg-green-500/50 border-2 border-green-400'
                  : selected === idx
                  ? 'bg-red-500/50 border-2 border-red-400'
                  : 'bg-white/10 opacity-50'
              }`}
            >
              <span className="text-sm">{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosingPage({ page }) {
  const Icon = page.icon;
  
  return (
    <div className="h-full flex flex-col items-center justify-center text-center text-white p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        className="mb-8"
      >
        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto">
          <Icon className="w-12 h-12" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl md:text-4xl font-bold mb-4"
      >
        {page.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-white/80 mb-6"
      >
        {page.subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-white/60 text-sm max-w-md leading-relaxed mb-8"
      >
        {page.message}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-full font-semibold"
      >
        {page.callToAction}
      </motion.div>
    </div>
  );
}

// Main FlipBook Component
export default function FlipBook() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef(null);
  
  // Touch/Swipe handling
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchEndRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  
  const [scrollY, setScrollY] = useState(0);
  const pageContentRef = useRef(null);

  const minSwipeDistance = 50;

  // Navigate to next page
  const goToNextPage = useCallback(() => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
      setScrollY(0);
    }
  }, [currentPage]);

  // Navigate to previous page
  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(prev => prev - 1);
      setScrollY(0);
    }
  }, [currentPage]);

  // Handle touch start
  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
    isDraggingRef.current = true;
    dragStartYRef.current = e.touches[0].clientY;
    scrollOffsetRef.current = scrollY;
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    
    touchEndRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };

    // Calculate vertical scroll for content
    const deltaY = dragStartYRef.current - e.touches[0].clientY;
    const newScrollY = scrollOffsetRef.current + deltaY;
    
    // Get content height
    const contentEl = pageContentRef.current;
    if (contentEl) {
      const maxScroll = contentEl.scrollHeight - contentEl.clientHeight;
      setScrollY(Math.max(0, Math.min(newScrollY, maxScroll)));
    }
  };

  // Handle touch end
  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    
    const distanceX = touchStartRef.current.x - touchEndRef.current.x;
    const distanceY = touchStartRef.current.y - touchEndRef.current.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        // Swipe left - next page
        goToNextPage();
      } else {
        // Swipe right - previous page
        goToPrevPage();
      }
    }

    // Reset touch positions
    touchEndRef.current = { x: 0, y: 0 };
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        goToPrevPage();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage, navigate]);

  // Page animation variants
  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  // Render page content based on type
  const renderPageContent = (page) => {
    switch (page.type) {
      case 'cover':
        return <CoverPage page={page} />;
      case 'quiz':
        return <QuizPage page={page} />;
      case 'closing':
        return <ClosingPage page={page} />;
      default:
        return <ContentPage page={page} />;
    }
  };

  const currentPageData = pages[currentPage];

  return (
    <div 
      ref={containerRef}
      className="flipbook-container bg-gray-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Navigation Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">Beranda</span>
        </button>

        {/* Page indicator */}
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-white/60" />
          <span className="text-white/80 text-sm">
            {currentPage + 1} / {pages.length}
          </span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Page Content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className={`absolute inset-0 bg-gradient-to-br ${currentPageData.bgGradient}`}
          style={{ paddingTop: '60px', paddingBottom: '80px' }}
        >
          <div 
            ref={pageContentRef}
            className="h-full overflow-hidden"
            style={{ transform: `translateY(-${scrollY}px)` }}
          >
            {renderPageContent(currentPageData)}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons (Desktop) */}
      <div className="hidden md:block">
        {currentPage > 0 && (
          <button
            onClick={goToPrevPage}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentPage < pages.length - 1 && (
          <button
            onClick={goToNextPage}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Navigation Dots */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/50 to-transparent">
        <div className="flex justify-center items-center gap-2">
          {pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentPage ? 1 : -1);
                setCurrentPage(idx);
                setScrollY(0);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentPage
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        
        {/* Swipe hint */}
        <p className="text-center text-white/40 text-xs mt-3">
          ← Swipe untuk navigasi →
        </p>
      </div>
    </div>
  );
}