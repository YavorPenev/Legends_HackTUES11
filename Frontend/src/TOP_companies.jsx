import React, { useState } from 'react';
import './styles/TOP_companies.css';

const TOPCompanies = () => {
    const [index, setIndex] = useState(0);

    const changeSlide = (step) => {
        const slides = document.querySelectorAll(".slide");
        setIndex((prevIndex) => (prevIndex + step + slides.length) % slides.length);
    };

    return (
        <div>
            {/* Header */}
            <header className="header">
                <h1>Top Investment Companies</h1>
                <p>Discover the most successful investment firms in the world</p>
            </header>
            <div className="carback">
                <div className="carousel">
                    <div className="carousel-inner" style={{ transform: `translateX(-${index * 100}%)` }}>
                        <div className="slide">
                            <div className="image-container">
                                <img src="/Frontend/photos/car1.png" alt="Описание 1" />
                            </div>
                            <div className="caption">A multinational conglomerate led by Warren Buffett, known for its diverse investments in industries like insurance, energy, and consumer goods.</div>
                        </div>
                        <div className="slide">
                            <div className="image-container">
                                <img src="/Frontend/photos/car2.png" alt="Описание 2" />
                            </div>
                            <div className="caption">A leading global financial services firm offering investment banking, wealth management, and trading services to individuals, corporations, and governments.</div>
                        </div>
                        <div className="slide">
                            <div className="image-container">
                                <img src="/Frontend/photos/car3.png" alt="Описание 3" />
                            </div>
                            <div className="caption">The world's largest asset manager, specializing in investment management, risk analysis, and financial advisory services, with a focus on ETFs and sustainable investing.</div>
                        </div>
                    </div>
                    <button className="prev" onClick={() => changeSlide(-1)}>&#10094;</button>
                    <button className="next" onClick={() => changeSlide(1)}>&#10095;</button>
                </div>
            </div>

            {/* Companies Section */}
            <div className="container">
                <div className="grid">
                    {/* Company 1 */}
                    <div className="card">
                        <h2>Berkshire Hathaway</h2>
                        <p>A multinational conglomerate led by Warren Buffett, known for its diverse investments in industries like insurance, energy, and consumer goods.</p>
                        <a href="https://www.berkshirehathaway.com/" target="_blank" className="button">Learn More</a>
                    </div>
                    {/* Company 2 */}
                    <div className="card">
                        <h2>BlackRock</h2>
                        <p>The world's largest asset management firm, with over $9 trillion in assets.</p>
                        <a href="https://www.blackrock.com/" target="_blank" className="button">Learn More</a>
                    </div>
                    {/* Company 3 */}
                    <div className="card">
                        <h2>Vanguard Group</h2>
                        <p>Famous for its low-cost funds and long-term investment strategies.</p>
                        <a href="https://www.vanguard.com/" target="_blank" className="button">Learn More</a>
                    </div>
                    {/* Company 4 */}
                    <div className="card">
                        <h2>Fidelity Investments</h2>
                        <p>A global leader in asset management and financial services.</p>
                        <a href="https://www.fidelity.com/" target="_blank" className="button">Learn More</a>
                    </div>
                    {/* Company 5 */}
                    <div className="card">
                        <h2>Goldman Sachs</h2>
                        <p>A global investment bank with significant influence on the world economy.</p>
                        <a href="https://www.goldmansachs.com/" target="_blank" className="button">Learn More</a>
                    </div>
                    {/* Company 6 */}
                    <div className="card">
                        <h2>Morgan Stanley</h2>
                        <p>One of the leading investment companies with a long history.</p>
                        <a href="https://www.morganstanley.com/" target="_blank" className="button">Learn More</a>
                    </div>
                </div>
            </div>

            <footer>
                <div className="footer-container">
                    <div className="footer-column">
                        <h3>About the Website</h3>
                        <p>This is an example website to demonstrate a footer layout.</p>
                        <p>Here you can find various examples and useful information.</p>
                    </div>
                    <div className="footer-column">
                        <h3>Navigation</h3>
                        <a href="#">Home</a>
                        <a href="#">Products</a>
                        <a href="#">Services</a>
                        <a href="#">About Us</a>
                    </div>
                    <div className="footer-column">
                        <h3>Quick Links</h3>
                        <a href="#">FAQ</a>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Contact</a>
                    </div>
                    <div className="footer-column contact-info">
                        <h3>Contact Information</h3>
                        <p><strong>Address:</strong> Sofia, Bulgaria</p>
                        <p><strong>Phone:</strong> +359 88 123 4567</p>
                        <p><strong>Email:</strong> example@domain.com</p>
                    </div>
                </div>
                <h3 style={{ textAlign: 'center' }}>Copyright © 2025, All Rights Reserved | Designed With by <a style={{ color: 'rgb(207, 207, 207)' }} href="#">LegendsTheam</a></h3>
            </footer>
        </div>
    );
};

export default TOPCompanies;
