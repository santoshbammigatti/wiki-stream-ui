
import { createTheme } from '@mui/material/styles';

export const makeAppTheme = (mode: 'light' | 'dark' = 'light') =>
  createTheme({
    palette: {
      mode,
      primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
      secondary: { main: mode === 'light' ? '#9c27b0' : '#ce93d8' },
      background: {
        default: mode === 'light' ? '#f7f9fc' : '#0f1217',
        paper: mode === 'light' ? '#ffffff' : '#12161c',
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial'].join(','),
      h6: { fontWeight: 700 },
      body2: { color: mode === 'light' ? '#4a4f57' : '#cfd8dc' },
    }
});
