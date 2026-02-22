// src/components/sections/QuizSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { 
  Brain, 
  CheckCircle, 
  XCircle, 
  Trophy, 
  RotateCcw,
  ChevronRight,
  Star
} from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'Berapa nilai batas dosis (NBD) untuk lensa mata pekerja radiasi per tahun?',
    options: [
      { id: 'a', text: '50 mSv/tahun' },
      { id: 'b', text: '20 mSv/tahun' },
      { id: 'c', text: '150 mSv/tahun' },
      { id: 'd', text: '100 mSv/tahun' }
    ],
    correctAnswer: 'b',
    explanation: 'Berdasarkan rekomendasi ICRP terbaru, NBD lensa mata adalah 20 mSv/tahun (rata-rata 5 tahun).'
  },
  {
    id: 2,
    question: 'Apa kepanjangan dari TLD?',
    options: [
      { id: 'a', text: 'Thermal Light Detector' },
      { id: 'b', text: 'Total Luminescence Dosimeter' },
      { id: 'c', text: 'Thermoluminescent Dosimeter' },
      { id: 'd', text: 'Technical Lens Device' }
    ],
    correctAnswer: 'c',
    explanation: 'TLD adalah Thermoluminescent Dosimeter, alat pengukur dosis radiasi menggunakan prinsip thermoluminescence.'
  },
  {
    id: 3,
    question: 'Efek radiasi yang terjadi tanpa ambang batas dosis disebut?',
    options: [
      { id: 'a', text: 'Efek Deterministik' },
      { id: 'b', text: 'Efek Stokastik' },
      { id: 'c', text: 'Efek Akut' },
      { id: 'd', text: 'Efek Kronis' }
    ],
    correctAnswer: 'b',
    explanation: 'Efek stokastik tidak memiliki ambang batas dosis, probabilitas terjadinya meningkat seiring dengan dosis.'
  },
  {
    id: 4,
    question: 'Di mana posisi yang tepat untuk memasang TLD mata?',
    options: [
      { id: 'a', text: 'Di dada' },
      { id: 'b', text: 'Di pergelangan tangan' },
      { id: 'c', text: 'Di area dekat mata (alis)' },
      { id: 'd', text: 'Di pinggang' }
    ],
    correctAnswer: 'c',
    explanation: 'TLD mata harus dipasang sedekat mungkin dengan mata, biasanya di area alis atau pada frame kacamata.'
  },
  {
    id: 5,
    question: 'Apa yang harus dilakukan jika TLD hilang atau rusak?',
    options: [
      { id: 'a', text: 'Meminjam TLD rekan kerja' },
      { id: 'b', text: 'Melaporkan segera ke petugas proteksi radiasi' },
      { id: 'c', text: 'Membeli TLD baru sendiri' },
      { id: 'd', text: 'Mengabaikannya' }
    ],
    correctAnswer: 'b',
    explanation: 'Kehilangan atau kerusakan TLD harus segera dilaporkan untuk dokumentasi dan penggantian yang tepat.'
  }
];

export default function QuizSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (optionId) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionId);
    setIsAnswered(true);
    
    const isCorrect = optionId === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { 
      questionId: currentQuestion, 
      selected: optionId, 
      correct: isCorrect 
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage === 100) return { text: 'Sempurna! 🎉', color: 'text-green-500' };
    if (percentage >= 80) return { text: 'Sangat Baik! 👏', color: 'text-green-500' };
    if (percentage >= 60) return { text: 'Cukup Baik! 👍', color: 'text-yellow-500' };
    if (percentage >= 40) return { text: 'Perlu Belajar Lagi 📚', color: 'text-orange-500' };
    return { text: 'Ayo Ulangi Materi! 💪', color: 'text-red-500' };
  };

  return (
    <section id="quiz" className="py-20 md:py-32 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            <span>Uji Pemahaman</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Quiz{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Interaktif
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Uji pemahaman Anda tentang materi proteksi radiasi lensa mata 
            dengan menjawab pertanyaan berikut.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass-card overflow-hidden">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={`question-${currentQuestion}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="p-8 md:p-12"
                >
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">
                        Pertanyaan {currentQuestion + 1} dari {quizQuestions.length}
                      </span>
                      <span className="text-sm font-medium text-purple-600">
                        Skor: {score}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ 
                          width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` 
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Question */}
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-4 mb-8">
                    {quizQuestions[currentQuestion].options.map((option) => {
                      const isCorrect = option.id === quizQuestions[currentQuestion].correctAnswer;
                      const isSelected = selectedAnswer === option.id;
                      
                      let buttonClass = 'bg-white border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50';
                      
// src/components/sections/QuizSection.jsx (lanjutan)

                      if (isAnswered) {
                        if (isCorrect) {
                          buttonClass = 'bg-green-50 border-2 border-green-500';
                        } else if (isSelected && !isCorrect) {
                          buttonClass = 'bg-red-50 border-2 border-red-500';
                        } else {
                          buttonClass = 'bg-gray-50 border-2 border-gray-200 opacity-50';
                        }
                      } else if (isSelected) {
                        buttonClass = 'bg-purple-50 border-2 border-purple-500';
                      }

                      return (
                        <motion.button
                          key={option.id}
                          onClick={() => handleAnswer(option.id)}
                          disabled={isAnswered}
                          className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${buttonClass}`}
                          whileHover={!isAnswered ? { scale: 1.02 } : {}}
                          whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center space-x-4">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              isAnswered && isCorrect
                                ? 'bg-green-500 text-white'
                                : isAnswered && isSelected && !isCorrect
                                ? 'bg-red-500 text-white'
                                : isSelected
                                ? 'bg-purple-500 text-white'
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {option.id.toUpperCase()}
                            </span>
                            <span className={`font-medium ${
                              isAnswered && isCorrect
                                ? 'text-green-700'
                                : isAnswered && isSelected && !isCorrect
                                ? 'text-red-700'
                                : 'text-gray-700'
                            }`}>
                              {option.text}
                            </span>
                          </div>
                          {isAnswered && isCorrect && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          )}
                          {isAnswered && isSelected && !isCorrect && (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`p-4 rounded-xl mb-6 ${
                          selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-yellow-50 border border-yellow-200'
                        }`}
                      >
                        <p className={`text-sm ${
                          selectedAnswer === quizQuestions[currentQuestion].correctAnswer
                            ? 'text-green-700'
                            : 'text-yellow-700'
                        }`}>
                          <strong>Penjelasan:</strong> {quizQuestions[currentQuestion].explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Button */}
                  {isAnswered && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={nextQuestion}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>
                        {currentQuestion < quizQuestions.length - 1 
                          ? 'Pertanyaan Selanjutnya' 
                          : 'Lihat Hasil'}
                      </span>
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  )}
                </motion.div>
              ) : (
                /* Result Screen */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 text-center"
                >
                  {/* Trophy Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
                    className="mb-8"
                  >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <Trophy className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  {/* Score */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                      Skor Anda
                    </h3>
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                        {score}
                      </span>
                      <span className="text-3xl text-gray-400">/ {quizQuestions.length}</span>
                    </div>
                    <p className={`text-xl font-semibold ${getScoreMessage().color}`}>
                      {getScoreMessage().text}
                    </p>
                  </motion.div>

                  {/* Stars */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center space-x-2 my-8"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.6 + star * 0.1, type: 'spring' }}
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= Math.ceil((score / quizQuestions.length) * 5)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Answer Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-gray-50 rounded-xl p-6 mb-8"
                  >
                    <h4 className="font-bold text-gray-700 mb-4">Ringkasan Jawaban</h4>
                    <div className="flex justify-center space-x-3">
                      {answers.map((answer, index) => (
                        <div
                          key={index}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                            answer.correct ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        >
                          {index + 1}
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Retry Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    onClick={resetQuiz}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span>Ulangi Quiz</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}