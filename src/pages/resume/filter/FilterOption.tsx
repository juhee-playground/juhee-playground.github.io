import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';

import { firstLetterToUpper } from '@/utils/formatter';

import './filterOption.scss';

interface Props {
  title: string;
  options: string[];
  selected?: string[];
  pointColor?: string;
  colorOptions?: SelectProperty[];
  onChange(option: string): void;
}

const FilterOption = ({ title, options, colorOptions, pointColor, selected, onChange }: Props) => {
  return (
    <li className='list__item'>
      <p className='filter__left'>
        <span className='text'>{firstLetterToUpper(title)}</span>
      </p>

      <div className='filter__chips'>
        {colorOptions
          ? colorOptions.map(({ id, name, color }: SelectProperty) => (
              <DChip
                key={id}
                selectedItems={selected}
                label={name}
                size='small'
                color={color}
                clickable
                handleChipSelect={onChange}
              />
            ))
          : options.map((name: string, index: number) => (
              <ToggleChip
                key={`${title}_${index}`}
                label={name}
                checked={(selected || []).includes(name)}
                color={pointColor}
                handleChipSelect={onChange}
              />
            ))}
      </div>
    </li>
  );
};

export default FilterOption;
