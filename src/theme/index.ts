import { grey, deepPurple, common } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';

const palette = {
  light: {
    primary: {
      light: '#5467f5',
      main: '#5467f5',
      dark: '#5467f5',
    },
    secondary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[900],
    },
  },
  dark: {
    primary: {
      light: '#5467f5',
      main: '#5467f5',
      dark: '#5467f5',
    },
    secondary: {
      light: deepPurple[300],
      main: deepPurple[500],
      dark: deepPurple[900],
    },
  },
};

export type TPaletteMode = 'light' | 'dark';

export const getDesignTokens = (mode?: TPaletteMode) =>
  ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: palette.light.primary.main,
              light: palette.light.primary.light,
              dark: palette.light.primary.dark,
              contrastText: '#000',
            },
            background: {
              default: grey[50], // background
              paper: grey[50],
            },
            text: {
              primary: grey[600], // project period, select text, chip text
              secondary: '#000', // select form label
            },
          }
        : {
            primary: {
              main: palette.dark.primary.main,
              light: palette.dark.primary.light,
              dark: palette.dark.primary.dark,
              contrastText: '#fff',
            },
            background: {
              default: grey[900], // background
              paper: grey[900],
            },
            text: {
              primary: grey[500],
              secondary: grey[50],
            },
          }),
    },
    typography: {
      fontFamily: ['Oswald', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'].join(','),
      body1: {
        fontFamily: 'Poppins, Arial, sans-serif',
      },
    },
  }) as Theme;

export const getThemedComponents = (mode?: TPaletteMode) =>
  ({
    components: {
      ...(mode === 'light'
        ? {
            MuiAppBar: {
              styleOverrides: {
                colorPrimary: {
                  backgroundColor: grey[800],
                },
              },
            },
            MuiLink: {
              variant: 'h3',
            },
            MuiButton: {
              styleOverrides: {
                root: {
                  borderRadius: 0,
                  color: common.white,
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                  fontSize: 20,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                },
              },
              variants: [
                {
                  props: { variant: 'contained' },
                  style: {
                    fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                  },
                },
                {
                  props: { variant: 'outlined' },
                  style: {
                    // color: palette.light.primary.main,
                  },
                },
                {
                  props: { variant: 'primary', color: 'primary' },
                  style: {
                    border: '4px dashed blue',
                  },
                },
              ],
            },
            MuiList: {
              styleOverrides: {
                root: {},
              },
            },
            MuiMenuItem: {
              styleOverrides: {
                root: {
                  color: common.white,
                  alignItems: 'stretch',
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
            },
            MuiAccordion: {
              styleOverrides: {
                root: {
                  color: common.white,
                  fontFamily: "Oswald, Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
              },
            },
          }
        : {
            MuiAppBar: {
              styleOverrides: {
                colorPrimary: {
                  backgroundColor: deepPurple[800],
                },
              },
            },
          }),
    },
  }) as Theme;
