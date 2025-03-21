import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';

function ThemeChange() {
    const [indexElement, changeElement] = useState(0);

    const backgroundThemes = ["blueBackground", "whiteBackground", "purpleBackground"]; // body
    const buttonThemes = ["whiteButton", "blueButton", "blueButton"]; // main_buttons
    const elementButtonThemes = ["blueButton", "whiteButton", "purpleButton"]; // element_buttons
    const elementThemes = ["whiteElement", "blueElement", "blueElement"]; // element

    const applyTheme = (index) => {
        // Update body background
        document.body.classList.remove(...backgroundThemes);
        document.body.classList.add(backgroundThemes[index]);

        // Update buttons
        const buttons = document.getElementsByClassName("main_buttons");
        const elemButt = document.getElementsByClassName("element_buttons");
        const navButts = document.getElementsByClassName("navbutt"); // Add navbutt buttons
        const elements = document.getElementsByClassName("element");

        for (let button of buttons) {
            button.classList.remove(...buttonThemes);
            button.classList.add(buttonThemes[index]);
        }

        for (let button of elemButt) {
            button.classList.remove(...elementButtonThemes);
            button.classList.add(elementButtonThemes[index]);
        }

        for (let button of navButts) {
            button.classList.remove(...elementButtonThemes); // Use the same theme array
            button.classList.add(elementButtonThemes[index]);
        }

        for (let element of elements) {
            element.classList.remove(...elementThemes);
            element.classList.add(elementThemes[index]);
        }

        // Update side menu background
        const sideMenu = document.getElementById("side-menu");
        if (sideMenu) {
            sideMenu.classList.remove(...elementThemes);
            sideMenu.classList.add(elementThemes[index]);
        }

        // Update #buttonlink text color
        const buttonLink = document.getElementById("buttonlink");
        if (buttonLink) {
            if (index === 1) {
                buttonLink.style.color = "black"; // White background
            } else {
                buttonLink.style.color = "white"; // Blue or purple background
            }
        }
    };

    useEffect(() => {
        applyTheme(0); // Apply the initial theme
    }, []);

    const CycleTheme = () => {
        const nextIndex = (indexElement + 1) % elementThemes.length; // Calculate the next index
        changeElement(nextIndex); // Update the state for the next theme
        applyTheme(nextIndex); // Apply the theme based on the next index
    };

    return (
        <div id="themebox">
            <button className="element_buttons" id="themebutton" onClick={CycleTheme}>
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
                <h2 className="carHeader">Budgeting</h2>
                <div className="infoContainer">
                    <img id="snimka" src='/snimka1.webp' alt="Article 1" />
                    <p id="text">Budgeting: The Key to Smarter Financial Decisions
                        Budgeting is more than just a financial tool—it’s a mindset that empowers you to take control of your money, achieve your goals, and build a secure future. Whether you’re saving for a dream vacation, planning for retirement, or simply trying to make ends meet, budgeting is the foundation of smarter financial decisions. Let’s dive into how you can master the art of budgeting and transform your financial life.</p>
                </div>
            </div>

            {/* Slide 3 */}
            <div className={`slide ${slideIndex === 2 ? 'active' : 'inactive'}`}>
                <h2 className="carHeader">Smart Financial Calculator</h2>
                <div className="infoContainer">
                    <img id="snimka" src="/snimka2.webp" alt="Article 2" />
                    <p id="text">In today’s fast-paced world, managing your finances requires more than just intuition—it demands precision, planning, and the right tools. A Smart Financial Calculator is one such tool that empowers you to make informed decisions, whether you’re budgeting, saving, investing, or planning for the future. Let’s explore how this powerful tool can transform the way you handle your money.</p>
                </div>
            </div>

            {/* Slide 2 */}
            <div className={`slide ${slideIndex === 1 ? 'active' : 'inactive'}`}>
                <h2 className="carHeader">Financial Metrics</h2>
                <div className="infoContainer">
                    <img id="snimka" src="/snimka3.jpg" alt="Article 3" />
                    <p id="text" >Financial metrics are essential tools for analyzing the health and performance of a business or investment. They provide valuable insights into profitability, efficiency, and growth potential. Let’s explore some of the key financial metrics and how they can help you make informed decisions.</p>
                </div>
            </div>

            {/* Slide 4 */}
            <div className={`slide ${slideIndex === 3 ? 'active' : 'inactive'}`}>
                <h2 className="carHeader">Financial</h2>
                <div className="infoContainer">
                    <img id="snimka" src="snimka4.jpg" alt="Article 4" />
                    <p id="text">Financial planning is a crucial element for building and managing a successful business. It involves the process of developing a strategy to manage financial resources with the aim of achieving the company's long-term goals. Effective financial planning enables a business to forecast future revenues and expenses, manage risks, and make informed decisions.</p>
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
        <ThemeChange />
    </StrictMode>
)

createRoot(document.getElementById('carousel-box')).render(
    <StrictMode>
        <Carousel />
    </StrictMode>
)




