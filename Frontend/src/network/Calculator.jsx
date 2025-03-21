import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/calculator.css';
import React from 'react';
import CalcPage from './CalcLogic.jsx';
import ThemeChange from './ThemeChange.jsx';

function Util() {
  useEffect(() => {
    const button = document.getElementById('themebutton');
    if (button) {
      button.className = 'main_buttons';
    }
  }, []);

  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalcPage />
  </StrictMode>
);

createRoot(document.getElementById('root2')).render(
  <StrictMode>
    <Util />
    <ThemeChange />
  </StrictMode>
);