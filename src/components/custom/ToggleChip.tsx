import React from 'react';

import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

const ToggleChip = ({ selected, label, color, clickable, handleChipSelect }: CustomChip) => {
  const handleClick = () => {
    if (handleChipSelect) {
      handleChipSelect(label);
    }
  };
  const theme = useTheme();

  let icon;

  if (selected) {
    icon = <CheckIcon />;
  }

  return (
    <Chip
      className={`chip__toggle chip__toggle--${theme.palette.mode}`}
      sx={{ borderRadius: 1 }}
      style={selected ? { color: color, borderColor: color } : { color: 'grey' }}
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
