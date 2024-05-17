import { red, purple, yellow, orange, lightGreen, pink, grey, green, blue, brown } from '@mui/material/colors';

interface ActionComponentColor {
  bg: string;
  text: string;
}

interface SelectChipColor {
  [color: string]: ActionComponentColor;
}

export const notionColorSet: SelectChipColor = {
  red: {
    bg: red[100],
    text: red[600],
  },
  brown: {
    bg: brown[100],
    text: brown[600],
  },
  purple: {
    bg: purple[100],
    text: purple[600],
  },
  yellow: {
    bg: yellow[100],
    text: yellow[900],
  },
  green: {
    bg: lightGreen[100],
    text: lightGreen[600],
  },
  blue: {
    bg: blue[100],
    text: blue[600],
  },
  orange: {
    bg: orange[100],
    text: orange[600],
  },
  default: {
    bg: grey[100],
    text: grey[600],
  },
  gray: {
    bg: green[100],
    text: green[600],
  },
  pink: {
    bg: pink[100],
    text: pink[600],
  },
  white: {
    bg: 'inherit',
    text: 'white'
  }
};
