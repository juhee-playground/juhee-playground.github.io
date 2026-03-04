import { motion } from 'framer-motion';

import { PortfolioState, PowerState } from '@/pages/landing/types';
import { ScreenContent } from './screenContent';

interface GameBoyFrameProps {
  gameState: PortfolioState;
  menuIndex: number;
  detailIndex?: number;
  resumePage?: number;
  dashboardPage?: number;
  isPowerOn: boolean;
  powerState: PowerState;
  onStart: () => void;
  onSelect: () => void;
  onAction: (btn: 'A' | 'B') => void;
  onDPad: (dir: string) => void;
  onPowerToggle: () => void;
  onPageChange?: (page: number) => void;
  onDashboardPageChange?: (page: number) => void;
  onDetailsClick?: () => void;
}

export function GameBoyFrame({
  gameState,
  menuIndex,
  detailIndex = 0,
  resumePage = 0,
  dashboardPage = 0,
  isPowerOn,
  powerState,
  onStart,
  onSelect,
  onAction,
  onDPad,
  onPowerToggle,
  onPageChange,
  onDashboardPageChange,
  onDetailsClick
}: GameBoyFrameProps) {
  const shouldShowContent = powerState === 'on' || powerState === 'powering-on' || powerState === 'powering-off';
  const isAnimating = powerState === 'powering-on' || powerState === 'powering-off';
  
  const getAnimationClass = () => {
    if (powerState === 'powering-on') return 'animate-tv-on';
    if (powerState === 'powering-off') return 'animate-tv-off';
    return '';
  };
  return (
    <div className="relative flex flex-col items-center mx-auto scale-90 md:scale-100 pt-4">
      {/* Power Switch - NuPhy Blue accent */}
      <div className="absolute top-0 left-12 w-16 h-5 bg-secondary-lightest border-2 border-slate-200 rounded-t-lg flex items-center px-1 cursor-pointer" onClick={onPowerToggle}>
        <div className={`w-6 h-3.5 rounded-sm transition-all duration-300 shadow-sm ${isPowerOn || isAnimating ? 'bg-[#3b82f6] translate-x-7' : 'bg-slate-300 translate-x-0'}`}></div>
      </div>

      {/* Main Body - Bright NuPhy White */}
      <div className="w-[320px] md:w-[380px] bg-white p-4 rounded-[40px] rounded-br-[120px] border border-slate-200 shadow-2xl relative overflow-hidden">
        
        {/* Power LED - Bright Blue */}
        <div className="absolute top-24 left-6 flex flex-col items-center">
          <div className={`w-2 h-2 rounded-full mb-1 transition-colors duration-300 ${isPowerOn || isAnimating ? 'bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]' : 'bg-slate-200'}`}></div>
          <span className="text-[6px] text-slate-400 font-bold">POWER</span>
        </div>

        {/* Screen Frame - Sleek Slate */}
        <div className="bg-[#334155] p-2 rounded-2xl border-2 border-slate-400/20 mb-5 relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-8">
             <div className="h-1 w-12 bg-slate-500/30 rounded-full"></div>
             <div className="h-1 w-12 bg-slate-500/30 rounded-full"></div>
          </div>
          
          {/* LCD Screen - Bright LCD Tint */}
          <motion.div
            layoutId="game-screen"
            className={`w-full aspect-[5/4] md:aspect-[5/4] relative overflow-hidden border-4 border-slate-800 rounded-sm ${isPowerOn || isAnimating ? 'bg-[#d9f99d]' : 'bg-[#1e293b]'} transition-colors duration-500`}
          >
            {shouldShowContent && (
              <div className={`absolute inset-0 ${getAnimationClass()}`}>
                <div className="absolute inset-0 scanlines opacity-10 z-10"></div>
                <div className="relative z-0 h-full w-full p-4 overflow-y-auto">
                   <ScreenContent gameState={gameState} menuIndex={menuIndex} detailIndex={detailIndex} resumePage={resumePage} dashboardPage={dashboardPage} onPageChange={onPageChange} onDashboardPageChange={onDashboardPageChange} onDetailsClick={onDetailsClick} />
                </div>
                {/* 하얀 빛 overlay 효과 */}
                {powerState === 'powering-on' && (
                  <div className={`absolute inset-0 z-20 animate-tv-on-overlay`}></div>
                )}
                {powerState === 'powering-off' && (
                  <div className={`absolute inset-0 z-20 animate-tv-off-overlay`}></div>
                )}
              </div>
            )}
          </motion.div>

          <div className="mt-2 flex justify-between items-center text-slate-400 text-[10px] px-2">
             <span className="font-bold uppercase">JUHEE-OS</span>
             <span className="font-bold">V2.0</span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col gap-10">
          
          <div className="flex justify-between items-center px-4">
            {/* D-PAD - Light Gray Keycap style */}
            <div className="relative w-28 h-28">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-9 h-28 bg-secondary-lightest rounded-lg border-b-4 border-slate-300"></div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-28 h-9 bg-secondary-lightest rounded-lg border-b-4 border-slate-300"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-secondary-lightest"></div>
              
              <button onClick={() => onDPad('up')} className="absolute top-0 left-9 w-10 h-10 active:opacity-50" />
              <button onClick={() => onDPad('down')} className="absolute bottom-0 left-9 w-10 h-10 active:opacity-50" />
              <button onClick={() => onDPad('left')} className="absolute left-0 top-9 w-10 h-10 active:opacity-50" />
              <button onClick={() => onDPad('right')} className="absolute right-0 top-9 w-10 h-10 active:opacity-50" />
            </div>

            {/* A/B Buttons - Primary Accents */}
            <div className="flex gap-6 rotate-[-10deg]">
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => onAction('B')}
                  className="w-14 h-14 bg-error rounded-xl border-b-[6px] border-[#b91c1c] keycap-shadow flex items-center justify-center text-white/50 font-black"
                >B</button>
              </div>
              <div className="flex flex-col items-center">
                <button 
                  onClick={() => onAction('A')}
                  className="w-14 h-14 bg-[#fbbf24] rounded-xl border-b-[6px] border-[#d97706] keycap-shadow flex items-center justify-center text-white/50 font-black"
                >A</button>
              </div>
            </div>
          </div>

          {/* Start / Quick - Blue Accents */}
          <div className="flex justify-center gap-10 mt-2 mb-6">
            {/* QUICK 버튼 - 포트폴리오로 바로 이동 */}
            <div className="group relative flex flex-col items-center gap-2">
              {/* 툴팁 */}
              <div className="
                absolute bottom-full mb-3 left-1/2 -translate-x-1/2
                pointer-events-none
                opacity-0 group-hover:opacity-100
                translate-y-1 group-hover:translate-y-0
                transition-all duration-200 ease-out
                whitespace-nowrap
              ">
                <div className="bg-[#2d321d] text-[#d9f99d] pixel-font text-[7px] font-bold px-2 py-1 rounded-sm">
                  → PORTFOLIO 바로가기
                </div>
                {/* 툴팁 꼬리 */}
                <div className="w-2 h-2 bg-[#2d321d] rotate-45 mx-auto -mt-1" />
              </div>

              <button
                onClick={onSelect}
                className="w-14 h-4 bg-[#3b82f6] rounded-full border-b-4 border-[#1d4ed8] active:translate-y-1 active:border-b-0 group-hover:bg-[#60a5fa] transition-colors"
              />
              <span className="text-[9px] font-black text-slate-300 group-hover:text-[#93c5fd] transition-colors">QUICK</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={onStart}
                className="w-14 h-4 bg-[#3b82f6] rounded-full border-b-4 border-[#1d4ed8] active:translate-y-1 active:border-b-0"
              ></button>
              <span className="text-[9px] font-black text-slate-300">START</span>
            </div>
          </div>

          {/* Speaker Grill */}
          <div className="absolute bottom-10 right-10 flex flex-col gap-2.5 -rotate-45 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-16 h-1.5 bg-slate-300 rounded-full"></div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
