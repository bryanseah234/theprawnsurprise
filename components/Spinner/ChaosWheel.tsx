import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { RetroButton } from '../ui/RetroButton';
import { sanitizeInput } from '../../utils/sanitizer';
import { SpinnerItem } from '../../types';

// Theme colors for slices
const SLICE_COLORS = ['#FF6F61', '#F4D03F', '#FFFFFF', '#0F4C81', '#333333'];

export const ChaosWheel: React.FC = () => {
  const [items, setItems] = useState<SpinnerItem[]>([
    { id: '1', label: 'Yes', color: '#FF6F61' },
    { id: '2', label: 'No', color: '#F4D03F' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  
  const controls = useAnimation();
  const rotationRef = useRef(0);

  const handleAddItem = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (items.length >= 10) return;
    
    const cleanLabel = sanitizeInput(inputValue);
    if (cleanLabel.length > 0) {
      setItems([
        ...items, 
        { 
          id: Date.now().toString(), 
          label: cleanLabel, 
          color: SLICE_COLORS[items.length % SLICE_COLORS.length] 
        }
      ]);
      setInputValue('');
      setWinner(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    if (isSpinning) return;
    setItems(items.filter(i => i.id !== id));
    setWinner(null);
  };

  const handleSpin = async () => {
    if (isSpinning || items.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    // Random rotations: at least 5 full spins (1800 deg) + random offset
    const randomOffset = Math.random() * 360;
    const totalRotation = 1800 + randomOffset;
    
    // We add to the current rotation so it spins forward continuously
    const targetRotation = rotationRef.current + totalRotation;
    
    await controls.start({
      rotate: targetRotation,
      transition: { 
        duration: 4, 
        ease: [0.15, 0.85, 0.35, 1] // Custom cubic bezier for realistic slowdown
      }
    });

    rotationRef.current = targetRotation;
    
    // Calculate winner
    // The pointer is at the top (0 degrees or 360 degrees visually).
    // CSS rotate moves the wheel clockwise.
    // The slice at the top is determined by: (360 - (finalRotation % 360)) % 360
    const normalizedRotation = targetRotation % 360;
    const anglePerSlice = 360 / items.length;
    
    // Adjust pointer logic: 
    // If wheel rotates +90deg, the slice at 270deg (original position) is now at top (0deg).
    // So we look for the slice that covers the angle (360 - normalizedRotation).
    const pointerAngle = (360 - normalizedRotation) % 360;
    const winningIndex = Math.floor(pointerAngle / anglePerSlice);
    
    setWinner(items[winningIndex].label);
    setIsSpinning(false);
  };

  // Build Conic Gradient
  const gradient = `conic-gradient(
    ${items.map((item, index) => {
      const start = (index / items.length) * 100;
      const end = ((index + 1) / items.length) * 100;
      return `${item.color} ${start}% ${end}%`;
    }).join(', ')}
  )`;

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center w-full max-w-4xl mx-auto gap-8 p-4">
      
      {/* Wheel Section */}
      <div className="flex flex-col items-center w-full lg:w-1/2">
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
                <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-black drop-shadow-md"></div>
            </div>

            {/* Wheel */}
            <motion.div
                animate={controls}
                className="w-full h-full rounded-full border-4 border-black shadow-retro overflow-hidden relative"
                style={{ background: items.length > 0 ? gradient : '#333' }}
            >
               {/* Slice Labels (Tricky to position perfectly in generic conic, simple overlay here) */}
               {items.length > 0 && items.map((item, i) => {
                   const angle = (360 / items.length) * i + (360 / items.length) / 2;
                   return (
                       <div 
                         key={item.id}
                         className="absolute top-1/2 left-1/2 w-1 h-[50%] origin-top -translate-x-1/2 text-xs font-bold pt-8"
                         style={{ transform: `rotate(${angle}deg)` }}
                       >
                           <span 
                             className="block transform -rotate-90 origin-center truncate w-20 text-center"
                             style={{ 
                                 color: item.color === '#FFFFFF' || item.color === '#F4D03F' ? 'black' : 'white',
                                 textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
                            }}
                            >
                               {item.label}
                           </span>
                       </div>
                   )
               })}
            </motion.div>
        </div>

        {winner && (
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-zest border-2 border-black p-4 shadow-retro mb-4 text-center w-full"
            >
                <p className="font-retro text-xs text-black mb-1">THE CHAOS GODS CHOSE:</p>
                <p className="font-bold text-2xl text-black break-words">{winner}</p>
            </motion.div>
        )}

        <RetroButton 
            onClick={handleSpin} 
            disabled={isSpinning || items.length < 2} 
            className="w-full text-lg h-14"
        >
            {isSpinning ? 'SPINNING...' : 'SPIN WHEEL'}
        </RetroButton>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col w-full lg:w-1/2 bg-white/5 border-2 border-black p-4 shadow-retro">
        <h3 className="font-retro text-sm mb-4">CHAOS OPTIONS ({items.length}/10)</h3>
        
        <form onSubmit={handleAddItem} className="flex gap-2 mb-4">
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={items.length >= 10 || isSpinning}
                placeholder={items.length >= 10 ? "Max capacity reached" : "Add option..."}
                className="flex-1 bg-white text-black font-sans px-3 py-2 border-2 border-black focus:outline-none focus:shadow-retro transition-shadow text-sm"
            />
            <RetroButton type="submit" disabled={items.length >= 10 || isSpinning || !inputValue.trim()}>
                ADD
            </RetroButton>
        </form>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white/10 p-2 border border-black/20 hover:border-black transition-colors">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-4 h-4 rounded-full border border-black shrink-0" style={{ backgroundColor: item.color }}></div>
                        <span className="truncate text-sm font-medium">{item.label}</span>
                    </div>
                    <button 
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={isSpinning}
                        className="text-red-400 hover:text-red-500 disabled:opacity-50 p-1"
                        aria-label="Delete item"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))}
            {items.length === 0 && <p className="text-center text-sm opacity-50 py-4">Add items to spin!</p>}
        </div>
      </div>
    </div>
  );
};
