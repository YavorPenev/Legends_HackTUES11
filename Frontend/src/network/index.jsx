import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect } from 'react';
import ThemeChange from './ThemeChange';
import '../styles/themestyles.css';

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
            <div className="navbuttons" id="navbut">
                <button
                    id='navbutt'
                    className={`element_buttons ${slideIndex === 0 ? 'active' : ''}`}
                    onClick={() => buttSlide(0)}
                >
                    <p>&nbsp;</p>
                </button>
                <button
                    id='navbutt'
                    className={`element_buttons ${slideIndex === 1 ? 'active' : ''}`}
                    onClick={() => buttSlide(1)}
                >
                    <p>&nbsp;</p>
                </button>
                <button
                    id='navbutt'
                    className={`element_buttons ${slideIndex === 2 ? 'active' : ''}`}
                    onClick={() => buttSlide(2)}
                >
                    <p>&nbsp;</p>
                </button>
                <button
                    id='navbutt'
                    className={`element_buttons ${slideIndex === 3 ? 'active' : ''}`}
                    onClick={() => buttSlide(3)}
                >
                    <p>&nbsp;</p>
                </button>
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