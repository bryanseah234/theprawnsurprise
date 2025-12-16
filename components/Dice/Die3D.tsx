import React from 'react';
import { motion } from 'framer-motion';
import { DieType } from '../../types';

interface Die3DProps {
  type: DieType;
  value: number | null;
  isRolling: boolean;
}

export const Die3D: React.FC<Die3DProps> = ({ type, value, isRolling }) => {
  
  // Animation for rolling state
  const shakeVariants = {
    rolling: {
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 0.9, 1.1, 0.95, 1],
      x: [-2, 2, -2, 2, 0],
      y: [-2, 2, -2, 2, 0],
      filter: "blur(1px)",
      transition: { 
        duration: 0.2,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    },
    idle: {
      rotate: 0,
      scale: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, stiffness: 300, damping: 15 }
    }
  };

  // Common SVG attributes for the "Retro/Bold" look
  const commonProps = {
    stroke: "black",
    strokeWidth: "3",
    strokeLinejoin: "round" as const,
    fill: "#FF6F61", // Coral
    className: "drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
  };

  const renderDie = () => {
    switch(type) {
      case DieType.D4:
        return (
          <svg viewBox="0 0 100 100" className="w-40 h-40 overflow-visible">
            {/* Pyramid / Triangle */}
            <polygon points="50,10 90,85 10,85" {...commonProps} />
            {/* Inner detail for depth */}
            <path d="M50 10 L50 60 L10 85" fill="none" stroke="black" strokeWidth="1.5" opacity="0.3" /> 
            <path d="M50 60 L90 85" fill="none" stroke="black" strokeWidth="1.5" opacity="0.3" />
          </svg>
        );
      case DieType.D6:
        return (
           <svg viewBox="0 0 100 100" className="w-40 h-40 overflow-visible">
             {/* Cube / Square */}
             <rect x="15" y="15" width="70" height="70" rx="6" {...commonProps} />
             {/* Bevel effect */}
             <rect x="20" y="20" width="60" height="60" rx="4" fill="none" stroke="black" strokeWidth="2" opacity="0.1" />
           </svg>
        );
      case DieType.D8:
        return (
           <svg viewBox="0 0 100 100" className="w-40 h-40 overflow-visible">
             {/* Octahedron / Diamond */}
             <path d="M50 5 L95 50 L50 95 L5 50 Z" {...commonProps} />
             {/* Cross for facets */}
             <path d="M5 50 L95 50" stroke="black" strokeWidth="1.5" fill="none" opacity="0.3" />
             <path d="M50 5 L50 95" stroke="black" strokeWidth="1.5" fill="none" opacity="0.3" />
           </svg>
        );
      case DieType.D10:
        return (
            <svg viewBox="0 0 100 100" className="w-40 h-40 overflow-visible">
              {/* Pentagonal Trapezohedron / Kite */}
              <path d="M50 5 L90 35 L50 95 L10 35 Z" {...commonProps} />
              {/* Facet lines */}
              <path d="M10 35 L90 35" stroke="black" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d="M50 35 L50 95" stroke="black" strokeWidth="1.5" fill="none" opacity="0.3" />
              <path d="M50 5 L50 35" stroke="black" strokeWidth="1.5" fill="none" opacity="0.3" />
            </svg>
        );
    }
  }

  // Text positioning adjustments based on shape centroid
  const getTextOffset = () => {
    switch(type) {
      case DieType.D4: return "translate-y-4"; // Triangle center is physically lower
      case DieType.D10: return "translate-y-2";
      default: return "";
    }
  }

  return (
    <motion.div 
      className="relative flex items-center justify-center w-full h-full p-4"
      variants={shakeVariants}
      animate={isRolling ? "rolling" : "idle"}
    >
      {renderDie()}
      
      {/* Result Number */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${getTextOffset()}`}>
        <span className="font-retro text-3xl md:text-4xl text-white drop-shadow-[3px_3px_0px_#000]">
          {isRolling ? '?' : (value ?? '?')}
        </span>
      </div>
    </motion.div>
  );
};