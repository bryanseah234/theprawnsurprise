import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface RetroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'neutral';
  className?: string;
}

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const RetroButton: React.FC<RetroButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}) => {
  const baseStyles = "px-4 py-2 font-retro text-xs md:text-sm border-2 border-black shadow-retro transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-retro-active disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-coral text-white hover:bg-red-400",
    accent: "bg-zest text-black hover:bg-yellow-300",
    neutral: "bg-white text-black hover:bg-gray-100"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props}
    >
      {children}
    </button>
  );
};
