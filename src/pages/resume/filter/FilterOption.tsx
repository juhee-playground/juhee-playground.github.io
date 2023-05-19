import React from 'react';

import Stack from '@mui/material/Stack';
import DChip from 'components/custom/DChip';
import ToggleChip from 'components/custom/ToggleChip';

import { firstLetterToUpper } from 'utils/String';

interface Props {
  type: string;
  options: string[];
  colorOptions?: SelectProperty[];
  selected: FilterSelected;
  onChange(option: string, key: string): void;
}

const FilterOption = ({ type, options, colorOptions, selected, onChange }: Props) => {
  const clickedChip = (state: string) => {
    onChange(state, type);
  };

  return (
    <li className='list__item'>
      <div className='filter__left'>
        <span className='text'>{firstLetterToUpper(type)}</span>
      </div>
      <div className='filter__chips'>
        <Stack direction='row' flexWrap='wrap' spacing={1} useFlexGap>
          {colorOptions
            ? colorOptions.map((select: SelectProperty) => {
                const { id, name, color } = select;
                return (
                  <DChip
                    key={id}
                    selected={selected[type].indexOf(name) !== -1}
                    label={name}
                    size='small'
                    color={color}
                    clickable={true}
                    parentFunction={clickedChip}
                  />
                );
              })
            : options.map((name: string, index: number) => (
                <ToggleChip
                  key={`${type}_${index}`}
                  selected={selected[type].indexOf(name) !== -1}
                  label={name}
                  color='primary'
                  clickable={true}
                  parentFunction={clickedChip}
                />
              ))}
        </Stack>
      </div>
    </li>
  );
};

export default FilterOption;
