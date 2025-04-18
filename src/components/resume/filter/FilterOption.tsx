import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';
import { formatFirstLetterToUpper } from '@/utils/formatter';

import './filterOption.scss';

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
    <li className='list__item'>
      <p className='filter__left'>
        <span className='text'>{formatFirstLetterToUpper(title)}</span>
      </p>

      <div className='filter__chips'>
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
