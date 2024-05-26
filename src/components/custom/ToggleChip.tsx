import { useEffect, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

const ToggleChip = ({ label, color, checked, handleChipSelect }: ToggleChip) => {
  const [selected, setSelected] = useState(true);

  useEffect(() => {
    setSelected(checked);
  }, [checked]);

  const handleClick = () => {
    setSelected(prevState => !prevState);
    if (handleChipSelect) {
      handleChipSelect(label);
    }
  };
  const theme = useTheme();

  let icon;

  if (selected) {
    icon = <CheckIcon data-testid='check-icon' />;
  }
  

  return (
    <Chip
      className={`chip__toggle chip__toggle--${theme.palette.mode}`}
      aria-pressed={selected}
      sx={{ borderRadius: 1 }}
      style={selected ? { color: color, borderColor: color } : { color: 'grey' }}
      label={label}
      size='small'
      variant='outlined'
      color={selected ? 'primary' : 'default'}
      icon={icon}
      clickable
      onClick={handleClick}
    />
  );
};

export default ToggleChip;
