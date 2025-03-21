import React, { useState } from "react";
import "./styles/advice.css";

function Investments() {
    const [investment, setInvestment] = useState("");
    const [expectedReturn, setExpectedReturn] = useState("");
    const [result, setResult] = useState("");

    const evaluateInvestment = async () => {
        if (!investment || !expectedReturn) {
            setResult("Please enter all values.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/investments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    income: parseFloat(investment),
                    expenses: parseFloat(expectedReturn),
                    goals: ["Maximize growth"],
                    stocks: ["AAPL", "GOOG", "AMZN"]
                })
            });

            const data = await response.json();
            setResult(`Investment Status: ${data.advice}`);
        } catch (error) {
            console.error("Error evaluating investment:", error);
            setResult("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2>Investment AI assistant</h2>
            <label htmlFor="investment">Investment Amount ($):</label>
            <input type="number" id="investment" value={investment} onChange={(e) => setInvestment(e.target.value)} required />
            <label htmlFor="expected_return">Expected Return ($):</label>
            <input type="number" id="expected_return" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} required />
            <button onClick={evaluateInvestment}>Evaluate</button>
            <p id="result">{result}</p>
        </div>
    );
}

export default Investments;
