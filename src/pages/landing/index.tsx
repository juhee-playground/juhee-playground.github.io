import { useState, useCallback } from 'react';
import { GameBoyFrame } from '@/components/landing/gameBoyFrame';
import { PortfolioState } from './types';

const LandingPage = () => {
  const [gameState, setGameState] = useState<PortfolioState>(PortfolioState.START);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [menuIndex, setMenuIndex] = useState(0);

  const menuItems = [
    { label: '이력서', state: PortfolioState.RESUME },
    { label: '대시보드', state: PortfolioState.DASHBOARD },
    { label: '포트폴리오', state: PortfolioState.PORTFOLIO }
  ];

  const handleStart = useCallback(() => {
    if (gameState === PortfolioState.START) {
      setGameState(PortfolioState.MENU);
    } else if (gameState !== PortfolioState.MENU) {
      setGameState(PortfolioState.MENU);
    }
  }, [gameState]);

  const handleSelect = useCallback(() => {
    if (gameState === PortfolioState.START) {
      setGameState(PortfolioState.MENU);
    }
  }, [gameState]);

  const handleDPad = useCallback((direction: string) => {
    if (gameState === PortfolioState.MENU) {
      if (direction === 'up') {
        setMenuIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
      } else if (direction === 'down') {
        setMenuIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
      }
    }
  }, [gameState, menuItems.length]);

  const handleAction = useCallback((btn: 'A' | 'B') => {
    if (!isPowerOn) return;

    if (gameState === PortfolioState.START) {
      if (btn === 'A') setGameState(PortfolioState.MENU);
    } else if (gameState === PortfolioState.MENU) {
      if (btn === 'A') {
        setGameState(menuItems[menuIndex].state);
      } else if (btn === 'B') {
        setGameState(PortfolioState.START);
      }
    } else {
      if (btn === 'B') {
        setGameState(PortfolioState.MENU);
      }
    }
  }, [gameState, menuIndex, isPowerOn, menuItems]);


  return (
    <section className="min-h-screen w-full flex items-center justify-center">
      <GameBoyFrame 
        gameState={gameState}
        menuIndex={menuIndex}
        isPowerOn={isPowerOn}
        onStart={handleStart}
        onSelect={handleSelect}
        onAction={handleAction}
        onDPad={handleDPad}
        onPowerToggle={() => setIsPowerOn(prev => !prev)}
      />
      
      <div className="fixed bottom-10 right-10 text-slate-300 pointer-events-none select-none">
        <p className="text-[10px] tracking-widest font-bold">PORTFOLIO v1.1</p>
      </div>
    </section>
  );
};

export default LandingPage;

