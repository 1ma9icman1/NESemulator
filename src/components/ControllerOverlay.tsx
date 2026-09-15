import React from 'react';
const NES = {
  Buttons: {
    BUTTON_A: 0,
    BUTTON_B: 1,
    SELECT: 2,
    START: 3,
    UP: 4,
    DOWN: 5,
    LEFT: 6,
    RIGHT: 7,
  }
};


interface ControllerOverlayProps {
  onButtonDown: (button: number) => void;
  onButtonUp: (button: number) => void;
  onExit: () => void;
}

// NES Buttons based on jsnes
// 0: A
// 1: B
// 2: SELECT
// 3: START
// 4: UP
// 5: DOWN
// 6: LEFT
// 7: RIGHT

export const ControllerOverlay: React.FC<ControllerOverlayProps> = ({ onButtonDown, onButtonUp, onExit }) => {
  const createButton = (button: number, label: string, className: string, shape: 'circle' | 'rect' | 'dpad' = 'rect') => (
    <button
      className={`flex items-center justify-center font-bold text-xs select-none ${className} ${shape === 'circle' ? 'rounded-full' : shape === 'dpad' ? '' : 'rounded'}`}
      onTouchStart={(e) => { e.preventDefault(); onButtonDown(button); }}
      onTouchEnd={(e) => { e.preventDefault(); onButtonUp(button); }}
      onMouseDown={() => onButtonDown(button)}
      onMouseUp={() => onButtonUp(button)}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-stone-800 z-50 flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-[600px] aspect-[2/1] bg-stone-300 rounded-xl shadow-2xl flex items-center justify-between px-8 py-4 border-b-8 border-r-8 border-stone-400">
        
        {/* D-Pad - using NES Constants */}
        <div className="relative w-40 h-40 ml-4">
            {createButton(NES.Buttons.UP, '▲', 'absolute top-0 left-12 w-16 h-16 bg-stone-900 text-stone-500 rounded-t-lg', 'dpad')}
            {createButton(NES.Buttons.DOWN, '▼', 'absolute bottom-0 left-12 w-16 h-16 bg-stone-900 text-stone-500 rounded-b-lg', 'dpad')}
            {createButton(NES.Buttons.LEFT, '◀', 'absolute top-12 left-0 w-16 h-16 bg-stone-900 text-stone-500 rounded-l-lg', 'dpad')}
            {createButton(NES.Buttons.RIGHT, '▶', 'absolute top-12 right-0 w-16 h-16 bg-stone-900 text-stone-500 rounded-r-lg', 'dpad')}
            <div className="absolute top-12 left-12 w-16 h-16 bg-stone-900 rounded-lg"></div>
        </div>

        {/* Start/Select Panel - using NES Constants 2,3 */}
        <div className="flex flex-col gap-6 items-center">
            <div className="flex gap-4">
                {createButton(NES.Buttons.SELECT, 'SELECT', 'w-20 h-8 bg-stone-600 text-stone-100 text-xs rounded-full')}
                {createButton(NES.Buttons.START, 'START', 'w-20 h-8 bg-stone-600 text-stone-100 text-xs rounded-full')}
            </div>
            <div className="text-stone-700 font-bold tracking-widest text-2xl uppercase">Nintendo</div>
        </div>

        {/* A/B Buttons - using NES Constants 0,1 */}
        <div className="flex gap-8 mr-4 items-center">
            {createButton(NES.Buttons.BUTTON_B, 'B', 'w-24 h-24 bg-red-700 text-white shadow-lg text-2xl border-b-4 border-red-900', 'circle')}
            {createButton(NES.Buttons.BUTTON_A, 'A', 'w-24 h-24 bg-red-700 text-white shadow-lg text-2xl border-b-4 border-red-900', 'circle')}
        </div>
      </div>
    </div>
  );
};
