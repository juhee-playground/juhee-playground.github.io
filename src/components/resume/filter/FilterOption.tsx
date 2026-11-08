import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';
import { formatFirstLetterToUpper } from '@/utils/formatter';
import { cn } from '@/utils/classNames';

interface IFilterOptionProps {
  title: string;
  options: string[];
  selected?: string[];
  color?: string;
  colorOptions?: ISelectProperty[];
  onChange(option: string): void;
  onToggleAll?: () => void;
}

const FilterOption = ({
  title,
  options,
  colorOptions,
  color,
  selected,
  onChange,
  onToggleAll,
}: IFilterOptionProps) => {
  const selectedCount = (selected || []).length;
  const isAllSelected = options.length > 0 && selectedCount === options.length;
  const label = formatFirstLetterToUpper(title);

  return (
    <li className='flex items-start my-1 md:flex-row flex-col'>
      <div className='mr-4 w-full md:w-36 shrink-0 border-[#dddddd] py-2 px-2 flex items-center justify-start'>
        {onToggleAll && options.length > 0 ? (
          <button
            type='button'
            onClick={onToggleAll}
            aria-pressed={isAllSelected}
            aria-label={isAllSelected ? `${title} 전체 해제` : `${title} 전체 선택`}
            title={isAllSelected ? '전체 해제' : '전체 선택'}
            className={cn(
              'pixel-font text-sm font-bold whitespace-nowrap transition-colors',
              isAllSelected ? 'text-[#111827]' : 'text-[#9ca3af] hover:text-[#6b7280]',
            )}
          >
            {label}
          </button>
        ) : (
          <span className='pixel-font text-sm font-bold text-[#4b5563] whitespace-nowrap'>{label}</span>
        )}
      </div>

      <div className='flex flex-wrap gap-2 flex-1 min-w-0 py-2 px-2'>
        {colorOptions
          ? colorOptions.map(({ id, name, color: chipColor }: ISelectProperty) => (
              <DChip
                key={id}
                selectedItems={selected}
                label={name}
                size='small'
                color={chipColor}
                clickable
                handleChipSelect={onChange}
              />
            ))
          : options.map((name: string, index: number) => (
              <ToggleChip
                key={`${title}_${index}`}
                label={name}
                checked={(selected || []).includes(name)}
                color={color}
                handleChipSelect={onChange}
              />
            ))}
      </div>
    </li>
  );
};

export default FilterOption;
