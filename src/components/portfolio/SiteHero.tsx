import { motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

import { getGameBoyPalette } from './gameboyPalette';

interface ISiteHeroProps {
  onScrollToProjects: () => void;
}

const STATUS_BULLETS = [
  'Building frontend systems at Tindlo',
  'Open to new opportunities & collaborations',
  'Side projects always in progress',
];

const leftVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const SiteHero = ({ onScrollToProjects }: ISiteHeroProps) => {
  const isDark = useTheme().palette.mode === 'dark';
  const gb = getGameBoyPalette(isDark);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center'>

      {/* ─── Left ─── */}
      <motion.div
        className='flex flex-col gap-5'
        variants={leftVariants}
        initial='hidden'
        animate='show'
      >
        <motion.p
          variants={itemVariant}
          className='pixel-font text-[9px] tracking-[0.15em] uppercase'
          style={{ color: gb.accent }}
        >
          ▸ Frontend Developer
        </motion.p>

        <motion.h1
          variants={itemVariant}
          className='text-5xl md:text-6xl font-black tracking-tight leading-none'
          style={{ color: gb.text }}
        >
          BAEK<br />JU HEE
        </motion.h1>

        <motion.p
          variants={itemVariant}
          className='text-base leading-relaxed max-w-[420px]'
          style={{ color: gb.textDim }}
        >
          복잡한 워크플로우를 직관적인 인터페이스로.
          <br />
          프론트엔드 시스템을 설계하고 빌드합니다.
        </motion.p>

        <motion.div variants={itemVariant} className='flex flex-wrap gap-3 pt-1'>
          <button
            onClick={onScrollToProjects}
            className='pixel-font text-[9px] px-5 py-3 transition-all hover:-translate-y-0.5 active:translate-y-0.5'
            style={{
              backgroundColor: gb.accent,
              color: gb.accentInk,
              border: `2px solid ${gb.accent}`,
              borderRadius: 4,
              boxShadow: `3px 3px 0 ${gb.border}`,
            }}
          >
            PROJECTS
          </button>
          <a
            href='/resume'
            className='pixel-font text-[9px] px-5 py-3 transition-all hover:-translate-y-0.5 active:translate-y-0.5'
            style={{
              color: gb.text,
              border: `2px solid ${gb.border}`,
              borderRadius: 4,
              boxShadow: `3px 3px 0 ${gb.border}`,
            }}
          >
            RESUME
          </a>
        </motion.div>
      </motion.div>

      {/* ─── Right: Status card ─── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='p-6 flex flex-col gap-5'
        style={{
          backgroundColor: gb.panel,
          border: `2px solid ${gb.border}`,
          borderRadius: 4,
          boxShadow: `3px 3px 0 ${gb.border}`,
        }}
      >
        <div className='flex items-center gap-2'>
          <span
            className='w-2 h-2 shrink-0 animate-pulse'
            style={{ backgroundColor: gb.accent }}
          />
          <span className='pixel-font text-[9px] tracking-wider uppercase' style={{ color: gb.text }}>
            Current Status
          </span>
        </div>

        <ul className='flex flex-col gap-3'>
          {STATUS_BULLETS.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className='flex items-start gap-2.5'
            >
              <span
                className='mt-1.5 w-1.5 h-1.5 shrink-0'
                style={{ backgroundColor: gb.accent }}
              />
              <span className='text-sm leading-relaxed' style={{ color: gb.textDim }}>
                {line}
              </span>
            </motion.li>
          ))}
        </ul>

        <div
          className='pt-4 flex items-center justify-between'
          style={{ borderTop: `2px solid ${gb.border}` }}
        >
          <span className='pixel-font text-[7px] uppercase tracking-wider' style={{ color: gb.textDim }}>
            Last update
          </span>
          <span className='pixel-font text-[8px] tabular-nums' style={{ color: gb.text }}>
            2025.03
          </span>
        </div>
      </motion.div>

    </div>
  );
};

export default SiteHero;
