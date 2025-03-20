import React from "react";

function Calc(loan, interest, months, ) {
    const payment;
    const minterest = interest / 100 / 12;

    payment = (loan *  minterest * (1 + minterest) ** months) / ((1 + minterest) ** months - 1);
    