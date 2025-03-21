import React, { useState } from "react";
import "./styles/signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if (!email || !username || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.href = '/'; // Redirect to home page
            } else {
                alert(result.error);
            }
        } catch (err) {
            console.error('Error during signup:', err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="input-box">
            <h1>Sign Up:</h1>
            <div className="info">
                <i className="fa-solid fa-user"></i>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="info">
                <i className="fa-solid fa-user"></i>
                <input
                    type="text"
                    id="user_name"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="info">
                <i className="fa-solid fa-user"></i>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter user password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="submit-btn">
                <button type="button" id="signup-btn" onClick={handleSignup}>Sign Up</button>
            </div>
        </div>
    );
}

export default Signup;
