import { useEffect, useState } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Chip from '@mui/material/Chip';
import { alpha, createTheme, ThemeProvider } from '@mui/material/styles';

import { NOTION_COLOR_SET } from '@/constants/notion';

const DEFAULT_NOTION_COLOR = {
  bg: 'default',
  text: 'grey',
};

const NOT_FOUND = -1;
const CHIP_BORDER_ALPHA = 0.25;
const CHIP_SHADOW_ALPHA = 0.42;
const CHIP_HOVER_SHADOW_ALPHA = 0.3;

function DChip({ color = 'default', selectedItems = [], size, label, clickable, handleChipSelect }: ICustomChip) {
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
  const notionColor = NOTION_COLOR_SET[color] ?? DEFAULT_NOTION_COLOR;
  const colorSet = selected || isMainSkillChip ? notionColor : DEFAULT_NOTION_COLOR;
  const chipAccent = colorSet.text === 'white' ? '#9ca3af' : colorSet.text;
  const borderAccent = alpha(chipAccent, CHIP_BORDER_ALPHA);
  const shadowAccent = alpha(chipAccent, CHIP_SHADOW_ALPHA);
  const hoverShadowAccent = alpha(chipAccent, CHIP_HOVER_SHADOW_ALPHA);

  const customTheme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: colorSet.bg,
            color: colorSet.text,
            borderColor: borderAccent,
            borderWidth: '2px',
            borderStyle: 'solid',
            borderRadius: 4,
            boxShadow: `2px 2px 0px 0px ${shadowAccent}`,
            transition: 'all 0.1s',
            '&:hover': {
              transform: 'translate(1px, 1px)',
              boxShadow: `1px 1px 0px 0px ${hoverShadowAccent}`,
            },
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
        sx={{
          px: 0.5,
          py: 0.25,
        }}
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
