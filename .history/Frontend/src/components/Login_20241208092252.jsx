import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Main container for the authentication page
const AuthPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  font-family: 'Poppins', sans-serif;
`;

// Auth box with box shadow and smooth border radius
const AuthBox = styled.div`
  background: #fff;
  padding: 50px 40px;
  border-radius: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  max-width: ${(props) => (props.$isMobile ? '90%' : '400px')};
  width: 100%;
  text-align: center;
  transform: translateY(-10px);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Title style
const Title = styled.h2`
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

// Form container with smooth inputs
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Input field styling
const Input = styled.input`
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6a11cb;
    background-color: #fff;
  }

  &::placeholder {
    color: #aaa;
  }
`;

// Primary button with hover effects
const Button = styled.button`
  padding: 14px 0;
  background-color: #6a11cb;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2575fc;
  }

  &:focus {
    outline: none;
  }
`;

// Switch link with modern hover effects
const SwitchButton = styled.button`
  margin-top: 10px;
  background: none;
  color: #6a11cb;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;

  &:hover {
    color: #2575fc;
  }
`;

// Message display with color changes
const Message = styled.p`
  margin-top: 20px;
  color: ${(props) => (props.$error ? '#dc3545' : '#28a745')};
  font-size: 14px;
  font-weight: 500;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize and initialize mobile view
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 768);
    updateIsMobile(); // Initialize state on component mount
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password, username: isLogin ? undefined : username };

    try {
      const url = isLogin
        ? 'http://localhost:5000//ogin'
        : 'http://localhost:5000/register';
      const res = await axios.post(url, user);
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        setMessage('Login successful');
      } else {
        setMessage('Registration successful');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <AuthPageWrapper>
      <AuthBox $isMobile={isMobile}>
        <Title>{isLogin ? 'Login' : 'Register'}</Title>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          )}
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
        </Form>
        <Message $show={!!message} $error={message.includes('error')}>
          {message}
        </Message>
        <SwitchButton onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </SwitchButton>
      </AuthBox>
    </AuthPageWrapper>
  );
};

export default AuthPage;
