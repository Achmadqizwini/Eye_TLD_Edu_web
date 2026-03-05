// src/components/common/Footer.jsx
import { motion } from 'framer-motion';
import { Eye, Shield, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Eye className="w-8 h-8 text-cyan-400" />
                <Shield className="w-4 h-4 text-blue-400 absolute -bottom-1 -right-1" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                RadiasiMata
              </span>
            </div>
            <p className="text-sm">
              Platform edukasi digital untuk meningkatkan pemahaman dan kesadaran 
              petugas tentang proteksi radiasi lensa mata.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Risiko Radiasi', href: '#risiko' },
                { label: 'NBD', href: '#nbd' },
                { label: 'Peran TLD', href: '#tld' },
                { label: 'Cara Penggunaan', href: '#penggunaan' },
                { label: 'Quiz', href: '#quiz' },
              ].map((link) => (
                <li key={link.href}>
                  <motion.a
                    href={link.href}
                    className="hover:text-cyan-400 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4">Referensi</h4>
            <ul className="space-y-2 text-sm">
              {/* <li>ICRP Publication 118</li> */}
              <li>Peraturan BAPETEN</li>
              <li>Pedoman K3 Radiasi</li>
              {/* <li>Standar Internasional IAEA</li> */}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-center md:text-left">
              © {currentYear} Edukasi Proteksi Radiasi. Dibuat untuk keselamatan pekerja radiasi.
            </p>
            <p className="text-sm flex items-center mt-4 md:mt-0">
              Dibuat dengan <Heart className="w-4 h-4 text-red-500 mx-1" /> untuk keselamatan kerja
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}