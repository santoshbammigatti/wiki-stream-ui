import { createTheme } from '@mui/material/styles';

export const makeAppTheme = (mode: 'light' | 'dark' = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: { 
        main: mode === 'light' ? '#1976d2' : '#90caf9',
        light: mode === 'light' ? '#42a5f5' : '#bbdefb',
        dark: mode === 'light' ? '#1565c0' : '#64b5f6',
      },
      secondary: { 
        main: mode === 'light' ? '#9c27b0' : '#ce93d8',
        light: mode === 'light' ? '#ba68c8' : '#e1bee7',
        dark: mode === 'light' ? '#7b1fa2' : '#ab47bc',
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
        default: mode === 'light' ? '#f5f7fa' : '#0a0e27',
        paper: mode === 'light' ? '#ffffff' : '#1a1f3a',
      },
      text: {
        primary: mode === 'light' ? '#1a202c' : '#e2e8f0',
        secondary: mode === 'light' ? '#4a5568' : '#a0aec0',
      },
    },
    shape: { 
      borderRadius: 12 
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h6: { 
        fontWeight: 700,
        letterSpacing: '0.5px',
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
      },
      body1: {
        fontSize: '1rem',
      },
      body2: { 
        fontSize: '0.875rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
            textTransform: 'none',
            fontSize: '0.95rem',
          },
          sizeLarge: {
            padding: '12px 24px',
            fontSize: '1rem',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontSize: '0.875rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
    },
  });
