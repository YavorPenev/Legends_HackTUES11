function Calc(loan, interest, months) {
    const minterest = interest / 100 / 12;
    const payment =
      (loan * minterest * Math.pow(1 + minterest, months)) /
      (Math.pow(1 + minterest, months) - 1);
    return payment;
  }