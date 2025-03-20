import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/calculator.css'
import React from 'react'
import CalcPage from './Calculator.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalcPage/>
  </StrictMode>
)
