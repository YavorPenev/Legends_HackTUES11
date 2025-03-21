import React, { useState } from "react";
import { createRoot } from 'react-dom/client';
import { StrictMode } from "react";
import { NavLink } from "react-router";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.href = '/'; // Redirect to home page
            } else {
                alert(result.error);
            }
        } catch (err) {
            console.error('Error during login:', err);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="input-box">
            <h1>Login:</h1>
            <div className="info">
                <i className="fa-solid fa-user"></i>
                <input type="text" id="user_name" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="info">
                <i className="fa-solid fa-lock"></i>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="submit-btn">
                <button type="button" id="login-btn" onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;

