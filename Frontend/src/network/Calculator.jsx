import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/calculator.css';
import React from 'react';
import Calc from '../parts/CalcLogic.jsx';
import Util from '../parts/Util.jsx';
import ThemeChange from './ThemeChange.jsx';
import { NavLink, Route, Router, Routes, Link, Navigate} from "react-router";



function CalcPage() {
  const [loan, setLoan] = useState(0);
  const [interest, setInterest] = useState(0);
  const [months, setMonths] = useState(0);
  const [payment, setPayment] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);

  const handleCalculate = () => {
    const calculatedPayment = Calc(loan, interest, months);
    setPayment(calculatedPayment.toFixed(2));

    const calculatedInterestPaid = (calculatedPayment * months) - loan;
    setInterestPaid(calculatedInterestPaid.toFixed(2));
  };

  return (loan, interest, months, payment, interestPaid);
}

function Main() {
  return (
    <div>
      <div id="wholepage">
        <h1 className="element" id="pagename">Advanced Loan Calculator</h1>
        <div id="calculatorbox">
          <div id="leftbox" className="element">
            <h2>Enter your loan details:</h2>
            <input id="loaninput"
              className="element_buttons"
              type="number"
              value={loan}
              onChange={(e) => setLoan(Number(e.target.value))}
              placeholder="Loan Amount..."
            />
            <input id="interestinput"
              className="element_buttons"
              type="number"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              placeholder="Yearly Interest Rate ..."
            />
            <input id="monthsinput"
              className="element_buttons"
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              placeholder="Months of Payment..."
            />
            <button className="element_buttons" id="calculatebutton" onClick={handleCalculate}>Calculate</button>
          </div>
          <div id="rightbox">
            <div id="paymentbox" className="element">
              <h3>Your monthly payment:</h3>
              <h4 id="paymentfield">{payment}</h4>
            </div>
            <div id="interestbox" className="element">
              <h3>Total interest paid:</h3>
              <h4 id="interestpaidfield">{interestPaid}</h4>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div class="footer-container">
          <div class="footer-column">
            <h3>About the Website</h3>
            <p>This is <b>the</b> website for business insight and the path to success.</p>
            <p>Here you can find various tools to enhance your entrepreneurial skills.</p>
          </div>
          <div class="footer-column">
            <h3>Navigation</h3>
            <a href="#">Home</a>
            <a href="#">Contacts</a>
          </div>
          <div class="footer-column">
            <h3>Quick Links</h3>
            <a href="FAQ.html">FAQ</a>
            <a href="calculator.html">Calculator</a>
            <a href="aboutus.html">About Us</a>
          </div>
          <div class="footer-column contact-info">
            <h3>Contact Information</h3>
            <p><strong>Address:</strong> Sofia, Bulgaria</p>
            <p><strong>Phone:</strong> +359 88 123 4567</p>
            <p><strong>Email:</strong> yavorpen@gmail.com</p>
          </div>
        </div>
        <h3 style="text-align: center;">Copyright © 2025, All Rights Reserved | Designed By <a
          style=" color: rgb(207, 207, 207);" href="aboutus.html">Legends Team</a></h3>
      </footer>
    </div>
  );
}


function App() {
  return (
    <Router>
        <Route path="/calculator" element={<Main/>} />
    </Router>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
