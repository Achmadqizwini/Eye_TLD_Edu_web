  
// src/components/sections/CTASection.jsx
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';
import { Download, Share2, QrCode, Mail, Phone } from 'lucide-react';

export default function CTASection() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Edukasi Proteksi Radiasi Lensa Mata',
          text: 'Pelajari tentang risiko radiasi dan cara penggunaan TLD mata',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Animated circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-cyan-300 text-sm mb-8"
          >
            <QrCode className="w-4 h-4" />
            <span>Sebarkan Pengetahuan</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6"
          >
            Sudah Paham Materi{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Proteksi Radiasi?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Bagikan materi edukasi ini kepada rekan kerja Anda untuk meningkatkan 
            kesadaran dan kepatuhan dalam penggunaan TLD mata.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button
              onClick={handleShare}
              className="w-full sm:w-auto px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, backgroundColor: '#f0f9ff' }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
              <span>Bagikan Materi</span>
            </motion.button>

            {/* <motion.button
              onClick={() => window.open('https://drive.google.com/uc?export=download&id=1mh86VquPih2jnP7OXUeG6NkXtMOlhfHa', '_blank')}
              className="w-full sm:w-48 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.6)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Unduh PDF</span>
            </motion.button> */}
          </motion.div>

          {/* QR Code Display */}
        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 flex flex-col items-center">
            <div className="bg-white p-3 rounded-2xl mb-4">
              <img
                src="/qr-code.png"
                alt="QR Code Materi"
                className="w-40 h-40 object-contain block"
              />
            </div>
            <p className="text-sm text-blue-200 text-center">
              Scan QR code untuk mengakses materi
            </p>
          </div>
        </motion.div> */}
        </AnimatedSection>

        {/* Contact Info */}
        {/* <AnimatedSection delay={0.5} className="mt-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white text-center mb-6">
              Hubungi Petugas Proteksi Radiasi
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <motion.a
                href="mailto:ppr@rumahsakit.com"
                className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <span className="text-white">ppr@rumahsakit.com</span>
              </motion.a>
              <motion.a
                href="tel:+621234567890"
                className="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <span className="text-white">+62 123 456 7890</span>
              </motion.a>
            </div>
          </div>
        </AnimatedSection> */}
      </div>
    </section>
  );
}