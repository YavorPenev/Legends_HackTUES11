import React, { useState } from "react";

function Calc(loan, interest, months) {
    const minterest = interest / 100 / 12;
    const payment = (loan * minterest * (1 + minterest) ** months) / ((1 + minterest) ** months - 1);

    return payment;
}

export default Calc;