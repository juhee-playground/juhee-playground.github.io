import Stack from '@mui/material/Stack';
import DChip from '@/components/custom/DChip';
import ToggleChip from '@/components/custom/ToggleChip';

import { firstLetterToUpper } from '@/utils/String';

import './filterOption.scss';

interface Props {
  type: string;
  options: string[];
  colorOptions?: SelectProperty[];
  pointColor?: string;
  selected: FilterSelected;
  onChange(option: string, key: string): void;
}

const FilterOption = ({ type, options, colorOptions, pointColor, selected, onChange }: Props) => {
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
                    selectedItems={selected[type]}
                    label={name}
                    size='small'
                    color={color}
                    clickable
                    handleChipSelect={clickedChip}
                  />
                );
              })
            : options.map((name: string, index: number) => (
                <ToggleChip key={`${type}_${index}`} label={name} color={pointColor} handleChipSelect={clickedChip} />
              ))}
        </Stack>
      </div>
    </li>
  );
};

export default FilterOption;
