import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import "./styles/calculator.css";

function Util() {
  useEffect(() => {
      const button = document.getElementById('themebutton');
      if (button) {
          button.className = 'main_buttons';
      }
  }, []);

  return null;
}

function Calc(loan, interest, months) {
  const minterest = interest / 100 / 12;
  const payment =
    (loan * minterest * Math.pow(1 + minterest, months)) /
    (Math.pow(1 + minterest, months) - 1);
  return payment;
}

function CalcPage() {
  const [loan, setLoan] = useState(0);
  const [interest, setInterest] = useState(0);
  const [months, setMonths] = useState(0);
  const [payment, setPayment] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);

  const handleCalculate = () => {
    const calculatedPayment = Calc(loan, interest, months);
    setPayment(calculatedPayment.toFixed(2));

    const calculatedInterestPaid = calculatedPayment * months - loan;
    setInterestPaid(calculatedInterestPaid.toFixed(2));
  };

  return (
    <div>
      <div id="wholepage">
        <h1 className="element" id="pagename">
          Advanced Loan Calculator
        </h1>
        <div id="calculatorbox">
          <div id="leftbox" className="element">
            <h2>Enter your loan details:</h2>
            <input
              id="loaninput"
              className="element_buttons"
              type="number"
              value={loan}
              onChange={(e) => setLoan(Number(e.target.value))}
              placeholder="Loan Amount..."
            />
            <input
              id="interestinput"
              className="element_buttons"
              type="number"
              value={interest}
              onChange={(e) => setInterest(Number(e.target.value))}
              placeholder="Yearly Interest Rate ..."
            />
            <input
              id="monthsinput"
              className="element_buttons"
              type="number"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              placeholder="Months of Payment..."
            />
            <button
              className="element_buttons"
              id="calculatebutton"
              onClick={handleCalculate}
            >
              Calculate
            </button>
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
        <div className="footer-container">
          <div className="footer-column">
            <h3>About the Website</h3>
            <p>
              This is <b>the</b> website for business insight and the path to
              success.
            </p>
            <p>
              Here you can find various tools to enhance your entrepreneurial
              skills.
            </p>
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
            <p>
              <strong>Address:</strong> Sofia, Bulgaria
            </p>
            <p>
              <strong>Phone:</strong> +359 88 123 4567
            </p>
            <p>
              <strong>Email:</strong> yavorpen@gmail.com
            </p>
          </div>
        </div>
        <h3 style="text-align: center;">
          Copyright © 2025, All Rights Reserved | Designed By{" "}
          <a style={{ color: "rgb(207, 207, 207)" }} href="aboutus.html">
            Legends Team
          </a>
        </h3>
      </footer>
    </div>
  );
}

function Calculator() {
  return (
    <Router>
      <Routes>
        <Route path="/calculator" element={<CalcPage />} />
      </Routes>
    </Router>
  );
}

export default Calculator;


