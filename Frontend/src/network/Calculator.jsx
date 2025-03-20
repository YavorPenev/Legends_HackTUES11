import React, {useState} from "react";

function Calc(loan, interest, months) {
    const minterest = interest / 100 / 12;
    const payment = (loan *  minterest * (1 + minterest) ** months) / ((1 + minterest) ** months - 1);

    return payment;
}

function CalcPage(){
    const [loan, setLoan] = useState(0);
    const [interest, setInterest] = useState(0);
    const [months, setMonths] = useState(0);
    const [payment, setpayment] = useState(0);

    const loanChange = () => {
        setLoan(document.getElementById("loanfield").value);
        setInterest(document.getElementById("interestfield").value);
        setMonths(document.getElementById("monthsfield").value);

        const result = Calc(loan, interest, months);
        setpayment(result.toFixed(2));
    }

    return(
        <div>
            <h1 className = "pagename">Advanced Loan Calculator</h1>
            <div className="element">
                <h2>Enter your loan details:</h2>
                <div>
                    <input type="number" id="loanfield" placeholder="Loan Amount..." />
                    <input type="number" id="interestfield" placeholder="Yearly Interest Rate ..."/>
                    <input type="number" id="monthsfield" placeholder="Months of Payment..."/>
                </div>
                <div>
                    <h3>Your monthly payment:</h3>
                    <button onClick={loanChange}>Calculate</button>
                    <h4 id="paymentfield">{payment}</h4>                    
                </div>
                

            </div>
        </div>
    );
}

export default CalcPage;