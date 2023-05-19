import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'redux/store';

import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

const ToggleChip = ({ selected, label, clickable, parentFunction }: CustomChip) => {
  const handleClick = () => {
    if (parentFunction) {
      parentFunction(label);
    }
  };
  const { pointColor } = useSelector((state: RootState) => state.pointColor);
  const theme = useTheme();

  let icon;
  if (selected) {
    icon = <CheckIcon />;
  }

  return (
    <Chip
      className={`chip__toggle chip__toggle--${theme.palette.mode}`}
      sx={{ borderRadius: 1 }}
      style={{ color: pointColor, borderColor: pointColor }}
      label={<div className='dChip__label'> {label}</div>}
      size='small'
      variant='outlined'
      color={selected ? 'primary' : 'default'}
      icon={icon}
      clickable={clickable}
      onClick={handleClick}
    />
  );
};

export default ToggleChip;
