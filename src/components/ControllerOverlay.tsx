import React from 'react';
import { X } from 'lucide-react';
import { NES } from 'jsnes';

const NES_BUTTONS = NES.Buttons;

interface ControllerOverlayProps {
  onButtonDown: (button: number) => void;
  onButtonUp: (button: number) => void;
  onExit: () => void;
}

export const ControllerOverlay: React.FC<ControllerOverlayProps> = ({ onButtonDown, onButtonUp, onExit }) => {
  const createButton = (button: number, label: string, className: string) => (
    <button
      className={`flex items-center justify-center font-bold text-xs select-none ${className}`}
      onTouchStart={(e) => { e.preventDefault(); onButtonDown(button); }}
      onTouchEnd={(e) => { e.preventDefault(); onButtonUp(button); }}
      onMouseDown={() => onButtonDown(button)}
      onMouseUp={() => onButtonUp(button)}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      <div className="text-white text-4xl">DEBUG: CONTROLLER LOADED</div>
      <button onClick={onExit} className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full">
        <X size={24} />
      </button>

      {/* Controller Body */}
      <div className="relative w-full max-w-[800px] aspect-[2/1] bg-stone-200 rounded-[24px] shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-t-4 border-stone-100 flex items-center justify-between px-12">
        
        {/* Central Black Panel */}
        <div className="absolute top-[25px] left-[20px] right-[20px] bottom-[25px] bg-[#222] rounded-[8px] flex items-center justify-between px-12">
          
          {/* D-Pad */}
          <div className="relative w-32 h-32">
            {createButton(NES_BUTTONS.UP, '', 'absolute top-0 left-10 w-12 h-12 bg-stone-900 rounded-t-lg')}
            {createButton(NES_BUTTONS.DOWN, '', 'absolute bottom-0 left-10 w-12 h-12 bg-stone-900 rounded-b-lg')}
            {createButton(NES_BUTTONS.LEFT, '', 'absolute top-10 left-0 w-12 h-12 bg-stone-900 rounded-l-lg')}
            {createButton(NES_BUTTONS.RIGHT, '', 'absolute top-10 right-0 w-12 h-12 bg-stone-900 rounded-r-lg')}
            <div className="absolute top-10 left-10 w-12 h-12 bg-stone-900"></div>
          </div>

          {/* Select/Start */}
          <div className="flex gap-8">
            {createButton(NES_BUTTONS.SELECT, 'SELECT', 'w-24 h-8 bg-stone-700 text-stone-300 text-xs font-bold rounded-full uppercase tracking-widest')}
            {createButton(NES_BUTTONS.START, 'START', 'w-24 h-8 bg-stone-700 text-stone-300 text-xs font-bold rounded-full uppercase tracking-widest')}
          </div>

          {/* A/B Buttons */}
          <div className="flex gap-6">
            {createButton(NES_BUTTONS.BUTTON_B, 'B', 'w-20 h-20 bg-red-700 text-red-950 font-bold text-2xl rounded-full shadow-[0_4px_0_#991b1b]')}
            {createButton(NES_BUTTONS.BUTTON_A, 'A', 'w-20 h-20 bg-red-700 text-red-950 font-bold text-2xl rounded-full shadow-[0_4px_0_#991b1b]')}
          </div>
        </div>
      </div>
    </div>
  );
};
