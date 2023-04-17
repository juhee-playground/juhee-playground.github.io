import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import { red, purple, yellow, orange, blueGrey, pink, cyan, green, blue, brown } from '@mui/material/colors';

interface DChip {
  color: string;
  label: string;
  onClick?: () => void;
}

interface SelectChipColor {
  [color: string]: ActionComponentColor;
}
interface ActionComponentColor {
  bg: string;
  text: string;
}

const handleClick = (): void => {
  console.info('You clicked the Chip.');
};

function DChip({ color, label }: DChip) {
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
  const customTheme = createTheme({
    components: {
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: notionSelect[color] ? notionSelect[color].bg : 'default',
            color: notionSelect[color] ? notionSelect[color].text : 'grey',
            borderColor: notionSelect[color] ? notionSelect[color].text : 'grey',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Chip label={label} size='small' variant='outlined' onClick={handleClick} />
    </ThemeProvider>
  );
}

export default DChip;
