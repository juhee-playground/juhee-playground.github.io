import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import ResumeContainer from '@/components/resume/ResumeContainer';

const ResumePage = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      layoutId="game-screen"
      className="min-h-screen w-full bg-[#d9f99d] text-[#2d321d] flex flex-col"
    >
      {/* 8-bit 상단 헤더 바 */}
      <div className="pixel-font border-b-2 border-[#2d321d]/30 px-6 py-3 flex items-center justify-between shrink-0 bg-[#d9f99d]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-[10px] font-bold border border-[#2d321d] px-3 py-1 hover:bg-[#2d321d] hover:text-[#d9f99d] transition-colors"
          >
            ← BACK
          </button>
          <span className="text-[11px] font-bold tracking-widest">PLAYER.EXE</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] opacity-60">
          <span className="animate-pulse">●</span>
          <span>JUHEE-OS v2.0</span>
        </div>
      </div>

      {/* 기존 이력서 콘텐츠 */}
      <div className="flex-1">
        <ResumeContainer />
      </div>
    </motion.div>
  );
};

export default ResumePage;
