import { ColorPicker, useColor, type IColor } from 'react-color-palette';

import { useSettings } from '@/stores/useSettings';
import { cn } from '@/utils/classNames';

import 'react-color-palette/css';

const ThemeCustomized = () => {
  const { themeMode, pointColor, setPointColor } = useSettings();
  const [color, setColor] = useColor(pointColor.hex);
  const isDark = themeMode === 'dark';

  const handleChange = (selectedColor: IColor) => {
    setColor(selectedColor);
    setPointColor(selectedColor);
  };

  return (
    <div
      className={cn(
        'w-72 h-full flex flex-col px-5 py-6 gap-6',
        isDark ? 'bg-[#181717] text-white' : 'bg-[#fafafa] text-[#181717]',
      )}
    >
      {/* 헤더 */}
      <div className='flex items-center gap-3'>
        <span
          className={cn(
            'text-[10px] font-black tracking-widest uppercase shrink-0',
            isDark ? 'text-white/40' : 'text-black/40',
          )}
        >
          Point Color
        </span>
        <div className={cn('flex-1 h-px', isDark ? 'bg-white/10' : 'bg-black/8')} />
      </div>

      {/* 현재 색상 프리뷰 */}
      <div className='flex items-center gap-3'>
        <div
          className='w-8 h-8 rounded-full shadow-sm shrink-0'
          style={{ backgroundColor: pointColor.hex }}
        />
        <div className='flex flex-col gap-0.5'>
          <span className={cn('text-xs font-semibold', isDark ? 'text-white/80' : 'text-black/70')}>
            {pointColor.hex.toUpperCase()}
          </span>
          <span className={cn('text-[10px]', isDark ? 'text-white/30' : 'text-black/30')}>
            현재 포인트 색상
          </span>
        </div>
      </div>

      {/* 컬러 피커 */}
      <div
        className={cn(
          '[&_.rcp]:rounded-xl [&_.rcp]:shadow-none',
          isDark
            ? '[&_.rcp]:bg-transparent [&_.rcp-field-input]:bg-white/8 [&_.rcp-field-input]:text-white [&_.rcp-field-label]:text-white/40'
            : '[&_.rcp]:bg-transparent [&_.rcp-field-input]:bg-black/5 [&_.rcp-field-input]:text-[#181717] [&_.rcp-field-label]:text-black/40',
        )}
      >
        <ColorPicker color={color} onChange={handleChange} />
      </div>

      {/* 프리셋 */}
      <div className='flex flex-col gap-3'>
        <span className={cn('text-[10px] font-black tracking-widest uppercase', isDark ? 'text-white/40' : 'text-black/40')}>
          Presets
        </span>
        <div className='flex flex-wrap gap-2'>
          {[
            '#5467f5', '#ef4444', '#f59e0b', '#22c55e',
            '#06b6d4', '#a855f7', '#ec4899', '#64748b',
          ].map(hex => (
            <button
              key={hex}
              onClick={() => handleChange({ ...color, hex })}
              className={cn(
                'w-7 h-7 rounded-full transition-all duration-150 hover:scale-110',
                pointColor.hex.toLowerCase() === hex ? 'ring-2 ring-offset-2 scale-110' : '',
                isDark ? 'ring-offset-[#181717]' : 'ring-offset-[#fafafa]',
              )}
              style={{ backgroundColor: hex, ringColor: hex }}
              title={hex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomized;
