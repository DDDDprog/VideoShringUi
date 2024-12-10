import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Main container
const AuthPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('background.jpg') no-repeat center center fixed;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
`;

// Frosted glass effect container
const AuthBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  padding: 40px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;

// Curved title section
const TitleWrapper = styled.div`
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 25px 25px 0 0;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  font-weight: bold;
`;

// Form container
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Input fields
const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 15px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  transition: 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    background: rgba(255, 255, 255, 0.3);
  }
`;

// Input icon
const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
`;

// Remember me and forgot password
const Options = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

// Submit button
const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background: linear-gradient(90deg, #6a11cb, #2575fc);
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(90deg, #2575fc, #6a11cb);
  }
`;

// Bottom link
const BottomText = styled.p`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;

  a {
    color: #6a11cb;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password, username: isLogin ? undefined : username };

    try {
      const url = isLogin
        ? 'http://localhost:5000/login'
        : 'http://localhost:5000/register';
      await axios.post(url, user);
      alert(isLogin ? 'Login successful' : 'Registration successful');
    } catch (err) {
      alert(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <AuthPageWrapper>
      <AuthBox>
        <TitleWrapper>
          <Title>{isLogin ? 'Login' : 'Register'}</Title>
        </TitleWrapper>
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputWrapper>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <Icon>👤</Icon>
            </InputWrapper>
          )}
          <InputWrapper>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <Icon>📧</Icon>
          </InputWrapper>
          <InputWrapper>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <Icon>🔒</Icon>
          </InputWrapper>
          <Options>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="/">Forgot Password?</a>
          </Options>
          <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
        </Form>
        <BottomText>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <a href="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </a>
        </BottomText>
      </AuthBox>
    </AuthPageWrapper>
  );
};

export default AuthPage;
