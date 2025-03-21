import React, { useState, useEffect } from "react";	
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleHalfStroke } from "@fortawesome/free-solid-svg-icons";
import "../styles/themestyles.css";

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

export default ThemeChange;