import { createTheme } from '@mui/material/styles';

export const makeAppTheme = (mode: 'light' | 'dark' = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: { 
        main: mode === 'light' ? '#0052CC' : '#4C9AFF',
        light: mode === 'light' ? '#2684FF' : '#85B8FF',
        dark: mode === 'light' ? '#003884' : '#2C5FFF',
      },
      secondary: { 
        main: mode === 'light' ? '#FF5630' : '#FF8F73',
        light: mode === 'light' ? '#FF7452' : '#FFAB94',
        dark: mode === 'light' ? '#DE350B' : '#FF5630',
      },
      success: {
        main: mode === 'light' ? '#2e7d32' : '#66bb6a',
        light: mode === 'light' ? '#4caf50' : '#81c784',
        dark: mode === 'light' ? '#1b5e20' : '#4caf50',
      },
      error: {
        main: mode === 'light' ? '#d32f2f' : '#f44336',
        light: mode === 'light' ? '#ef5350' : '#e57373',
        dark: mode === 'light' ? '#c62828' : '#ef5350',
      },
      warning: {
        main: mode === 'light' ? '#ed6c02' : '#ffa726',
        light: mode === 'light' ? '#ff9800' : '#ffb74d',
        dark: mode === 'light' ? '#e65100' : '#f57c00',
      },
      info: {
        main: mode === 'light' ? '#0288d1' : '#29b6f6',
        light: mode === 'light' ? '#03a9f4' : '#4fc3f7',
        dark: mode === 'light' ? '#01579b' : '#0288d1',
      },
      background: {
        default: mode === 'light' ? '#F7F8FC' : '#0D1117',
        paper: mode === 'light' ? '#FFFFFF' : '#161B22',
      },
      text: {
        primary: mode === 'light' ? '#172B4D' : '#E6EDF3',
        secondary: mode === 'light' ? '#5E6C84' : '#8B949E',
      },
      divider: mode === 'light' ? '#DFE1E6' : '#30363D',
    },
    shape: { 
      borderRadius: 8 
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'system-ui',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h6: { 
        fontWeight: 700,
        letterSpacing: '-0.02em',
        fontSize: '1.25rem',
      },
      h4: {
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      body1: {
        fontSize: '0.9375rem',
        lineHeight: 1.6,
      },
      body2: { 
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            padding: '10px 20px',
            textTransform: 'none',
            fontSize: '0.9375rem',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': {
              boxShadow: mode === 'light' 
                ? '0 2px 8px rgba(0, 82, 204, 0.2)' 
                : '0 2px 8px rgba(76, 154, 255, 0.2)',
            },
          },
          sizeLarge: {
            padding: '14px 28px',
            fontSize: '1rem',
          },
          contained: {
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0, 0, 0, 0.12)' 
              : '0 1px 3px rgba(0, 0, 0, 0.4)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 6,
            fontSize: '0.8125rem',
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${mode === 'light' ? '#DFE1E6' : '#30363D'}`,
          },
          head: {
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            backgroundColor: mode === 'light' ? '#F7F8FC' : '#0D1117',
            color: mode === 'light' ? '#5E6C84' : '#8B949E',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            boxShadow: mode === 'light'
              ? '0 1px 3px rgba(9, 30, 66, 0.13), 0 0 1px rgba(9, 30, 66, 0.13)'
              : '0 1px 3px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.4)',
          },
          elevation2: {
            boxShadow: mode === 'light'
              ? '0 4px 8px rgba(9, 30, 66, 0.15), 0 0 1px rgba(9, 30, 66, 0.31)'
              : '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 1px rgba(0, 0, 0, 0.5)',
          },
          elevation3: {
            boxShadow: mode === 'light'
              ? '0 8px 16px rgba(9, 30, 66, 0.2), 0 0 1px rgba(9, 30, 66, 0.31)'
              : '0 8px 16px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.6)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light'
              ? '0 1px 0 rgba(9, 30, 66, 0.13)'
              : '0 1px 0 rgba(255, 255, 255, 0.08)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 6,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
    },
  });
