import React, { useState } from 'react';
import './login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', { email, password });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <h1>FitCalc Hub</h1>
                    <p>Welcome Back</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="remember">
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#forgot">Forgot password?</a>
                    </div>

                    <button type="submit" className="login-btn">Sign In</button>
                </form>

                <div className="divider">OR</div>

                <button className="social-btn google">
                    <span>Sign in with Google</span>
                </button>

                <p className="signup-link">
                    Don't have an account? <a href="#signup">Sign up here</a>
                </p>
            </div>
        </div>
    );
}