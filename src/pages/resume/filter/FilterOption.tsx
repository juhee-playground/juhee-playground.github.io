import { useState } from 'react';

import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';

import { firstLetterToUpper } from '@/utils/String';

import './filterOption.scss';

interface Props {
  title: string;
  options: string[];
  selected: string[];
  pointColor?: string;
  colorOptions?: SelectProperty[];
  onChange(option: string, key: string): void;
}

const FilterOption = ({ title, options, colorOptions, pointColor, selected, onChange }: Props) => {
  const [selectedChips, setSelectedChips] = useState(selected);
  
  const clickedChip = (chipLabel: string) => {
    onChange(chipLabel, title);
    onChangeSelected(chipLabel);
  };

  const onChangeSelected = (label: string) => {
    setSelectedChips((prevState: string[]) => {
      const copyState = [...prevState];
      if(copyState.includes(label)) {
        copyState.splice(copyState.indexOf(label), 1);
      }else {
        copyState.push(label);
      }
      return copyState;
    });
  }

  return (
    <li className='list__item'>
      <div className='filter__left'>
        <span className='text'>{firstLetterToUpper(title)}</span>
      </div>
      <div className='filter__chips'>
        {colorOptions
          ? colorOptions.map((select: SelectProperty) => {
              const { id, name, color } = select;
              return (
                <DChip
                  key={id}
                  selectedItems={selectedChips}
                  label={name}
                  size='small'
                  color={color}
                  clickable
                  handleChipSelect={clickedChip}
                />
              );
            })
          : options.map((name: string, index: number) => (
              <ToggleChip key={`${title}_${index}`} label={name} checked={selectedChips.includes(name)} color={pointColor} handleChipSelect={clickedChip} />
            )
        )}
      </div>
    </li>
  );
};

export default FilterOption;
