import { PortfolioState } from '@/pages/landing/types';

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
  const menuItems = ['RESUME', 'DASHBOARD',];

  const resumePages = [
    // ======================
    // PAGE 1: SKILLS / EXP
    // ======================
    (
      <>
        <p className="font-bold underline mb-1">SKILLS:</p>
        <p>- REACT / TYPESCRIPT</p>
        <p>- TAILWIND / SCSS</p>
        <p>- NEXT.JS / VITE</p>

        <p className="mt-3 font-bold underline mb-1">EXP:</p>
        <p>- 5+ YEARS FRONT-END</p>
        <p>- Frontend Systems Builder</p>
      </>
    ),

    // ======================
    // PAGE 2: INFO / CONTACT
    // ======================
    (
      <>
        <p className="font-bold underline mb-1">PROFILE:</p>
        <p>- BAEK JU HEE</p>
        <p>- FRONTEND DEVELOPER</p>

        <p className="mt-3 font-bold underline mb-1">CONTACT:</p>
        <p>- EMAIL:</p>
        <p className="pl-2 break-all">gogumangoguma@gmail.com</p>
        <p>- GITHUB:</p>
        <p className="pl-2 break-all">github.com/juhee-playground</p>
      </>
    ),

    // ======================
    // PAGE 3: EDUCATION / WORK
    // ======================
    (
      <>
        <p className="font-bold underline mb-1">EDUCATION:</p>
        <p>- 한양여자대학교 (Feb 2014) </p>

        <p className="mt-3 font-bold underline mb-1">WORK:</p>
        <p>- YU Partners (11 months)</p>
        <p>- Fitogether (4 years 4 months)</p>
        <p>- Tindlo (Currently) </p>

        {/* ✅ RESUME LINK */}
        <p className="mt-3 font-bold flex items-center gap-1">
          <span className={detailIndex === 1 ? 'visible animate-pulse' : 'invisible'}>▶</span>
          <span 
            className={`ml-1 underline cursor-pointer ${detailIndex === 1 ? 'bg-[#2d321d] text-[#d9f99d] px-1' : ''}`}
            onClick={onDetailsClick}
            onMouseEnter={() => {
              // 마우스 호버 시 선택 효과 (선택적)
            }}
          >
            CLICK TO DETAILS
          </span>
        </p>
      </>
    ),
  ];

  const dashboardPages = [
    // PAGE 1: CAREER TIMELINE
    (
      <>
<p className="font-bold underline mb-1">CAREER TIMELINE:</p>
<pre className="whitespace-pre font-mono text-[10px] text-[#1a1c10]">
{`2017 ─── YU PARTNERS (11M)
2018 ────────────── FITOGETHER (4Y4M)
2024 ─── FREELANCE (9M)
2025 ─── TINDLO (NOW)`}
</pre>
      </>
    ),

    // PAGE 2: STACK USAGE
    (
      <>
<p className="font-bold underline mb-1">STACK USAGE:</p>
<pre className="whitespace-pre font-mono text-[10px] text-[#1a1c10]">
{`REACT   ██████████          50%
NEXT.JS ████                 20%
VUE     ████                 20%
PHP     ██                   10%`}
</pre>
      </>
    ),

    // PAGE 3: RUNNING MODULES
    (
      <>
        <p className="font-bold underline mb-1">RUNNING MODULES:</p>
        <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed font-bold">
{`✓ FRONTEND SYSTEMS LOADED
✓ REFACTOR MODE: ALWAYS ON
✓ COMPLEX UI INTERACTIONS ENABLED
✓ STATE SINGLE SOURCE VERIFIED
✓ FUTURE ME CONSIDERED
✓ SIDE PROJECTS RUNNING`}
        </pre>
      </>
    ),
  ];

  switch (gameState) {
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

      case PortfolioState.RESUME:
        return (
          <div className="h-full text-[#2d321d] space-y-4 pixel-font flex flex-col">
            {/* HEADER */}
            <div className="border-b-2 border-[#2d321d] pb-1 flex justify-between">
              <h3 className="text-[10px] font-bold">RESUME.txt</h3>
              <span className="text-[8px]">
                {resumePage + 1}/{resumePages.length}
              </span>
            </div>
  
            {/* CONTENT */}
            <div className="flex-1 text-[8px] leading-relaxed">
              {resumePages[resumePage]}
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
                {detailIndex === 0 ? 'ARROW: NAV / UP/DOWN: SELECT' : 'A/ENTER: OPEN DETAILS / B/ESC: MENU'}
              </p>
  
              <div className="flex items-center gap-1">
                <button
                  className={`text-[10px] font-bold px-2 ${detailIndex === 0 ? 'bg-[#2d321d] text-[#d9f99d]' : ''} ${resumePage === resumePages.length - 1 ? 'opacity-30' : ''}`}
                  disabled={resumePage === resumePages.length - 1}
                  onClick={() => onPageChange?.(Math.min(resumePage + 1, resumePages.length - 1))}
                >
                  {'>'}
                </button>
              </div>
            </div>
          </div>
        );

    case PortfolioState.DASHBOARD:
      return (
        <div className="h-full text-[#2d321d] space-y-4 pixel-font flex flex-col">
        {/* Header */}
        <div className="border-b-2 border-[#2d321d] pb-1 flex justify-between">
          <h3 className="text-[10px] font-bold">DASHBOARD.SYS</h3>
          <span className="text-[8px]">
            {dashboardPage + 1}/{dashboardPages.length}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 text-[8px] leading-relaxed py-1 flex flex-col justify-center">
          {dashboardPages[dashboardPage]}
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

          <p className="text-[7px] animate-pulse text-center">ARROW: NAV / B: MENU</p>

          <div className="flex items-center gap-1">
            <button
              className="text-[10px] font-bold px-2 bg-[#2d321d] text-[#d9f99d] disabled:opacity-30"
              disabled={dashboardPage === dashboardPages.length - 1}
              onClick={() => onDashboardPageChange?.(Math.min(dashboardPage + 1, dashboardPages.length - 1))}
            >
              {'>'}
            </button>
            <span className="visible animate-pulse text-[10px]">▶</span>
          </div>
        </div>
      </div>
      );

    case PortfolioState.PORTFOLIO:
      return (
        <div className="h-full text-[#2d321d] space-y-3 pixel-font">
          <div className="border-b-2 border-[#2d321d] pb-1">
            <h3 className="text-[10px] font-bold">포트폴리오.rar</h3>
          </div>
          <div className="space-y-2">
            <div className="border border-[#2d321d] p-1 flex justify-between items-center">
              <span className="text-[7px]">8-BIT ENGINE</span>
              <span className="text-[6px] bg-[#2d321d] text-[#d9f99d] px-1">NEW</span>
            </div>
            <div className="border border-[#2d321d] p-1 flex justify-between items-center opacity-60">
              <span className="text-[7px]">PIXEL CHAT</span>
            </div>
            <div className="border border-[#2d321d] p-1 flex justify-between items-center opacity-60">
              <span className="text-[7px]">D3-VISUALS</span>
            </div>
          </div>
          <div className="pt-2 text-center">
            <p className="text-[7px] animate-pulse">PRESS B TO MENU</p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
