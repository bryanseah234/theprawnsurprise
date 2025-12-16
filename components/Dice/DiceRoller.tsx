import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DieType } from '../../types';
import { RetroButton } from '../ui/RetroButton';

const DieShape: React.FC<{ type: DieType; className?: string }> = ({ type, className }) => {
  // Simple SVG shapes for dice
  switch (type) {
    case DieType.D4:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="currentColor">
          <path d="M50 10 L90 85 L10 85 Z" stroke="black" strokeWidth="3" />
        </svg>
      );
    case DieType.D6:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="currentColor">
          <rect x="15" y="15" width="70" height="70" rx="4" stroke="black" strokeWidth="3" />
        </svg>
      );
    case DieType.D8:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="currentColor">
          <path d="M50 5 L90 50 L50 95 L10 50 Z" stroke="black" strokeWidth="3" />
        </svg>
      );
    case DieType.D10:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="currentColor">
           <path d="M50 5 L85 40 L50 95 L15 40 Z" stroke="black" strokeWidth="3" />
        </svg>
      );
    default:
      return null;
  }
};

export const DiceRoller: React.FC = () => {
  const [selectedDie, setSelectedDie] = useState<DieType>(DieType.D6);
  const [result, setResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    setResult(null);

    // Simulate roll duration
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * selectedDie) + 1;
      setResult(newResult);
      setIsRolling(false);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto p-4 gap-8">
      
      {/* Die Selection */}
      <div className="flex flex-wrap justify-center gap-4">
        {[DieType.D4, DieType.D6, DieType.D8, DieType.D10].map((type) => (
          <RetroButton 
            key={type}
            variant={selectedDie === type ? 'accent' : 'neutral'}
            onClick={() => {
                setSelectedDie(type);
                setResult(null);
            }}
          >
            d{type}
          </RetroButton>
        ))}
      </div>

      {/* Dice Display Area */}
      <div className="relative flex items-center justify-center w-64 h-64 bg-white/10 border-2 border-black rounded-xl shadow-retro">
        <motion.div
          animate={isRolling ? {
            rotate: [0, -10, 10, -10, 10, 0],
            scale: [1, 1.1, 0.9, 1.1, 1],
            x: [0, -5, 5, -5, 5, 0],
            y: [0, -5, 5, -5, 5, 0]
          } : {}}
          transition={{ duration: 0.5 }}
          className="relative w-48 h-48 flex items-center justify-center text-coral"
        >
          <DieShape type={selectedDie} className="w-full h-full drop-shadow-md" />
          
          {/* Result Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
             <AnimatePresence mode="wait">
              {!isRolling && result !== null && (
                <motion.span 
                    key="result"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-retro text-4xl text-black drop-shadow-[2px_2px_0px_#fff]"
                >
                  {result}
                </motion.span>
              )}
               {isRolling && (
                 <span className="font-retro text-2xl text-black/50">...</span>
               )}
               {!isRolling && result === null && (
                  <span className="font-retro text-xs text-black/50 text-center px-4">Tap Roll</span>
               )}
             </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <RetroButton 
        onClick={rollDice} 
        disabled={isRolling} 
        className="w-48 h-16 text-lg"
      >
        {isRolling ? 'ROLLING...' : 'ROLL DICE'}
      </RetroButton>
    </div>
  );
};
