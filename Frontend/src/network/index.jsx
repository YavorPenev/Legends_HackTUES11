import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

function ThemeChange() {
    const [i, changei] = useState(0);
    const [i2, changei2] = useState(0);
    const [indexElement, changeElement] = useState(0);
  
    const backgroundThemes = ["blueBackground", "whiteBackground", "purpleBackground"]; //body - no pipare
    const buttonThemes = ["whiteButton", "blueButton", "blueButton"]; // main_buttons
    const elementButtonThemes = ["blueButton", "whiteButton", "purpleButton"]; // element_buttons
    const elementThemes = ["whiteElement", "blueElement", "blueElement"]; //element
  
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
        <button className="element_buttons" id='themebutton' onClick={CycleTheme}>
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </button>
      </div>
    );
  }

  function Carousel() {
    const [slideIndex, setSlideIndex] = useState(0);
  
    const nextSlide = (step) => {
      setSlideIndex((prevIndex) => {
        const newIndex = prevIndex + step;
        if (newIndex >= 4) return 0;
        if (newIndex < 0) return 3;
        return newIndex;
      });
    };
  
    const buttSlide = (input) => {
      setSlideIndex(input);
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        nextSlide(1);
      }, 10000);
  
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div className="element" id="carousel">
        {/* Slide 1 */}
        <div className={`slide ${slideIndex === 0 ? 'active' : 'inactive'}`}>
          <h2 className="carHeader">Slide 1</h2>
          <div className="infoContainer">
            <img src="article1.png" alt="Article 1"/>
            <p>Content for slide 1...</p>
          </div>
        </div>
  
        {/* Slide 2 */}
        <div className={`slide ${slideIndex === 1 ? 'active' : 'inactive'}`}>
          <h2 className="carHeader">Slide 2</h2>
          <div className="infoContainer">
            <img src="article2.png" alt="Article 2" />
            <p>Content for slide 2...</p>
          </div>
        </div>
  
        {/* Slide 3 */}
        <div className={`slide ${slideIndex === 2 ? 'active' : 'inactive'}`}>
          <h2 className="carHeader">Slide 3</h2>
          <div className="infoContainer">
            <img src="article3.png" alt="Article 3" />
            <p>Content for slide 3...</p>
          </div>
        </div>
  
        {/* Slide 4 */}
        <div className={`slide ${slideIndex === 3 ? 'active' : 'inactive'}`}>
          <h2 className="carHeader">Slide 4</h2>
          <div className="infoContainer">
            <img src="article4.png" alt="Article 4" />
            <p>Content for slide 4...</p>
          </div>
        </div>
  
        {/* Navigation Buttons */}
        <div className="element_buttons" id="navbut">
          <button
            className={`navbutt ${slideIndex === 0 ? 'active' : ''}`}
            onClick={() => buttSlide(0)}
          />
          <button
            className={`navbutt ${slideIndex === 1 ? 'active' : ''}`}
            onClick={() => buttSlide(1)}
          />
          <button
            className={`navbutt ${slideIndex === 2 ? 'active' : ''}`}
            onClick={() => buttSlide(2)}
          />
          <button
            className={`navbutt ${slideIndex === 3 ? 'active' : ''}`}
            onClick={() => buttSlide(3)}
          />
        </div>
  
        {/* Navigation Arrows */}
        <button className="element_buttons" id="prev" onClick={() => nextSlide(-1)}>❮</button>
        <button className="element_buttons" id="next" onClick={() => nextSlide(1)}>❯</button>
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




