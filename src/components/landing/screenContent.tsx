import { useEffect, useState } from 'react';

import { PortfolioState } from '@/pages/landing/types';

const BOOT_LINES = [
  { text: 'BOOTING SYSTEM...', delay: 0 },
  { text: '', delay: 400 },
  { text: 'LOADING MODULES', delay: 800 },
  { text: '', delay: 1000 },
  { text: '  ✓ REACT', delay: 1200 },
  { text: '  ✓ TYPESCRIPT', delay: 1600 },
  { text: '  ✓ D3', delay: 2000 },
  { text: '  ✓ WORKFLOW SYSTEMS', delay: 2400 },
  { text: '', delay: 2800 },
  { text: 'SYSTEM READY', delay: 3000 },
];

const BootScreen = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), BOOT_LINES[i].delay));
    });

    timers.push(setTimeout(() => setShowPrompt(true), 3200));

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="h-full flex flex-col justify-center text-[#2d321d] pixel-font px-1">
      <div className="text-[8px] leading-relaxed space-y-[2px]">
        {BOOT_LINES.slice(0, visibleCount).map((line, i) => (
          <p key={i} className={line.text.startsWith('  ✓') ? 'text-[#3a4a10]' : 'font-bold'}>
            {line.text}
          </p>
        ))}
      </div>
      {showPrompt && (
        <p className="mt-4 text-[8px] animate-pulse text-center">INITIALIZING...</p>
      )}
    </div>
  );
};

interface ScreenContentProps {
  gameState: PortfolioState;
  menuIndex?: number;
  detailIndex?: number;
  resumePage?: number;
  dashboardPage?: number;
  onPageChange?: (page: number) => void;
  onDashboardPageChange?: (page: number) => void;
  onDetailsClick?: () => void;
}

export function ScreenContent({ gameState, menuIndex = 0, detailIndex = 0, resumePage = 0, dashboardPage = 0, onPageChange, onDashboardPageChange, onDetailsClick }: ScreenContentProps) {
  const menuItems = ['PLAYER', 'CAREER LOG', 'PROJECTS'];

  // =====================
  // PLAYER PAGES
  // =====================
  const playerPages = [
    // Page 1: CHARACTER STATS
    (
      <>
        <p className="font-bold underline mb-2">CHARACTER STATS:</p>
        <p>NAME  : BAEK JU HEE</p>
        <p>CLASS : FRONTEND SYSTEM BUILDER</p>
        <p>EXP   : 5+ YEARS</p>

        <p className="mt-3 font-bold underline mb-1">MISSION:</p>
        <p className="leading-relaxed">
          Turning complex workflows<br />
          into usable interfaces.
        </p>
      </>
    ),

    // Page 2: SKILLS LOADED
    (
      <>
        <p className="font-bold underline mb-2">SKILLS LOADED:</p>
        <p>- REACT / TYPESCRIPT</p>
        <p>- TAILWIND / SCSS</p>
        <p>- NEXT.JS / VITE</p>
        <p>- ZUSTAND / REACT QUERY</p>
        <p>- D3 / FRAMER MOTION</p>

        <p className="mt-3 font-bold underline mb-1">PHILOSOPHY:</p>
        <p className="leading-relaxed">
          Build systems,<br />
          not just features.
        </p>
      </>
    ),

    // Page 3: CONTACT
    (
      <>
        <p className="font-bold underline mb-2">CONTACT:</p>
        <p>- EMAIL:</p>
        <p className="pl-2 break-all text-[7px]">gogumangoguma@gmail.com</p>
        <p>- GITHUB:</p>
        <p className="pl-2 break-all text-[7px]">github.com/juhee-playground</p>

        <p className="mt-3 font-bold flex items-center gap-1">
          <span className={detailIndex === 1 ? 'visible animate-pulse' : 'invisible'}>▶</span>
          <span
            className={`ml-1 underline cursor-pointer ${detailIndex === 1 ? 'bg-[#2d321d] text-[#d9f99d] px-1' : ''}`}
            onClick={onDetailsClick}
          >
            FULL RESUME →
          </span>
        </p>
      </>
    ),
  ];

  // =====================
  // CAREER PAGES
  // =====================
  const careerPages = [
    // Page 1: CAREER TIMELINE
    (
      <>
        <p className="font-bold underline mb-2">CAREER TIMELINE:</p>
        <pre className="whitespace-pre font-mono text-[10px] text-[#1a1c10]">
{`2017 ─ YU PARTNERS (11M)
2018 ──────── FITOGETHER (4Y4M)
2024 ─ FREELANCE (9M)
2025 ─ TINDLO (NOW)`}
        </pre>
      </>
    ),

    // Page 2: STACK USAGE
    (
      <>
        <p className="font-bold underline mb-2">STACK USAGE:</p>
        <pre className="whitespace-pre font-mono text-[10px] text-[#1a1c10]">
{`REACT   ██████████   50%
NEXT.JS ████         20%
VUE     ████         20%
PHP     ██           10%`}
        </pre>
      </>
    ),

    // Page 3: RUNNING MODULES
    (
      <>
        <p className="font-bold underline mb-2">RUNNING MODULES:</p>
        <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed font-bold">
{`✓ FRONTEND SYSTEMS LOADED
✓ REFACTOR MODE: ALWAYS ON
✓ COMPLEX UI ENABLED
✓ SINGLE SOURCE VERIFIED
✓ FUTURE ME CONSIDERED
✓ SIDE PROJECTS RUNNING`}
        </pre>
      </>
    ),
  ];

  switch (gameState) {
    case PortfolioState.BOOT:
      return <BootScreen />;

    case PortfolioState.START:
      return (
        <div className="h-full flex flex-col items-center justify-center text-[#2d321d] text-center pixel-font">
          <p className="text-[10px] mb-2">WELCOME TO</p>
          <h2 className="text-xl md:text-2xl mb-8 leading-tight font-black tracking-tighter">JUHEE'S PLAYGROUND</h2>
          <div className="mt-4 border-2 border-[#2d321d] bg-[#d9f99d] px-8 py-3 inline-block animate-blink">
            <p className="text-[10px] font-bold">PRESS START</p>
          </div>
        </div>
      );

    case PortfolioState.MENU:
      return (
        <div className="h-full text-[#2d321d] flex flex-col pixel-font">
          <div className="border-b-2 border-[#2d321d] pb-1 mb-4">
            <h3 className="text-[10px] font-bold">MAIN MENU</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center space-y-4">
            {menuItems.map((item, idx) => (
              <div key={item} className="flex items-center gap-3">
                <span className={`text-[12px] ${menuIndex === idx ? 'visible animate-pulse' : 'invisible'}`}>▶</span>
                <div className={`text-[10px] py-1 px-2 ${menuIndex === idx ? 'bg-[#2d321d] text-[#d9f99d]' : ''}`}>
                  {item}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-[7px] text-center opacity-60">
            DPAD: MOVE / A: SELECT
          </div>
        </div>
      );

    case PortfolioState.PLAYER:
      return (
        <div className="h-full text-[#2d321d] space-y-4 pixel-font flex flex-col">
          {/* HEADER */}
          <div className="border-b-2 border-[#2d321d] pb-1 flex justify-between">
            <h3 className="text-[10px] font-bold">PLAYER.EXE</h3>
            <span className="text-[8px]">
              {resumePage + 1}/{playerPages.length}
            </span>
          </div>

          {/* CONTENT */}
          <div className="flex-1 text-[8px] leading-relaxed">
            {playerPages[resumePage]}
          </div>

          {/* FOOTER */}
          <div className="pt-2 border-t border-[#2d321d]/20 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className={detailIndex === 0 ? 'visible animate-pulse text-[10px]' : 'invisible text-[10px]'}>▶</span>
              <button
                className={`text-[10px] font-bold px-2 ${detailIndex === 0 ? 'bg-[#2d321d] text-[#d9f99d]' : ''} ${resumePage === 0 ? 'opacity-30' : ''}`}
                disabled={resumePage === 0}
                onClick={() => onPageChange?.(Math.max(resumePage - 1, 0))}
              >
                {'<'}
              </button>
            </div>

            <p className="text-[7px] animate-pulse text-center">
              {detailIndex === 0 ? 'ARROW: NAV / A: DETAILS' : 'A/ENTER: OPEN / B/ESC: MENU'}
            </p>

            <div className="flex items-center gap-1">
              <button
                className={`text-[10px] font-bold px-2 ${detailIndex === 0 ? 'bg-[#2d321d] text-[#d9f99d]' : ''} ${resumePage === playerPages.length - 1 ? 'opacity-30' : ''}`}
                disabled={resumePage === playerPages.length - 1}
                onClick={() => onPageChange?.(Math.min(resumePage + 1, playerPages.length - 1))}
              >
                {'>'}
              </button>
            </div>
          </div>
        </div>
      );

    case PortfolioState.CAREER:
      return (
        <div className="h-full text-[#2d321d] space-y-4 pixel-font flex flex-col">
          {/* Header */}
          <div className="border-b-2 border-[#2d321d] pb-1 flex justify-between">
            <h3 className="text-[10px] font-bold">CAREER.LOG</h3>
            <span className="text-[8px]">
              {dashboardPage + 1}/{careerPages.length}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 text-[8px] leading-relaxed py-1 flex flex-col justify-center">
            {careerPages[dashboardPage]}
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-[#2d321d]/20 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="visible animate-pulse text-[10px]">▶</span>
              <button
                className="text-[10px] font-bold px-2 bg-[#2d321d] text-[#d9f99d] disabled:opacity-30"
                disabled={dashboardPage === 0}
                onClick={() => onDashboardPageChange?.(Math.max(dashboardPage - 1, 0))}
              >
                {'<'}
              </button>
            </div>

            <p className="text-[7px] animate-pulse text-center">ARROW: NAV / A: FULL VIEW / B: MENU</p>

            <div className="flex items-center gap-1">
              <button
                className="text-[10px] font-bold px-2 bg-[#2d321d] text-[#d9f99d] disabled:opacity-30"
                disabled={dashboardPage === careerPages.length - 1}
                onClick={() => onDashboardPageChange?.(Math.min(dashboardPage + 1, careerPages.length - 1))}
              >
                {'>'}
              </button>
              <span className="visible animate-pulse text-[10px]">▶</span>
            </div>
          </div>
        </div>
      );

    case PortfolioState.PROJECTS:
      return (
        <div className="h-full text-[#2d321d] space-y-3 pixel-font flex flex-col">
          <div className="border-b-2 border-[#2d321d] pb-1">
            <h3 className="text-[10px] font-bold">PROJECTS.DB</h3>
          </div>

          <div className="flex-1 text-[8px] leading-relaxed space-y-3">
            <div className="border border-[#2d321d] p-2">
              <p className="font-bold mb-1">JUHEE-PLAYGROUND</p>
              <p>PROBLEM : Portfolios lack identity</p>
              <p>SOLUTION: Retro console UI</p>
              <p>STATUS  : <span className="bg-[#2d321d] text-[#d9f99d] px-1">LIVE</span></p>
            </div>
            <div className="border border-[#2d321d] p-2 opacity-60">
              <p className="font-bold mb-1">MORE PROJECTS</p>
              <p className="text-[7px] animate-pulse">PRESS A FOR FULL VIEW →</p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#2d321d]/20 text-center">
            <p className="text-[7px] animate-pulse">A: FULL VIEW / B: MENU</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
