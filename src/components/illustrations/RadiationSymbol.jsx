// src/components/illustrations/RadiationSymbol.jsx
export default function RadiationSymbol({ className = "w-16 h-16", animated = true }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      {/* Center circle */}
      <circle cx="50" cy="50" r="10" fill="#fbbf24"/>
      
      {/* Radiation blades */}
      {[0, 120, 240].map((rotation, index) => (
        <path
          key={index}
          d="M50 50 L35 15 A40 40 0 0 1 65 15 Z"
          fill="#fbbf24"
          transform={`rotate(${rotation} 50 50)`}
          className={animated ? "animate-pulse" : ""}
          style={{ animationDelay: `${index * 0.2}s` }}
        />
      ))}
      
      {/* Outer circle */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="#fbbf24" strokeWidth="3"/>
    </svg>
  );
}