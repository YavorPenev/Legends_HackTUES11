import React, { useState, useEffect } from "react";
import axios from "axios";

const ForexRates = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get("/api/forex-rates");
        setRates(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error loading data.");
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Forex Rates</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(rates.rates).map((currency) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rates.rates[currency]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ForexRates;
