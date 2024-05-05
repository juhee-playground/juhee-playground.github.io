import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import { notionColorSet } from '@/constants/NotionColorSet';

function DChip({ color = 'deafult', selectedItems = [], size, label, clickable, handleChipSelect }: CustomChip) {
  const isSelected = selectedItems.indexOf(label) > -1;
  const [selected, setSelected] = useState(isSelected);

  const handleClick = (): void => {
    if (clickable) {
      setSelected(prevState => !prevState);
    }

    if (handleChipSelect) {
      handleChipSelect(label);
    }
  };

  let icon;

  if (selected && clickable) {
    icon = <CheckIcon data-testid='check-icon' />;
  }
  let notionColor = { bg: 'default', text: 'grey' };
  if (notionColorSet[color]) {
    notionColor = notionColorSet[color];
  }

  const isMainSkillChip = color !== 'grey' && !clickable;
  const customTheme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: selected || isMainSkillChip ? notionColor.bg : 'default',
            color: selected || isMainSkillChip ? notionColor.text : 'grey',
            borderColor: selected || isMainSkillChip ? notionColor.bg : 'grey',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Chip
        sx={{ borderRadius: 1 }}
        label={<div className='dChip__label'> {label}</div>}
        size={size}
        variant='outlined'
        icon={icon}
        clickable={clickable}
        onClick={handleClick}
      />
    </ThemeProvider>
  );
}

export default DChip;
