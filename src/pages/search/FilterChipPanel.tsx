import { cn } from '@/utils/classNames';

interface IFilterChipItem {
  readonly name: string;
  readonly count: number;
}

interface IFilterChipPanelProps {
  readonly title: string;
  readonly items: readonly IFilterChipItem[];
  readonly selectedName: string | null;
  readonly emptyText: string;
  readonly panelClass: string;
  readonly mutedText: string;
  readonly chipIdle: string;
  readonly activeColor: string;
  readonly onSelect: (name: string | null) => void;
}

export const FilterChipPanel = ({
  title,
  items,
  selectedName,
  emptyText,
  panelClass,
  mutedText,
  chipIdle,
  activeColor,
  onSelect,
}: IFilterChipPanelProps) => (
  <section className={cn('rounded-xl border p-4', panelClass)}>
    <div className='mb-2 flex items-center justify-between'>
      <h2 className='text-xs font-bold tracking-wider uppercase'>
        {title} ({items.length})
      </h2>
      {selectedName && (
        <button type='button' className={cn('text-[11px]', mutedText)} onClick={() => onSelect(null)}>
          clear
        </button>
      )}
    </div>
    <div className='flex max-h-40 flex-wrap gap-2 overflow-y-auto'>
      {items.length === 0 && <p className={cn('text-xs', mutedText)}>{emptyText}</p>}
      {items.map(item => {
        const isActive = selectedName === item.name;
        return (
          <button
            key={item.name}
            type='button'
            onClick={() => onSelect(isActive ? null : item.name)}
            className={cn('rounded-md px-2.5 py-1 text-xs transition-colors', isActive ? 'text-[#111]' : chipIdle)}
            style={isActive ? { backgroundColor: activeColor } : undefined}
          >
            {item.name}
            <span className='ml-1 opacity-60'>{item.count}</span>
          </button>
        );
      })}
    </div>
  </section>
);
