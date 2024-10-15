import { useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { NOTION_COLOR_SET } from '@/constants/notion';

const DEFAULT_NOTION_COLOR = {
  bg: 'default',
  text: 'grey',
};

const NOT_FOUND = -1;

function DChip({ color = 'deafult', selectedItems = [], size, label, clickable, handleChipSelect }: ICustomChip) {
  const [selected, setSelected] = useState(false);

  const handleClick = (): void => {
    if (clickable) {
      setSelected(prevState => !prevState);
    }

    if (handleChipSelect) {
      handleChipSelect(label);
    }
  };

  const isMainSkillChip = color !== 'grey' && !clickable;
  const colorSet = selected || isMainSkillChip ? NOTION_COLOR_SET[color] : DEFAULT_NOTION_COLOR;

  const customTheme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: colorSet.bg,
            color: colorSet.text,
            borderColor: colorSet.bg,
          },
        },
      },
    },
  });

  useEffect(() => {
    setSelected(selectedItems.indexOf(label) > NOT_FOUND);
  }, [selectedItems, label]);

  // FIXME: 여기에 따로 theme provider를 붙인 이유가 궁금합니다.
  return (
    <ThemeProvider theme={customTheme}>
      <Chip
        sx={{ borderRadius: 1 }}
        label={<div className='dChip__label'> {label}</div>}
        size={size}
        variant='outlined'
        icon={selected && clickable ? <CheckIcon data-testid='check-icon' /> : undefined}
        clickable={clickable}
        onClick={handleClick}
      />
    </ThemeProvider>
  );
}

export default DChip;
