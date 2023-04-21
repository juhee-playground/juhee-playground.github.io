import React from 'react';

import { useState } from 'react';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

const ToggleChip = ({ label, clickable, parentFunction }: CustomChip) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    if (parentFunction) {
      parentFunction(label);
    }
  };

  let icon;

  if (selected) {
    icon = <CheckIcon />;
  }

  return (
    <Chip
      sx={{ borderRadius: 1 }}
      label={label}
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
