import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // toggle between Login and Register forms
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { email, password, username: isLogin ? undefined : username };

        try {
            const url = isLogin ? 'http://localhost:5000/login' : 'http://localhost:5000/register';
            const res = await axios.post(url, user);
            if (isLogin) {
                localStorage.setItem('token', res.data.token); // Store JWT token in localStorage
                setMessage('Login successful');
            } else {
                setMessage('Registration successful');
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                {!isLogin && (
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <p>{message}</p>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
        </div>
    );
};

export default AuthPage;
