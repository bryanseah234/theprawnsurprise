import React from 'react';
import { DieType } from '../../types';
import './die3d.css';

interface Die3DProps {
  type: DieType;
  value: number | null;
  isRolling: boolean;
}

export const Die3D: React.FC<Die3DProps> = ({ type, value, isRolling }) => {
  // Determine class based on type
  const typeClass = `d${type}`;
  
  // Render faces based on type
  const renderFaces = () => {
    const faces = [];
    const count = type;
    
    for (let i = 1; i <= count; i++) {
      // Trick: When NOT rolling, we force Face 1 to show the result
      // All other faces show random numbers or just their index
      // This ensures we don't need complex rotation math to "land" on the specific face.
      let content = i;
      if (!isRolling && value !== null) {
        if (i === 1) content = value;
        else content = (i % type) + 1; // dummy values
      }

      faces.push(
        <div key={i} className={`face face-${i}`}>
          <span>{isRolling ? '?' : content}</span>
        </div>
      );
    }
    return faces;
  };

  return (
    <div className="scene">
      <div className={`die-container ${typeClass} ${isRolling ? 'rolling' : ''}`}>
        {renderFaces()}
      </div>
    </div>
  );
};