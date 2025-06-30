import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // light blue
    },
    secondary: {
      main: '#80deea', // cyan
    },
    background: {
      default: '#121212', // dark background
      paper: '#1e1e1e', // dark paper
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: '-1px',
    },
    h4: {
      fontWeight: 700,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
