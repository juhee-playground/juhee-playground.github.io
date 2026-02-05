import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';
import { formatFirstLetterToUpper } from '@/utils/formatter';

interface IFilterOptionProps {
  title: string;
  options: string[];
  selected?: string[];
  color?: string;
  colorOptions?: ISelectProperty[];
  onChange(option: string): void;
}

const FilterOption = ({ title, options, colorOptions, color, selected, onChange }: IFilterOptionProps) => {
  return (
    <li className='flex items-center my-2 md:flex-row flex-col'>
      <p className='mr-4 w-[15%] border-r-2 border-[#dddddd] py-2 px-2 flex items-center justify-center md:border-r-2 md:self-auto md:border-r self-start border-r-0'>
        <span className='text-sm font-bold'>{formatFirstLetterToUpper(title)}</span>
      </p>

      <div className='flex flex-wrap gap-2 w-[75%] py-2 px-2'>
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
