import { useTheme } from '@mui/material/styles';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

interface ICardProps {
  image?: string;
  name: string;
  count: number;
  unit?: string;
}

const CardV2 = ({ image, name, count, unit }: ICardProps) => {
  const isDark = useTheme().palette.mode === 'dark';
  const { pointColor } = useSettings();

  return (
    <div
      className={cn(
        'rounded-2xl px-4 py-5 min-w-[80px] flex flex-col items-center justify-center text-center gap-2',
        isDark
          ? 'bg-white/5 border border-white/10'
          : 'bg-white border border-black/7',
      )}
    >
      {image ? (
        <img src={image} alt={name} width={36} height={36} />
      ) : (
        <p className={cn('text-[11px] font-semibold leading-tight', isDark ? 'text-white/55' : 'text-black/50')}>
          {name}
        </p>
      )}

      <div className='flex flex-col items-center gap-0.5'>
        <span className='text-2xl font-black leading-none' style={{ color: pointColor.hex }}>
          {count}
        </span>
        {unit && (
          <span className={cn('text-[10px] font-medium', isDark ? 'text-white/35' : 'text-black/35')}>
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

export default CardV2;
