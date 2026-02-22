// src/components/illustrations/TLDDevice.jsx
export default function TLDDevice({ className = "w-full" }) {
  return (
    <svg viewBox="0 0 200 150" className={className}>
      {/* TLD Badge Body */}
      <rect x="30" y="30" width="140" height="90" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2"/>
      
      {/* Inner border */}
      <rect x="40" y="40" width="120" height="70" rx="5" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="5,3"/>
      
      {/* TLD Crystal */}
      <circle cx="100" cy="75" r="20" fill="url(#crystalGradient)"/>
      
      {/* Clip/Holder */}
      <rect x="90" y="15" width="20" height="20" rx="3" fill="#64748b"/>
      <circle cx="100" cy="25" r="4" fill="#94a3b8"/>
      
      {/* Label */}
      <text x="100" y="115" textAnchor="middle" fontSize="8" fill="#64748b">TLD-100</text>
      
      {/* ID Number */}
      <text x="100" y="130" textAnchor="middle" fontSize="6" fill="#94a3b8">ID: 2024-001</text>
      
      {/* Gradient definition */}
      <defs>
        <radialGradient id="crystalGradient" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#22d3ee"/>
          <stop offset="100%" stopColor="#0891b2"/>
        </radialGradient>
      </defs>
    </svg>
  );
}