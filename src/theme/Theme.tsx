import { grey, blue, common } from '@mui/material/colors';
import { Theme } from '@mui/material/styles';

const palette = {
  light: {
    primary: {
      main: '##00b8ff',
      light: '##00b8ff',
      dark: '##00b8ff',
    },
  },
};

type PaletteMode = 'light' | 'dark';

export const getDesignTokens = (mode: PaletteMode | undefined) =>
  ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: {
              main: palette.light.primary.main,
              light: palette.light.primary.light,
              dark: palette.light.primary.dark,
              contrastText: '#fff',
            },
            text: {
              primary: '#222222',
              secondary: grey[800],
            },
          }
        : {
            primary: {
              main: '#00b8ff',
              light: '#00b8ff',
              dark: '#00b8ff',
              contrastText: '#fff',
            },
            divider: grey[700],
            background: {
              default: grey[900],
              paper: grey[900],
            },
            text: {
              primary: '#fff',
              secondary: '#fff',
            },
          }),
    },
    typography: {
      fontFamily: ['Oswald', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
      body1: {
        fontFamily: 'Poppins, Arial, sans-serif',
      },
    },
  } as Theme);

export const getThemedComponents = (mode: PaletteMode | undefined) =>
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
                    color: palette.light.primary.main,
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
                  backgroundColor: blue[800],
                },
              },
            },
          }),
    },
  } as Theme);
