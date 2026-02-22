// src/components/illustrations/EyeWithTLD.jsx
import { motion } from 'framer-motion';

export default function EyeWithTLD() {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto">
      {/* Face outline (simplified) */}
      <ellipse cx="150" cy="120" rx="80" ry="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1"/>
      
      {/* Eyebrow */}
      <path d="M100 70 Q150 55 200 70" fill="none" stroke="#78350f" strokeWidth="4" strokeLinecap="round"/>
      
      {/* Eye */}
      <ellipse cx="150" cy="100" rx="35" ry="20" fill="white" stroke="#1e3a8a" strokeWidth="2"/>
      
      {/* Iris */}
      <circle cx="150" cy="100" r="12" fill="#1e40af"/>
      
      {/* Pupil */}
      <circle cx="150" cy="100" r="5" fill="#0f172a"/>
      
      {/* Eye highlight */}
      <circle cx="146" cy="96" r="3" fill="white" opacity="0.8"/>
      
      {/* TLD Badge */}
      <motion.g
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* TLD body */}
        <rect x="185" y="55" width="40" height="25" rx="4" fill="white" stroke="#3b82f6" strokeWidth="2"/>
        
        {/* TLD crystal */}
        <circle cx="205" cy="67" r="6" fill="#06b6d4"/>
        
        {/* Strap/headband */}
        <path d="M185 67 L100 67" fill="none" stroke="#6b7280" strokeWidth="2" strokeDasharray="4,2"/>
      </motion.g>
      
      {/* Arrow pointing to TLD position */}
      <path d="M240 50 L215 60" fill="none" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowhead)"/>
      
      {/* Label */}
      <text x="245" y="45" fontSize="10" fill="#ef4444" fontWeight="bold">Posisi TLD</text>
      
      {/* Arrow marker */}
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/>
        </marker>
      </defs>
    </svg>
  );
}