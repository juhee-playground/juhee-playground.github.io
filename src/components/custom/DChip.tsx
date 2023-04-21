import React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

import { red, purple, yellow, orange, blueGrey, pink, cyan, green, blue, brown } from '@mui/material/colors';
interface SelectChipColor {
  [color: string]: ActionComponentColor;
}
interface ActionComponentColor {
  bg: string;
  text: string;
}

function DChip({ color, label, clickable, parentFunction }: CustomChip) {
  // TODO: module화 해서 밖으로 빼기;;;
  const notionSelect: SelectChipColor = {
    red: {
      bg: red[100],
      text: red[700],
    },
    brown: {
      bg: brown[100],
      text: brown[700],
    },
    purple: {
      bg: purple[100],
      text: purple[700],
    },
    yellow: {
      bg: yellow[100],
      text: yellow[700],
    },
    green: {
      bg: green[100],
      text: green[700],
    },
    blue: {
      bg: blue[100],
      text: blue[700],
    },
    orange: {
      bg: orange[100],
      text: orange[700],
    },
    default: {
      bg: cyan[100],
      text: cyan[700],
    },
    gray: {
      bg: blueGrey[100],
      text: blueGrey[700],
    },
    pink: {
      bg: pink[100],
      text: pink[700],
    },
  };
  const [selected, setSelected] = useState(false);

  const handleClick = (): void => {
    if (parentFunction) {
      setSelected(!selected);
      parentFunction(label);
    }
  };

  let icon;

  if (selected) {
    icon = <CheckIcon />;
  }
  let notionColor = { bg: 'default', text: 'grey' };
  if (notionSelect[color]) {
    notionColor = notionSelect[color];
  }

  const applyColor = selected || !clickable;

  const customTheme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: applyColor ? notionColor.bg : 'default',
            color: applyColor ? notionColor.text : 'grey',
            borderColor: applyColor ? notionColor.text : 'grey',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Chip
        label={label}
        size='small'
        variant='outlined'
        icon={icon}
        clickable={clickable}
        onClick={handleClick}
      />
    </ThemeProvider>
  );
}

export default DChip;
