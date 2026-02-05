import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameBoyFrame } from '@/components/landing/gameBoyFrame';
import { PortfolioState, PowerState } from './types';

const LandingPage = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<PortfolioState>(PortfolioState.START);
  const [powerState, setPowerState] = useState<PowerState>('on');
  const [menuIndex, setMenuIndex] = useState(0);
  const [detailIndex, setDetailIndex] = useState(0); // 0: 페이지 네비게이션, 1: DETAILS
  const [resumePage, setResumePage] = useState(0);
  const [dashboardPage, setDashboardPage] = useState(0);
  
  const isPowerOn = powerState === 'on';
  const isAnimating = powerState === 'powering-on' || powerState === 'powering-off';

  const menuItems = [
    { label: '이력서', state: PortfolioState.RESUME },
    { label: '대시보드', state: PortfolioState.DASHBOARD },
    { label: '포트폴리오', state: PortfolioState.PORTFOLIO }
  ];

  const handleStart = useCallback(() => {
    if (powerState !== 'on') return;
    
    if (gameState === PortfolioState.START) {
      setGameState(PortfolioState.MENU);
    } else if (gameState !== PortfolioState.MENU) {
      setGameState(PortfolioState.MENU);
    }
  }, [gameState, powerState]);

  const handleSelect = useCallback(() => {
    if (powerState !== 'on') return;
    // QUICK 버튼: 이력서 페이지로 바로 이동
    navigate('/resume');
  }, [navigate, powerState]);

  const handleDPad = useCallback((direction: string) => {
    if (powerState !== 'on') return;
    
    if (gameState === PortfolioState.MENU) {
      if (direction === 'up') {
        setMenuIndex(prev => (prev > 0 ? prev - 1 : menuItems.length - 1));
      } else if (direction === 'down') {
        setMenuIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : 0));
      }
    } else if (gameState === PortfolioState.RESUME) {
      if (direction === 'up' || direction === 'down') {
        setDetailIndex(prev => (prev === 0 ? 1 : 0));
      } else if (direction === 'left' && detailIndex === 0) {
        setResumePage(prev => Math.max(prev - 1, 0));
      } else if (direction === 'right' && detailIndex === 0) {
        setResumePage(prev => Math.min(prev + 1, 2)); // resumePages.length - 1
      }
    } else if (gameState === PortfolioState.DASHBOARD) {
      if (direction === 'left') {
        setDashboardPage(prev => Math.max(prev - 1, 0));
      } else if (direction === 'right') {
        setDashboardPage(prev => Math.min(prev + 1, 2)); // dashboardPages.length - 1
      }
    }
  }, [gameState, menuItems.length, detailIndex]);

  const handlePowerToggle = useCallback(() => {
    if (isAnimating) return;
    
    if (powerState === 'on') {
      // Turning OFF
      setPowerState('powering-off');
      setTimeout(() => {
        setPowerState('off');
      }, 400);
    } else if (powerState === 'off') {
      // Turning ON - 초기 상태로 리셋
      setPowerState('powering-on');
      // 게임 상태 초기화
      setGameState(PortfolioState.START);
      setMenuIndex(0);
      setDetailIndex(0);
      setResumePage(0);
      setDashboardPage(0);
      setTimeout(() => {
        setPowerState('on');
      }, 400);
    }
  }, [powerState, isAnimating]);

  const handleAction = useCallback((btn: 'A' | 'B') => {
    if (powerState !== 'on') return;

    if (gameState === PortfolioState.START) {
      if (btn === 'A') setGameState(PortfolioState.MENU);
    } else if (gameState === PortfolioState.MENU) {
      if (btn === 'A') {
        setGameState(menuItems[menuIndex].state);
      } else if (btn === 'B') {
        setGameState(PortfolioState.START);
      }
    } else if (gameState === PortfolioState.RESUME) {
      if (btn === 'A' && detailIndex === 1) {
        // DETAILS 선택 시 resume 페이지로 이동
        navigate('/resume');
      } else if (btn === 'B') {
        setGameState(PortfolioState.MENU);
        setDetailIndex(0);
        setResumePage(0);
      }
    } else {
      if (btn === 'B') {
        setGameState(PortfolioState.MENU);
      }
    }
  }, [gameState, menuIndex, isPowerOn, menuItems, detailIndex]);

  const handleDetailsClick = useCallback(() => {
    if (gameState === PortfolioState.RESUME) {
      navigate('/resume');
    }
  }, [gameState, navigate]);

  // 키보드 이벤트 리스너
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (powerState !== 'on') return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          handleDPad('up');
          break;
        case 'ArrowDown':
          event.preventDefault();
          handleDPad('down');
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handleDPad('left');
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleDPad('right');
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          handleAction('A');
          break;
        case 'Escape':
        case 'Backspace':
          event.preventDefault();
          handleAction('B');
          break;
        case 's':
        case 'S':
          event.preventDefault();
          handleStart();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [powerState, handleDPad, handleAction, handleStart]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-6">
      <GameBoyFrame 
        gameState={gameState}
        menuIndex={menuIndex}
        detailIndex={detailIndex}
        resumePage={resumePage}
        dashboardPage={dashboardPage}
        isPowerOn={isPowerOn}
        onStart={handleStart}
        onSelect={handleSelect}
        onAction={handleAction}
        onDPad={handleDPad}
        onPowerToggle={handlePowerToggle}
        onPageChange={setResumePage}
        onDashboardPageChange={setDashboardPage}
        powerState={powerState}
        onDetailsClick={handleDetailsClick}
      />
      
      <div className="fixed bottom-10 right-10 text-slate-300 pointer-events-none select-none">
        <p className="text-[10px] tracking-widest font-bold">PORTFOLIO v1.1</p>
      </div>
    </section>
  );
};

export default LandingPage;

