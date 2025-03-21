import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Carousel from './parts/carousel';
import ThemeChange from './parts/ThemeChange';
import Calculator from './calculator';
import Login from './login';
import "./styles/index.css";
import "./styles/themestyles.css";

function ToggleMenu() {
    const menu = document.getElementById("side-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

function OpenPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function ClosePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

function ExtraElementBridge() {
    useEffect(() => {
        const updateTextColor = () => {
            const infofields = document.getElementsByClassName('element');

            Array.from(infofields).forEach((infofield) => {
                const isBlueOrPurple = infofield.classList.contains('blueElement') || infofield.classList.contains('purpleElement');

                const textfield = infofield.querySelector('.main-text');
                if (textfield) {
                    textfield.style.color = isBlueOrPurple ? 'white' : 'black';
                }
            });
        };
        updateTextColor();

        const observer = new MutationObserver(updateTextColor);
        observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['className'] });

        return () => observer.disconnect();
    }, []);

    return null;
}

function Main() {
    return (
        <div>
            <header className="element">
                <div className="header-left">
                    <button id="menu-button" className="element_buttons" onClick={ToggleMenu}>
                        ☰&nbsp;Menu
                    </button>
                    

                    <div className="element" id="side-menu">
                        <button className="close-button" id="closebutton" onClick={ToggleMenu}>
                            ✖
                        </button>
                        
                        <div className="menu-content">
                            <button className="menu-item element_buttons">
                                <a href="/calcPage" id="buttonlink">Loan Calculator</a>
                            </button>
                            <button className="menu-item element_buttons">About Us</button>
                            <button className="menu-item element_buttons">My Portfolio</button>
                            <button className="menu-item element_buttons">Contacts</button>
                        </div>
                    </div>
                    <ThemeChange/>

                    <div className="logo">
                        <img alt="Logo" src="logo.png" />
                    </div>
                </div>

                <div className="header-right">
                    <button className="element_buttons" id="contactsbuttons" onClick={OpenPopup}>
                        Contacts
                    </button>
                    <button type="button" className="element_buttons" id="login">Login</button>
                    <button type="button" className="element_buttons" id="signup">Signup</button>

                    <div className="popup-overlay" id="popup-overlay"></div>
                    <div className="popup" id="popup">
                        <button onClick={ClosePopup}>✖</button>
                        <h2>Contacts</h2>
                        <p>These are some contacts</p>
                    </div>

                    <button id="profilebutton" className="element_buttons">
                        <img id="profilepic" src="proficon.png" />
                    </button>
                </div>
            </header>

            <a className="element_buttons" id="aibutton">AI</a>            

            <div id="carousel-flex">
                
                <div className="element" id="carousel-box"><Carousel/></div>
                <p id="promotext">At SmartFinance, we believe that financial education is the key to a secure and successful future. Our
                    platform is designed to simplify complex financial concepts, empowering you with the knowledge to make
                    informed decisions about saving, investing, budgeting, and more.
                    Whether you're a beginner looking to build a strong financial foundation or an expert aiming to refine your
                    strategies, SmartFinance offers expert insights, easy-to-follow guides, and practical tools to help you on
                    your journey.
                </p>

            </div>


            

            <div id="container" className="element">
                <div className="cont">
                    <div className="content">
                        <a className="image-box" href="https://www.getsmarteraboutmoney.ca/learning-path/budgeting/">
                            <img className="image" src="/images.jfif" alt="1" />
                        </a>
                        <div className="main-text" id="main-text">
                            <h1>Budgeting: The Path to Smarter Financial Decisions</h1>
                            <p>Budgeting is not just a tool for managing finances – it is a way of life that helps you achieve
                                financial stability and make more informed decisions. In a world of rapid changes and
                                unpredictable economic conditions, budgeting is your best ally for gaining control over your
                                money and achieving long-term goals. Here’s how you can use budgeting to make smarter financial
                                choices and improve your quality of life.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="container" className="element">
                <div className="cont">
                    <div className="content">
                        <a className="image-box" href="https://www.getsmarteraboutmoney.ca/learning-path/budgeting/">
                            <img className="image" src="/images3.webp" alt="1" />
                        </a>
                        <div className="main-text" id="main-text">
                            <h1>Debt Management</h1>
                            <p>Debt is a common part of modern life, but if not managed properly, it can lead to serious
                                financial problems. Whether it’s credit cards, loans, or mortgages, having a clear strategy
                                for
                                managing debt is crucial. Here’s how you can take control of your finances and work towards
                                becoming debt-free.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div id="container" className="element">
                <div className="cont">
                    <div className="content">
                        <a className="image-box" href="https://www.getsmarteraboutmoney.ca/learning-path/budgeting/">
                            <img className="image" src="/images2.jfif" alt="1" />
                        </a>
                        <div className="main-text" id="main-text">
                            <h1>How to Build a Savings Strategy</h1>
                            <p>A savings strategy is one of the most important elements of personal financial planning. It not
                                only helps you handle unexpected expenses but also enables you to achieve long-term financial
                                goals, such as buying a home, retiring comfortably, or realizing your dreams. Here’s how you can
                                build an effective savings strategy that will help you live with greater confidence and peace of
                                mind.</p>
                        </div>
                    </div>
                </div>
            </div>

            <section className="features">
                <h2>Why Choose Us?</h2>
                <div id="feature-grid">
                    <div className="element" id="feature-card">
                        <h3>Calculate Your Finances</h3>
                        <p>Use our advanced tools to calculate your income, expenses, and savings effortlessly.</p>
                        <a href="../calculator.html" className="element_buttons" id="feature-button">Try Calculator</a>
                    </div>

                    <div className="element" id="feature-card">
                        <h3>Get Personalized Advice</h3>
                        <p>Receive expert financial advice tailored to your unique situation and goals.</p>
                        <a href="../portfolio.html" className="element_buttons" id="feature-button">Get Advice</a>
                    </div>


                    <div className="element" id="feature-card">
                        <h3>Plan Your Budget</h3>
                        <p>Create and manage a budget that works for you, with tips to optimize your spending.</p>
                        <a href="#budget-planning" className="element_buttons" id="feature-button">Start Planning</a>
                    </div>


                </div>
            </section>

            <footer>
                <div className="footer-container">
                    <div className="footer-column">
                        <h3>About the Website</h3>
                        <p>This is <b>the</b> website for business insight and the path to success.</p>
                        <p>Here you can find various tools to enhance your entrepreneurial skills.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Navigation</h3>
                        <a href="#">Home</a>
                        <a href="#">Contacts</a>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <a href="FAQ.html">FAQ</a>
                        <a href="calculator.html">Calculator</a>
                        <a href="aboutus.html">About Us</a>
                    </div>
                    <div className="footer-column contact-info">
                        <h3>Contact Information</h3>
                        <p><strong>Address:</strong> Sofia, Bulgaria</p>
                        <p><strong>Phone:</strong> +359 88 123 4567</p>
                        <p><strong>Email:</strong> yavorpen@gmail.com</p>
                    </div>
                </div>
                <h3 style={{ textAlign: "center" }}>
                    Copyright © 2025, All Rights Reserved | Designed By{" "}
                    <a style={{ color: "rgb(207, 207, 207)" }} href="aboutus.html">
                        Legends Team
                    </a>
                </h3>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/calculator" element={<Calculator />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/advice" element={<Advice />} />
                <Route path="/investments" element={<Investments />} />

            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);