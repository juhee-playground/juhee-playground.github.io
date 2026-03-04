import { motion } from 'framer-motion';

import { useTheme } from '@mui/material/styles';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

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
  const { pointColor } = useSettings();
  const isDark = useTheme().palette.mode === 'dark';
  const pt = pointColor.hex;

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
          className='text-xs font-bold tracking-[0.25em] uppercase'
          style={{ color: pt }}
        >
          Frontend Developer
        </motion.p>

        <motion.h1
          variants={itemVariant}
          className='text-5xl md:text-6xl font-black tracking-tight leading-none'
        >
          BAEK<br />JU HEE
        </motion.h1>

        <motion.p
          variants={itemVariant}
          className={cn('text-base leading-relaxed max-w-[420px]', isDark ? 'text-white/60' : 'text-black/55')}
        >
          복잡한 워크플로우를 직관적인 인터페이스로.
          <br />
          프론트엔드 시스템을 설계하고 빌드합니다.
        </motion.p>

        <motion.div variants={itemVariant} className='flex flex-wrap gap-3 pt-1'>
          <button
            onClick={onScrollToProjects}
            className='px-5 py-2.5 text-sm font-bold text-white rounded-lg transition-all hover:opacity-80 hover:-translate-y-0.5'
            style={{ backgroundColor: pt }}
          >
            Projects 보기
          </button>
          <a
            href='/resume'
            className={cn(
              'px-5 py-2.5 text-sm font-bold rounded-lg border-2 transition-all hover:-translate-y-0.5',
              isDark
                ? 'border-white/20 hover:border-white/40 text-white'
                : 'border-black/15 hover:border-black/30 text-[#181717]',
            )}
          >
            이력서 보기
          </a>
        </motion.div>
      </motion.div>

      {/* ─── Right: Status card ─── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={cn(
          'rounded-2xl p-6 flex flex-col gap-5',
          isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-black/8',
        )}
      >
        <div className='flex items-center gap-2'>
          <span
            className='w-2 h-2 rounded-full shrink-0 animate-pulse'
            style={{ backgroundColor: pt }}
          />
          <span className='text-xs font-bold tracking-widest uppercase' style={{ color: pt }}>
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
                className='mt-1.5 w-1 h-1 rounded-full shrink-0'
                style={{ backgroundColor: pt }}
              />
              <span className={cn('text-sm leading-relaxed', isDark ? 'text-white/70' : 'text-black/65')}>
                {line}
              </span>
            </motion.li>
          ))}
        </ul>

        <div
          className={cn(
            'pt-4 border-t flex items-center justify-between',
            isDark ? 'border-white/10' : 'border-black/8',
          )}
        >
          <span className={cn('text-[10px] font-semibold uppercase tracking-widest', isDark ? 'text-white/30' : 'text-black/30')}>
            Last update
          </span>
          <span className={cn('text-[11px] font-bold tabular-nums', isDark ? 'text-white/50' : 'text-black/45')}>
            2025.03
          </span>
        </div>
      </motion.div>

    </div>
  );
};

export default SiteHero;
