
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { makeAppTheme } from './theme';

// Simple theme holder (light by default)
const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    {/* We'll create the theme here and re-render App when mode changes.
        To keep it simple, the App manages mode and we wrap ThemeProvider inside App normally.
        Alternatively, lift the mode state here. */}
    <ThemeProvider theme={makeAppTheme('light')}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
