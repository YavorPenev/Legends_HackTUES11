import React, { useState } from "react";
import "./styles/advice.css";

function Advice() {
    const [income, setIncome] = useState("");
    const [expenses, setExpenses] = useState("");
    const [goals, setGoals] = useState("");
    const [advice, setAdvice] = useState("");

    const getAdvice = async () => {
        if (!income || !expenses || !goals) {
            alert("Please fill in all fields!");
            return;
        }

        const userProfile = {
            income: parseInt(income.trim()),
            expenses: parseInt(expenses.trim()),
            goals: goals.trim().split(",").map(goal => goal.trim())
        };

        try {
            const response = await fetch("/advice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userProfile })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch advice");
            }

            const data = await response.json();
            setAdvice(data.advice);
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Check the console.");
        }
    };

    return (
        <div className="container">
            <div className="cont-elem">
                <h2>Get Investment Advice</h2>
                <label htmlFor="income">Enter Your Income ($):</label>
                <input
                    type="number"
                    id="income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="70000"
                />
                <label htmlFor="expenses">Enter Your Monthly Expenses ($):</label>
                <input
                    type="number"
                    id="expenses"
                    value={expenses}
                    onChange={(e) => setExpenses(e.target.value)}
                    placeholder="2000"
                />
                <label htmlFor="goals">Enter Your Investment Goals (comma separated):</label>
                <input
                    type="text"
                    id="goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    placeholder="long-term growth, low risk"
                />
                <button type="button" id="getAdviceButton" onClick={getAdvice}>
                    Get Advice
                </button>
            </div>
            <h2 id="inv2">Investment Advice:</h2>
            <pre id="investmentAdvice">{advice}</pre>
        </div>
    );
}

export default Advice;
