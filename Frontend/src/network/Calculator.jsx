import React, { useState } from "react";

function Calc(loan, interest, months) {
    const minterest = interest / 100 / 12;
    const payment = (loan * minterest * (1 + minterest) ** months) / ((1 + minterest) ** months - 1);

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

        const calculatedInterestPaid = (calculatedPayment * months) - loan;
        setInterestPaid(calculatedInterestPaid.toFixed(2));
    };

    return (
        <div>
            <h1 className="pagename">Advanced Loan Calculator</h1>
            <div className="element">
                <h2>Enter your loan details:</h2>
                <div>
                    <input
                        type="number"
                        value={loan}
                        onChange={(e) => setLoan(Number(e.target.value))}
                        placeholder="Loan Amount..."
                    />
                    <input
                        type="number"
                        value={interest}
                        onChange={(e) => setInterest(Number(e.target.value))}
                        placeholder="Yearly Interest Rate ..."
                    />
                    <input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(Number(e.target.value))}
                        placeholder="Months of Payment..."
                    />
                </div>
                <div>
                    <h3>Your monthly payment:</h3>
                    <button onClick={handleCalculate}>Calculate</button>
                    <h4 id="paymentfield">{payment}</h4>
                </div>
                <div>
                    <h3>Total interest paid:</h3>
                    <h4 id="interestpaidfield">{interestPaid}</h4>
                </div>
            </div>
        </div>
    );
}

export default CalcPage;