import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/calc.css'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function ThemeChange() {
    const [i, changei] = useState(0);
    const [i2, changei2] = useState(0);
    const [indexElement, changeElement] = useState(0);
  
    const backgroundThemes = ["blueBackground", "whiteBackground", "purpleBackground"]; //Add purple background
    const buttonThemes = ["whiteButton", "blueButton", "blueButton"];
    const elementButtonThemes = ["blueButton", "whiteButton", "purpleButton"]; //Add purpleButton
    const elementThemes = ["whiteElement", "blueElement", "blueElement"];
  
    const applyTheme = (index) => {
      document.body.classList.remove(...backgroundThemes);
      document.body.classList.add(backgroundThemes[index]);
  
      const buttons = document.getElementsByClassName("main_buttons");
      const elemButt = document.getElementsByClassName("element_buttons");
      const elements = document.getElementsByClassName("element");
  
      for (let button of buttons) {
        button.classList.remove(...buttonThemes);
        button.classList.add(buttonThemes[index]);
      }
  
      for (let button of elemButt) {
        button.classList.remove(...elementButtonThemes);
        button.classList.add(elementButtonThemes[index]);
      }
  
      for (let element of elements) {
        element.classList.remove(...elementThemes);
        element.classList.add(elementThemes[index]);
      }
    };
  
    useEffect(() => {
      applyTheme(0);
    }, []);
  
    const CycleTheme = () => {
      const nextIndex = (indexElement + 1) % elementThemes.length; // Calculate the next index
      changeElement(nextIndex); // Update the state for the next theme
      applyTheme(nextIndex); // Apply the theme based on the next index
    };

    return (
      <div id='themebox'>
        <button className="main_buttons" id='themebutton' onClick={CycleTheme}>
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </button>
      </div>
    );
  }





createRoot(document.getElementById('rootmain')).render(
    <StrictMode>
        <ThemeChange/>      
    </StrictMode>
  )

createRoot(document.getElementById('carousel-box')).render(
    <StrictMode>
        <Carousel/>
    </StrictMode>
  )
