import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router";
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
    const [isMenuVisible, setIsMenuVisible] = useState(false); // State to track menu visibility

    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    return (
        <div>
            <header className="element">
                <div className="header-left">
                    <button id="menu-button" className="element_buttons" onClick={toggleMenu}>
                        ☰&nbsp;Menu
                    </button>

                    {/* Use React state to control the visibility of the side menu */}
                    <div className={`element ${isMenuVisible ? "open" : ""}`} id="side-menu">
                        <button className="close-button" id="closebutton" onClick={toggleMenu}>
                            ✖
                        </button>

                        <div className="menu-content">
                            <NavLink className="menu-item element_buttons" to="/calculator">Go to Calculator</NavLink>
                            <button className="menu-item element_buttons">About Us</button>
                            <button className="menu-item element_buttons">My Portfolio</button>
                            <button className="menu-item element_buttons">Contacts</button>
                        </div>
                    </div>

                    <ThemeChange />

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

            <Link className="element_buttons" id="aibutton">AI</Link>

            <div id="carousel-flex">

                <div className="element" id="carousel-box"><Carousel /></div>
                <p id="promotext">At SmartFinance, we believe that financial education is the key to Link secure and successful future. Our
                    platform is designed to simplify complex financial concepts, empowering you with the knowledge to make
                    informed decisions about saving, investing, budgeting, and more.
                    Whether you're Link beginner looking to build Link strong financial foundation or an expert aiming to refine your
                    strategies, SmartFinance offers expert insights, easy-to-follow guides, and practical tools to help you on
                    your journey.
                </p>

            </div>




            <div id="container" className="element">
                <div className="cont">
                    <div className="content">
                        <Link className="image-box" href="https://www.getsmarteraboutmoney.ca/learning-path/budgeting/">
                            <img className="image" src="/images.jfif" alt="1" />
                        </Link>
                        <div className="main-text" id="main-text">
                            <h1>Budgeting: The Path to Smarter Financial Decisions</h1>
                            <p>Budgeting is not just Link tool for managing finances – it is Link way of life that helps you achieve
                                financial stability and make more informed decisions. In Link world of rapid changes and
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
                        <Link className="image-box" href="https://www.getsmarteraboutmoney.ca/learning-path/budgeting/">
                            <img className="image" src="/images3.webp" alt="1" />
                        </Link>
                        <div className="main-text" id="main-text">
                            <h1>Debt Management</h1>
                            <p>Debt is Link common part of modern life, but if not managed properly, it can lead to serious
                                financial problems. Whether it’s credit cards, loans, or mortgages, having Link clear strategy
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
                        <Link className="image-box" href="https://www.getsmarteraboutmoney.ca/learning-path/budgeting/">
                            <img className="image" src="/images2.jfif" alt="1" />
                        </Link>
                        <div className="main-text" id="main-text">
                            <h1>How to Build Link Savings Strategy</h1>
                            <p>A savings strategy is one of the most important elements of personal financial planning. It not
                                only helps you handle unexpected expenses but also enables you to achieve long-term financial
                                goals, such as buying Link home, retiring comfortably, or realizing your dreams. Here’s how you can
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
                        <Link href="../calculator.html" className="element_buttons" id="feature-button">Try Calculator</Link>
                    </div>

                    <div className="element" id="feature-card">
                        <h3>Get Personalized Advice</h3>
                        <p>Receive expert financial advice tailored to your unique situation and goals.</p>
                        <Link to="/portfolio" className="element_buttons" id="feature-button">Get Advice</Link>
                    </div>


                    <div className="element" id="feature-card">
                        <h3>Plan Your Budget</h3>
                        <p>Create and manage Link budget that works for you, with tips to optimize your spending.</p>
                        <Link to="#budget-planning" className="element_buttons" id="feature-button">Start Planning</Link>
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
                        <Link to="#">Home</Link>
                        <Link to="#">Contacts</Link>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <Link to="/FAQ">FAQ</Link>
                        <Link to="/calculator">Calculator</Link>
                        <Link to="/aboutus">About Us</Link>
                    </div>
                    <div className="footer-column contact-info">
                        <h3>Contact Information</h3>
                        <p><strong>Address:</strong> Sofia, Bulgaria</p>
                        <p><strong>Phone:</strong> +359 88 123 4567</p>
                        <p><strong>Email:</strong> yavorpen@gmail.com</p>
                    </div>
                </div>
                <h3 style={{ textAlign: 'center' }}>
                    Copyright © 2025, All Rights Reserved | Designed By{" "}
                    <Link style={{ color: 'rgb(207, 207, 207)' }} to="/aboutus">
                        Legends Team
                    </Link>
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
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);